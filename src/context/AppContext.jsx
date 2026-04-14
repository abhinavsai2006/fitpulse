import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { user as defaultUser } from '../data/mockData';
import { auth, createUserViewModel, ensureUserProfile, googleProvider, updateUserProfile } from '../firebase';

const AppContext = createContext(null);

/* ── Initial state ──────────────────────────────────────────── */
const initialState = {
  currentPage:       'landing',
  isAuthenticated:   false,
  onboardingComplete: false,
  userData:          defaultUser,
  activeWorkout:     null,   // { ...workout, startedAt: Date.now() }
  workoutHistory:    [],
  sidebarOpen:       false,
  notifications:     2,
  theme:             'light',
  authReady:         false,
  authError:         '',
};

function parseAuthError(error) {
  if (!error?.code) return 'Something went wrong. Please try again.';

  switch (error.code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/email-already-in-use':
      return 'This email is already linked to an account.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in popup was closed before completion.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait and try again.';
    default:
      return 'Authentication failed. Please try again.';
  }
}

/* ── Reducer ────────────────────────────────────────────────── */
function reducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, currentPage: action.page, sidebarOpen: false };

    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        currentPage: action.onboardingComplete ? 'dashboard' : 'onboarding',
        onboardingComplete: Boolean(action.onboardingComplete),
        authError: '',
      };

    case 'RESTORE_SESSION': {
      const nextPage = action.onboardingComplete
        ? (state.currentPage === 'landing' || state.currentPage === 'auth' || state.currentPage === 'onboarding'
            ? 'dashboard'
            : state.currentPage)
        : 'onboarding';

      return {
        ...state,
        isAuthenticated: true,
        currentPage: nextPage,
        onboardingComplete: Boolean(action.onboardingComplete),
        userData: action.userData,
        authError: '',
      };
    }

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated:    false,
        onboardingComplete: false,
        currentPage:        'landing',
        activeWorkout:      null,
        userData:           defaultUser,
      };

    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingComplete: true, currentPage: 'dashboard' };

    case 'SET_USER_DATA':
      return { ...state, userData: { ...state.userData, ...action.data } };

    case 'START_WORKOUT':
      return { ...state, activeWorkout: { ...action.workout, startedAt: Date.now() } };

    case 'END_WORKOUT':
      return {
        ...state,
        activeWorkout:  null,
        workoutHistory: state.activeWorkout
          ? [{ ...state.activeWorkout, endedAt: Date.now() }, ...state.workoutHistory]
          : state.workoutHistory,
      };

    case 'SET_SIDEBAR_OPEN':
      return { ...state, sidebarOpen: action.open };

    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: 0 };

    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.count };

    case 'SET_AUTH_READY':
      return { ...state, authReady: action.ready };

    case 'SET_AUTH_ERROR':
      return { ...state, authError: action.error || '' };

    default:
      return state;
  }
}

