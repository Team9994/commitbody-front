import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthSession from '@/lib/AuthSession';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import GoogleAnalytics from '@/lib/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Commit-Body',
  description: '커밋바디입니다.',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full bg-gray-400">
      <body className={`${inter.className} max-w-[500px] m-auto shadow-custom-light z-20`}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <ReactQueryProvider>
          <AuthSession>{children}</AuthSession>
          {/* <ReactQueryDevtools /> */}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
