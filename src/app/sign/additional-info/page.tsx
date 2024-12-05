import { redirect } from 'next/navigation';
import AdditionalInfo from './hydrated-page';
import { auth } from '@/auth';

export default async function HydratedAdditionalInfo() {
  return (
    <div>
      <AdditionalInfo />
    </div>
  );
}
