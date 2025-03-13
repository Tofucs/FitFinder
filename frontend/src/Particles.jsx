import React, { useEffect } from "react";

function ParticlesBackground() {
  useEffect(() => {
    // 1. Dynamically load the particles.js script
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"; 
    script.async = true;
    document.body.appendChild(script);

    // 2. Optionally load the stats script (if you want the debug overlay):
    const statsScript = document.createElement("script");
    statsScript.src = "https://threejs.org/examples/js/libs/stats.min.js";
    statsScript.async = true;
    document.body.appendChild(statsScript);

    // 3. When the particles.js script is loaded, run our config:
    script.onload = () => {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 160, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
          },
          opacity: {
            value: 1,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 600 },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
            repulse: { distance: 400, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: false,
      });

      // 4. If you want the stats panel & particle count, set that up:
      const stats = new window.Stats();
      stats.setMode(0);
      stats.domElement.style.position = "absolute";
      stats.domElement.style.left = "0px";
      stats.domElement.style.top = "0px";
      document.body.appendChild(stats.domElement);

      const countParticles = document.querySelector(".js-count-particles");
      function update() {
        stats.begin();
        stats.end();
        if (
          window.pJSDom &&
          window.pJSDom[0] &&
          window.pJSDom[0].pJS &&
          window.pJSDom[0].pJS.particles &&
          window.pJSDom[0].pJS.particles.array
        ) {
          countParticles.innerText =
            window.pJSDom[0].pJS.particles.array.length;
        }
        requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    };

    // 5. Cleanup scripts when component unmounts (optional, but good practice)
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(statsScript);
    };
  }, []);

  return (
    <>
      {/* This fills the background within the .container */}
      <div id="particles-js"></div>
      
    </>
  );
}

export default ParticlesBackground;