/* ── Provider ───────────────────────────────────────────────── */
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [authBusy, setAuthBusy] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const profile = await ensureUserProfile(firebaseUser);
          const userData = createUserViewModel(defaultUser, firebaseUser, profile);

          dispatch({
            type: 'RESTORE_SESSION',
            userData,
            onboardingComplete: Boolean(profile?.onboardingComplete),
          });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        dispatch({ type: 'SET_AUTH_ERROR', error: parseAuthError(error) });
        dispatch({ type: 'LOGOUT' });
      } finally {
        dispatch({ type: 'SET_AUTH_READY', ready: true });
      }
    });

    return () => unsubscribe();
  }, []);

  const navigate = useCallback((page) => {
    dispatch({ type: 'NAVIGATE', page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const loginWithEmail = useCallback(async ({ email, password }) => {
    dispatch({ type: 'SET_AUTH_ERROR', error: '' });
    setAuthBusy(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const message = parseAuthError(error);
      dispatch({ type: 'SET_AUTH_ERROR', error: message });
      throw new Error(message);
    } finally {
      setAuthBusy(false);
    }
  }, []);

  const registerWithEmail = useCallback(async ({ name, email, password }) => {
    dispatch({ type: 'SET_AUTH_ERROR', error: '' });
    setAuthBusy(true);

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await ensureUserProfile(credential.user, {
        name: name || credential.user.displayName || 'FitPulse User',
        email,
        onboardingComplete: false,
      });
    } catch (error) {
      const message = parseAuthError(error);
      dispatch({ type: 'SET_AUTH_ERROR', error: message });
      throw new Error(message);
    } finally {
      setAuthBusy(false);
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    dispatch({ type: 'SET_AUTH_ERROR', error: '' });
    setAuthBusy(true);

    try {
      const credential = await signInWithPopup(auth, googleProvider);
      await ensureUserProfile(credential.user, {
        onboardingComplete: false,
      });
    } catch (error) {
      const message = parseAuthError(error);
      dispatch({ type: 'SET_AUTH_ERROR', error: message });
      throw new Error(message);
    } finally {
      setAuthBusy(false);
    }
  }, []);

  const sendPasswordReset = useCallback(async (email) => {
    dispatch({ type: 'SET_AUTH_ERROR', error: '' });
    setAuthBusy(true);

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const message = parseAuthError(error);
      dispatch({ type: 'SET_AUTH_ERROR', error: message });
      throw new Error(message);
    } finally {
      setAuthBusy(false);
    }
  }, []);

  const login = loginWithEmail;

  const logout = useCallback(async () => {
    dispatch({ type: 'SET_AUTH_ERROR', error: '' });

    try {
      await signOut(auth);
    } catch (error) {
      const message = parseAuthError(error);
      dispatch({ type: 'SET_AUTH_ERROR', error: message });
      throw new Error(message);
    }
  }, []);

  const completeOnboarding = useCallback(
    async ({ selections = {}, profile = {} } = {}) => {
      dispatch({ type: 'COMPLETE_ONBOARDING' });

      const statsPatch = {
        age: profile.age ? Number(profile.age) : null,
        gender: profile.gender || '',
        weight: profile.weight ? Number(profile.weight) : null,
        height: profile.height ? Number(profile.height) : null,
      };

      dispatch({ type: 'SET_USER_DATA', data: { stats: { ...state.userData.stats, ...statsPatch } } });

      if (auth.currentUser) {
        try {
          await updateUserProfile(auth.currentUser.uid, {
            onboardingComplete: true,
            onboardingSelections: selections,
            stats: {
              ...(state.userData.stats || {}),
              ...statsPatch,
            },
          });
        } catch (error) {
          dispatch({ type: 'SET_AUTH_ERROR', error: 'Failed to save onboarding to database.' });
        }
      }
    },
    [state.userData.stats]
  );

  const setUserData = useCallback(
    async (data) => {
      dispatch({ type: 'SET_USER_DATA', data });

      if (auth.currentUser) {
        try {
          await updateUserProfile(auth.currentUser.uid, data);
        } catch (error) {
          dispatch({ type: 'SET_AUTH_ERROR', error: 'Failed to sync profile update to database.' });
        }
      }
    },
    []
  );

  const startWorkout = useCallback(
    (workout) => dispatch({ type: 'START_WORKOUT', workout }),
    []
  );

  const endWorkout = useCallback(
    () => dispatch({ type: 'END_WORKOUT' }),
    []
  );

  const setSidebarOpen = useCallback(
    (open) => dispatch({ type: 'SET_SIDEBAR_OPEN', open }),
    []
  );

  const setNotifications = useCallback(
    (count) => dispatch({ type: count === 0 ? 'CLEAR_NOTIFICATIONS' : 'SET_NOTIFICATIONS', count }),
    []
  );

  const value = useMemo(() => ({
    /* state */
    currentPage:        state.currentPage,
    isAuthenticated:    state.isAuthenticated,
    onboardingComplete: state.onboardingComplete,
    userData:           state.userData,
    activeWorkout:      state.activeWorkout,
    workoutHistory:     state.workoutHistory,
    sidebarOpen:        state.sidebarOpen,
    notifications:      state.notifications,
    theme:              state.theme,
    authReady:          state.authReady,
    authError:          state.authError,
    authBusy,

    /* actions */
    navigate,
    login,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    sendPasswordReset,
    logout,
    completeOnboarding,
    setUserData,
    startWorkout,
    endWorkout,
    setSidebarOpen,
    setNotifications,
  }), [
    state.currentPage,
    state.isAuthenticated,
    state.onboardingComplete,
    state.userData,
    state.activeWorkout,
    state.workoutHistory,
    state.sidebarOpen,
    state.notifications,
    state.theme,
    state.authReady,
    state.authError,
    authBusy,
    navigate,
    login,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    sendPasswordReset,
    logout,
    completeOnboarding,
    setUserData,
    startWorkout,
    endWorkout,
    setSidebarOpen,
    setNotifications,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
