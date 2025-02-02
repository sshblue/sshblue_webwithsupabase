"use client";

import { Globe } from "@/components/ui/globe";

export function GlobeWrapper() {
  return (
    <Globe 
      config={{
        width: 600,
        height: 600,
        devicePixelRatio: 2,
        phi: Math.PI * 0.5,
        theta: Math.PI * 0.2,
        dark: 1,
        diffuse: 0.9,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.4, 0.4, 0.9],
        glowColor: [0.7, 0.7, 0.9],
        scale: 1.1,
        opacity: 0.9,
        markers: [
          { location: [48.8566, 2.3522], size: 0.03 },    // Paris
          { location: [40.7128, -74.0060], size: 0.03 },  // New York
          { location: [35.6762, 139.6503], size: 0.03 },  // Tokyo
          { location: [51.5074, -0.1278], size: 0.03 },   // London
          { location: [-33.8688, 151.2093], size: 0.03 }, // Sydney
          { location: [1.3521, 103.8198], size: 0.03 },   // Singapore
          { location: [55.7558, 37.6173], size: 0.03 },   // Moscow
          { location: [59.9343, 30.3351], size: 0.03 },   // St. Petersburg
          { location: [56.8389, 60.6057], size: 0.03 },   // Yekaterinburg
          { location: [55.0084, 82.9357], size: 0.03 },   // Novosibirsk
        ],
        onRender: () => {}
      }}
    />
  );
}
