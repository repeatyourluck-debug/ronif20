'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function LandingContent() {
  const searchParams = useSearchParams();
  const targetUrl = searchParams.get('url') || '#';
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (targetUrl === '#') return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c: number) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = targetUrl;
    }
  }, [countdown, targetUrl]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      color: '#e0e0e0',
      padding: '20px',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '48px 40px',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
      }}>
        {/* Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '32px',
        }}>
          🔗
        </div>

        <h1 style={{
          fontSize: '22px',
          fontWeight: 700,
          margin: '0 0 8px',
          color: '#ffffff',
        }}>
          Preparing Your Content
        </h1>

        <p style={{
          fontSize: '15px',
          color: '#a0a0b8',
          margin: '0 0 32px',
          lineHeight: 1.6,
        }}>
          You will be redirected automatically in a moment.
          Please wait while we prepare everything for you.
        </p>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: '6px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '3px',
          overflow: 'hidden',
          marginBottom: '16px',
        }}>
          <div style={{
            width: `${((3 - countdown) / 3) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            borderRadius: '3px',
            transition: 'width 1s linear',
          }} />
        </div>

        <p style={{
          fontSize: '13px',
          color: '#6366f1',
          margin: '0 0 24px',
          fontWeight: 500,
        }}>
          Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
        </p>

        {/* Manual button */}
        <a
          href={targetUrl}
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
          }}
        >
          Continue Now →
        </a>

        <p style={{
          fontSize: '12px',
          color: '#555570',
          marginTop: '24px',
        }}>
          If you are not redirected automatically, click the button above.
        </p>
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
