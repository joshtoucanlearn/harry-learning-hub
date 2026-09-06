import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Harry’s Learning Hub',
  description:
    'Maths and English review, football predictions and a writing desk.',
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
