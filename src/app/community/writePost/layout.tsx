import { PropsWithChildren, Suspense } from 'react';

export default function WritePostLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="min-h-screen bg-backgrounds-default">
      <Suspense fallback={<div>Loading...</div>}> {children}</Suspense>
    </div>
  );
}
