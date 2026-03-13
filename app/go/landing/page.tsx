'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function LandingContent() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get('url') || '#';

  useEffect(() => {
    if (targetUrl === '#') return;
    
    // Very simple 1-second timeout
    const timer = setTimeout(() => {
      window.location.replace(targetUrl);
    }, 1000);

    return () => clearTimeout(timer);
  }, [targetUrl]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f0f1a', // Simple dark background
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      color: '#e0e0e0',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* Simple CSS Spinner */}
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#6366f1',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />

        <p style={{
          fontSize: '15px',
          color: '#a0a0b8',
          margin: 0,
        }}>
          Redirecting...
        </p>

        {/* Fallback link hidden slightly but available if needed */}
        <a 
          href={targetUrl}
          style={{
            fontSize: '12px',
            color: '#6366f1',
            textDecoration: 'none',
            marginTop: '10px',
            opacity: 0.7
          }}
        >
          Click here if stuck
        </a>

        {/* CSS Animation Keyframes */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}} />
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f0f1a',
        color: '#e0e0e0',
        fontFamily: 'sans-serif',
      }}>
        <p>Loading...</p>
      </div>
    }>
      <LandingContent />
    </Suspense>
  );
}
