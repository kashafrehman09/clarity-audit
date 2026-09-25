import React, { useState, useEffect } from 'react';

// Animated Splash Screen Component
const SplashScreen = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#0b132b',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          ⚡ ClarityAudit
        </h1>
        <p style={{ color: '#8892b0', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Automated Micro-Subscription & Bill Manager
        </p>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(255, 255, 255, 0.1)',
            borderTop: '4px solid #00f2fe',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto',
          }}
        />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

// Main Application Component
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Displays splash screen interface for 1.5 seconds on startup
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0b132b',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '2rem 1rem',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 'bold' }}>ClarityAudit</h1>
            <p style={{ color: '#8892b0', margin: '0.25rem 0 0 0' }}>
              Automated Micro-Subscription & Bill Manager
            </p>
          </div>
          <button
            style={{
              backgroundColor: '#00c853',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            ⚡ Run Deep Bank Audit
          </button>
        </header>

        {/* Dashboard Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#1c2541',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #3a506b',
            }}
          >
            <p style={{ color: '#8892b0', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
              TOTAL MONTHLY BURN
            </p>
            <h2 style={{ fontSize: '2.2rem', color: '#ff4d6d', margin: 0 }}>$70.98</h2>
          </div>

          <div
            style={{
              backgroundColor: '#1c2541',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #3a506b',
            }}
          >
            <p style={{ color: '#8892b0', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
              ACTIVE SUBSCRIPTIONS
            </p>
            <h2 style={{ fontSize: '2.2rem', color: '#00b4d8', margin: 0 }}>3</h2>
          </div>

          <div
            style={{
              backgroundColor: '#1c2541',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #3a506b',
            }}
          >
            <p style={{ color: '#8892b0', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
              ZOMBIE BILLS FOUND
            </p>
            <h2 style={{ fontSize: '2.2rem', color: '#ffb703', margin: 0 }}>1</h2>
          </div>
        </div>

        {/* Add Subscription Form */}
        <div
          style={{
            backgroundColor: '#1c2541',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #3a506b',
            marginBottom: '2rem',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', color: '#4cc9f0' }}>+ Add New Subscription</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Name (e.g. Spotify)"
              style={{
                flex: 1,
                minWidth: '180px',
                padding: '0.75rem',
                backgroundColor: '#0b132b',
                border: '1px solid #3a506b',
                borderRadius: '6px',
                color: '#fff',
              }}
            />
            <input
              type="number"
              placeholder="Cost ($)"
              style={{
                width: '120px',
                padding: '0.75rem',
                backgroundColor: '#0b132b',
                border: '1px solid #3a506b',
                borderRadius: '6px',
                color: '#fff',
              }}
            />
            <select
              style={{
                padding: '0.75rem',
                backgroundColor: '#0b132b',
                border: '1px solid #3a506b',
                borderRadius: '6px',
                color: '#fff',
              }}
            >
              <option>Streaming</option>
              <option>Utilities</option>
              <option>Software</option>
            </select>
            <button
              style={{
                backgroundColor: '#3a86ff',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Add Subscription
            </button>
          </div>
        </div>

        {/* Detected Charges List */}
        <div
          style={{
            backgroundColor: '#1c2541',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #3a506b',
          }}
        >
          <h3 style={{ margin: '0 0 1.5rem 0' }}>Detected Charges</h3>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 0',
              borderBottom: '1px solid #3a506b',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Netflix Premium</h4>
              <p style={{ margin: '0.25rem 0 0 0', color: '#8892b0', fontSize: '0.85rem' }}>
                Category: Streaming • Last charged: 2 days ago
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>$22.99/mo</span>
              <button
                style={{
                  backgroundColor: '#e63946',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                1-Tap Cancel
              </button>
              <button
                style={{
                  backgroundColor: 'transparent',
                  color: '#8892b0',
                  border: '1px solid #3a506b',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 0',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Cloud Storage 200GB</h4>
              <p style={{ margin: '0.25rem 0 0 0', color: '#8892b0', fontSize: '0.85rem' }}>
                Category: Utilities • Last charged: 5 days ago
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>$2.99/mo</span>
              <button
                style={{
                  backgroundColor: '#e63946',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                1-Tap Cancel
              </button>
              <button
                style={{
                  backgroundColor: 'transparent',
                  color: '#8892b0',
                  border: '1px solid #3a506b',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
