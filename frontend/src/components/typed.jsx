import React from 'react';
import Typed from 'react-typed';

function TestTyped() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>
        <Typed
          strings={['Hello, World!', 'Welcome to React Typed']}
          typeSpeed={50}
          backSpeed={30}
          loop
        />
      </h1>
    </div>
  );
}

export default TestTyped;
