import { createContext, useCallback, useContext, useReducer } from 'react';
import { user as defaultUser } from '../data/mockData';

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
};

/* ── Reducer ────────────────────────────────────────────────── */
function reducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, currentPage: action.page, sidebarOpen: false };

    case 'LOGIN':
      return { ...state, isAuthenticated: true, currentPage: 'onboarding' };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated:    false,
        onboardingComplete: false,
        currentPage:        'landing',
        activeWorkout:      null,
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

    default:
      return state;
  }
}

/* ── Provider ───────────────────────────────────────────────── */
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useCallback((page) => {
    dispatch({ type: 'NAVIGATE', page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const login = useCallback(() => dispatch({ type: 'LOGIN' }), []);
  const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), []);

  const completeOnboarding = useCallback(
    () => dispatch({ type: 'COMPLETE_ONBOARDING' }),
    []
  );

  const setUserData = useCallback(
    (data) => dispatch({ type: 'SET_USER_DATA', data }),
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

  const value = {
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

    /* actions */
    navigate,
    login,
    logout,
    completeOnboarding,
    setUserData,
    startWorkout,
    endWorkout,
    setSidebarOpen,
    setNotifications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
