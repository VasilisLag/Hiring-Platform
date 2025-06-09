// app/layout.tsx
import '@/styles/globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Hiring Platform',
  description: 'Αγγελίες και τεστ για εργασία',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans">

        <Navbar />

        <main className="max-w-5xl mx-auto p-6">{children}</main>

        <footer className="w-full text-center py-6 text-sm text-gray-500">
          &copy; 2025 Hiring Platform
        </footer>

      </body>
    </html>
  );
}