// components/PageWrapper.tsx
import { ReactNode } from 'react';

interface PageWrapperProps {
  title?: string;
  children: ReactNode;
}

export default function PageWrapper({ title, children }: PageWrapperProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      {title && <h2 className="text-2xl font-semibold">{title}</h2>}
      {children}
    </div>
  );
}