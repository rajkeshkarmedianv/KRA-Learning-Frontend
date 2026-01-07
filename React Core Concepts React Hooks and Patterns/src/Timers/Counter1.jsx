import React, { useState } from 'react'

const Counter1 = () => {
  const [count, setCount] = useState(0)

  function Increment() {
    setCount(prev => prev + 1)
  }

  function Decrement() {
    setCount(prev => prev - 1)
  }

  function Reset() {
    setCount(0)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
          width: '320px',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            marginBottom: '20px',
            color: '#333',
          }}
        >
          Count: {count}
        </h1>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={Increment}
            style={{
              padding: '10px 16px',
              fontSize: '14px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#4CAF50',
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            + Increment
          </button>

          <button
            onClick={Decrement}
            style={{
              padding: '10px 16px',
              fontSize: '14px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#f44336',
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            − Decrement
          </button>
        </div>

        <button
          onClick={Reset}
          style={{
            marginTop: '18px',
            padding: '10px',
            width: '100%',
            fontSize: '14px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#555',
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Counter1
