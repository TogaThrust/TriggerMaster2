import { useState, useEffect } from 'react';

// Custom Hook for image cycling and fade effect
const useImageFade = (images: string[], intervalDuration: number = 3000) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Fade out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle to the next image
        setFade(true); // Fade in
      }, 500); // Wait for fade-out to complete before changing the image
    }, intervalDuration); // Change image every `intervalDuration` milliseconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length, intervalDuration]);

  return { currentImageIndex, fade };
};

export default useImageFade;