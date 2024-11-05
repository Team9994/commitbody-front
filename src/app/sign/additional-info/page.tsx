import { redirect } from 'next/navigation';
import AdditionalInfo from './hydrated-page';
import { auth } from '@/auth';

export default async function HydratedAdditionalInfo() {
  const session = await auth();
  console.log(session?.nickname);
  console.log('닉네임:', session?.nickname);
  if (session?.nickname !== null) {
    redirect('/');
  }
  return (
    <div>
      <AdditionalInfo />
    </div>
  );
}
