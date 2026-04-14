import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { onboardingSteps } from '../data/mockData';

const stepTitles = ['Goals', 'Experience', 'Schedule', 'Profile'];

function OnboardingOption({ option, selected, onClick, multi }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fp-panel flex w-full items-center gap-3 p-3 text-left transition-all hover:bg-white/[0.04]"
      style={selected ? { borderColor: 'rgba(255,107,71,0.5)', boxShadow: '0 0 0 2px rgba(255,107,71,0.12)' } : undefined}
    >
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white/[0.04] text-xl">{option.icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold text-[#e8e8f0]">{option.label}</span>
        <span className="block text-xs font-medium text-[#555b6e]">{option.desc}</span>
      </span>
      <span
        className="flex h-5 w-5 flex-shrink-0 items-center justify-center"
        style={{
          borderRadius: multi ? 7 : 999,
          border: `1px solid ${selected ? '#FF6B47' : '#3a3f52'}`,
          background: selected ? '#FF6B47' : 'transparent',
          color: '#fff',
        }}
      >
        {selected ? <Check size={12} strokeWidth={3} /> : null}
      </span>
    </button>
  );
}

export default function Onboarding() {
  const { completeOnboarding } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [profile, setProfile] = useState({ age: '', gender: '', weight: '', height: '' });

  const totalSteps = onboardingSteps.length + 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const activeStep = onboardingSteps[currentStep];

  const updateSelection = (stepId, optionId, type) => {
    setSelections((prev) => {
      const existing = prev[stepId] || [];
      if (type === 'multiSelect') {
        const next = existing.includes(optionId) ? existing.filter((item) => item !== optionId) : [...existing, optionId];
        return { ...prev, [stepId]: next };
      }
      return { ...prev, [stepId]: [optionId] };
    });
  };

  const isSelected = (stepId, optionId) => (selections[stepId] || []).includes(optionId);

  const canContinue = () => {
    if (currentStep < onboardingSteps.length) return (selections[activeStep.id] || []).length > 0;
    return Boolean(profile.age && profile.weight);
  };

  const next = () => {
    if (!canContinue()) return;
    if (currentStep >= totalSteps - 1) { completeOnboarding(); return; }
    setCurrentStep((prev) => prev + 1);
  };

  const back = () => { if (currentStep > 0) setCurrentStep((prev) => prev - 1); };

  return (
    <div className="fp-app-bg min-h-screen px-4 py-5 md:px-7 md:py-7 flex items-center justify-center">
      <div className="mx-auto w-full max-w-[820px] animate-slide-up">
        <section className="fp-panel p-5 md:p-7 rounded-[22px]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#555b6e]">Onboarding</p>
          <h1 className="mt-2 text-3xl font-bold text-[#f0f0f5] font-display md:text-4xl">Build your FitPulse plan</h1>
          <p className="mt-2 text-sm font-medium text-[#555b6e]">We are shaping your app around your goals and capacity.</p>

          <div className="mt-5 fp-bar-track">
            <div className="fp-bar-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {stepTitles.map((title, index) => (
              <div key={title} className="text-center">
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold transition-colors"
                  style={{
                    background: index <= currentStep ? '#FF6B47' : 'rgba(255,255,255,0.06)',
                    color: index <= currentStep ? '#fff' : '#555b6e',
                    boxShadow: index <= currentStep ? '0 4px 12px rgba(255,107,71,0.3)' : 'none',
                  }}
                >
                  {index + 1}
                </span>
                <p className="mt-1 text-[11px] font-semibold text-[#555b6e]">{title}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 md:p-6">
            {currentStep < onboardingSteps.length ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#555b6e]">Step {currentStep + 1} of {totalSteps}</p>
                <h2 className="mt-1 text-2xl font-bold text-[#f0f0f5] font-display">{activeStep.title}</h2>
                <p className="mt-1 text-sm font-medium text-[#555b6e]">{activeStep.subtitle}</p>
                <div className="mt-4 space-y-2.5">
                  {activeStep.options.map((option) => (
                    <OnboardingOption
                      key={option.id} option={option}
                      multi={activeStep.type === 'multiSelect'}
                      selected={isSelected(activeStep.id, option.id)}
                      onClick={() => updateSelection(activeStep.id, option.id, activeStep.type)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#555b6e]">Step {totalSteps} of {totalSteps}</p>
                <h2 className="mt-1 text-2xl font-bold text-[#f0f0f5] font-display">Finalize profile basics</h2>
                <p className="mt-1 text-sm font-medium text-[#555b6e]">These values help us tune calorie and workout recommendations.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: 'Age', type: 'number', placeholder: '28', key: 'age' },
                    { label: 'Gender', type: 'select', key: 'gender', options: ['Select', 'Male', 'Female', 'Non-binary', 'Prefer not to say'] },
                    { label: 'Weight (lbs)', type: 'number', placeholder: '165', key: 'weight' },
                    { label: 'Height (in)', type: 'number', placeholder: '70', key: 'height' },
                  ].map(field => (
                    <label key={field.key} className="block">
                      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#555b6e]">{field.label}</span>
                      {field.type === 'select' ? (
                        <select className="fp-input" value={profile[field.key]} onChange={(e) => setProfile((p) => ({ ...p, [field.key]: e.target.value }))}>
                          {field.options.map(o => <option key={o} value={o === 'Select' ? '' : o.toLowerCase()}>{o}</option>)}
                        </select>
                      ) : (
                        <input type="number" className="fp-input" placeholder={field.placeholder} value={profile[field.key]} onChange={(e) => setProfile((p) => ({ ...p, [field.key]: e.target.value }))} />
                      )}
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button type="button" className="fp-secondary-btn" disabled={currentStep === 0} onClick={back}>
              <ChevronLeft size={14} strokeWidth={2.6} /> Back
            </button>
            <button type="button" className="fp-primary-btn" disabled={!canContinue()} onClick={next}>
              {currentStep === totalSteps - 1 ? 'Complete Setup' : 'Continue'}
              <ChevronRight size={14} strokeWidth={2.6} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
