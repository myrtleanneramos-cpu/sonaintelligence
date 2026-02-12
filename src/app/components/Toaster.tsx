import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        style: {
          background: 'rgba(17, 17, 17, 0.95)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          color: 'white',
          borderRadius: '24px',
          padding: '16px 24px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(168, 85, 247, 0.2)',
        },
      }}
    />
  );
}