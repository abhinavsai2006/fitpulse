import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';

function normalizeEnv(value) {
  return typeof value === 'string' ? value.trim() : value;
}

const firebaseConfig = {
  apiKey: normalizeEnv(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: normalizeEnv(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: normalizeEnv(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: normalizeEnv(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: normalizeEnv(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: normalizeEnv(import.meta.env.VITE_FIREBASE_APP_ID),
  measurementId: normalizeEnv(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
};

const requiredFirebaseKeys = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
];

const missingFirebaseKeys = requiredFirebaseKeys.filter((key) => !firebaseConfig[key]);

if (missingFirebaseKeys.length) {
  throw new Error(
    `Missing Firebase environment variables for: ${missingFirebaseKeys.join(', ')}. ` +
    'Add VITE_FIREBASE_* values in your local .env and Vercel project settings.'
  );
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Force account chooser on each sign-in so users can switch profiles easily.
googleProvider.setCustomParameters({ prompt: 'select_account' });

export let analytics = null;

if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      analytics = null;
    });
}

function buildInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'FP';
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

function toHandle(name = '') {
  const normalized = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
  return normalized ? `@${normalized}` : '@fitpulseuser';
}

function defaultProfileFromUser(firebaseUser, overrides = {}) {
  const safeName = overrides.name || firebaseUser.displayName || 'FitPulse User';

  return {
    uid: firebaseUser.uid,
    name: safeName,
    email: firebaseUser.email || overrides.email || '',
    handle: overrides.handle || toHandle(safeName),
    initials: overrides.initials || buildInitials(safeName),
    provider: firebaseUser.providerData?.[0]?.providerId || 'password',
    onboardingComplete: false,
    stats: {
      age: null,
      gender: '',
      height: null,
      weight: null,
    },
    ...overrides,
  };
}

export async function ensureUserProfile(firebaseUser, overrides = {}) {
  const userRef = doc(db, 'users', firebaseUser.uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    const merged = {
      ...snapshot.data(),
      ...overrides,
      updatedAt: serverTimestamp(),
    };
    await setDoc(userRef, merged, { merge: true });
    return { ...snapshot.data(), ...overrides };
  }

  const initialProfile = defaultProfileFromUser(firebaseUser, overrides);
  await setDoc(userRef, {
    ...initialProfile,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return initialProfile;
}

export async function updateUserProfile(uid, data) {
  const userRef = doc(db, 'users', uid);
  await setDoc(
    userRef,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function getUserProfile(uid) {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? snapshot.data() : null;
}

export function createUserViewModel(defaultUser, firebaseUser, profile) {
  const name = profile?.name || firebaseUser?.displayName || defaultUser.name;
  const initials = profile?.initials || buildInitials(name);

  return {
    ...defaultUser,
    ...profile,
    stats: {
      ...(defaultUser.stats || {}),
      ...(profile?.stats || {}),
    },
    goals: {
      ...(defaultUser.goals || {}),
      ...(profile?.goals || {}),
    },
    id: firebaseUser?.uid || defaultUser.id,
    name,
    initials,
    email: firebaseUser?.email || profile?.email || defaultUser.email,
    handle: profile?.handle || toHandle(name),
  };
}
