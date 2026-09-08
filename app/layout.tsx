import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Harry Hub',
  description:
    'Football predictions, journalism, past work and maths practice.',
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
