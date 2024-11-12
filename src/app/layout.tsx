import type { Metadata } from 'next';
import localFont from 'next/font/local';

import MusicPlayer from '@/components/ui/MusicPlayer';
import SakuraEffect from '@/components/ui/SakuraEffect';
import { LanguageProvider } from '@/contexts/LanguageContext';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'K-ON! Task Manager',
  description: 'A cute task manager inspired by K-ON!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} tw-antialiased`}
      >
        <LanguageProvider>
          <div className="tw-relative">
            {children}
            <SakuraEffect />
            <MusicPlayer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
