import React from "react";

function SnapWrapper({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="snap-wrapper">
      {children}
      <style>{`
        /* Ensure html, body, and the root element take full height */
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        /* The scrollable container */
        .snap-wrapper {
          height: 100vh;
          overflow-y: auto;
          scroll-snap-type: y mandatory;
        }
        /* Each section will take full viewport height and be a snap point */
        .snap-section {
          height: 100vh;
          scroll-snap-align: start;
          position: relative;
        }
      `}</style>
    </div>
  );
}

export default SnapWrapper;
