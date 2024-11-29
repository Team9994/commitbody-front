import { PropsWithChildren } from 'react';

export default function WritePostLayout({ children }: PropsWithChildren<{}>) {
  return <div className="min-h-screen bg-backgrounds-default">{children}</div>;
}
