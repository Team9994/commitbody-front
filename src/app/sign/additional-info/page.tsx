import { redirect } from 'next/navigation';
import AdditionalInfo from './hydrated-page';
import { auth } from '@/auth';

export default function HydratedAdditionalInfo() {
  const session = auth();
  if (!session.nickname) {
    redirect('/');
  }
  return (
    <div>
      <AdditionalInfo />
    </div>
  );
}
