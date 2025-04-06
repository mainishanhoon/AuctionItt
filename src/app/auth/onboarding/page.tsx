import OnboardingForm from '@/app/_components/forms/OnboardingForm';
import { fetchUser } from '@/hooks/hooks';

export default async function InvoicesRoute() {
  const data = await fetchUser();

  return data && <OnboardingForm />;
}
