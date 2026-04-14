import { lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';

const Landing = lazy(() => import('./pages/Landing'));
const Auth = lazy(() => import('./pages/Auth'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Workouts = lazy(() => import('./pages/Workouts'));
const Activity = lazy(() => import('./pages/Activity'));
const Nutrition = lazy(() => import('./pages/Nutrition'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Goals = lazy(() => import('./pages/Goals'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

function ScreenLoader() {
  return (
    <div className="fp-app-bg min-h-screen flex items-center justify-center p-4">
      <div className="fp-surface w-full max-w-[480px] p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B47] to-[#FF8A5C] shadow-[0_8px_24px_rgba(255,107,71,0.3)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.4 14.4 9.6 9.6" />
            <path d="M18.657 21.485a2 2 0 0 1-2.829 0l-4.243-4.243a2 2 0 0 1 0-2.828l9.9-9.9a2 2 0 0 1 2.828 0l4.243 4.243a2 2 0 0 1 0 2.829Z" />
            <path d="m21.5 21.5-1.4-1.4" />
            <path d="M3.9 3.9 2.5 2.5" />
            <path d="M6.404 12.768a2 2 0 0 1 0-2.829l4.243-4.243a2 2 0 0 1 2.829 0l.556.556-7.072 7.072Z" />
          </svg>
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#555b6e]">FitPulse</p>
        <p className="mt-2 text-xl font-bold text-[#f0f0f5] font-display">Loading your dashboard...</p>
        <div className="mt-5 fp-bar-track">
          <div className="fp-bar-fill animate-[fpShimmer_1.4s_ease-in-out_infinite]" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
}

function Router() {
  const { currentPage, isAuthenticated, onboardingComplete, authReady } = useApp();

  if (!authReady) {
    return <ScreenLoader />;
  }

  if (!isAuthenticated) {
    if (currentPage === 'auth') return <Auth />;
    return <Landing />;
  }

  if (!onboardingComplete) {
    return <Onboarding />;
  }

  switch (currentPage) {
    case 'workouts':   return <Workouts />;
    case 'activity':   return <Activity />;
    case 'nutrition':  return <Nutrition />;
    case 'analytics':  return <Analytics />;
    case 'goals':      return <Goals />;
    case 'profile':    return <Profile />;
    case 'settings':   return <Settings />;
    default:           return <Dashboard />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <Suspense fallback={<ScreenLoader />}>
        <Router />
      </Suspense>
    </AppProvider>
  );
}
