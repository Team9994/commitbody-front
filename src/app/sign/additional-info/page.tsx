import { redirect } from 'next/navigation';
import AdditionalInfo from './hydrated-page';
import { auth } from '@/auth';

export default async function HydratedAdditionalInfo() {
  const session = await auth();

  if (session?.nickname) {
    redirect('/');
  }
  return (
    <div>
      <AdditionalInfo />
    </div>
  );
}
