import React, { Suspense } from 'react';
import CanvasContainer from './components/CanvasContainer';
import Overlay from './components/Overlay';

function App() {
  return (
    <div className="w-full relative">
      {/* 3D Canvas Background fixed behind content */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-navy">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gold text-2xl tracking-widest font-light">Loading 3D Experience...</div>}>
          <CanvasContainer />
        </Suspense>
      </div>

      {/* Scrollable Overlay Layer */}
      <Overlay />
    </div>
  );
}

export default App;
