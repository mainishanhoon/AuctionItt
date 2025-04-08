import OnboardingForm from '@/app/_components/forms/OnboardingForm';
import { onboardingUser } from '@/hooks/hooks';

export default async function OnboardingRoute() {
  await onboardingUser();
  return <OnboardingForm />;
}
