
// Animation utility functions for smooth transitions

/**
 * Animate a number from start to end
 * @param start Starting value
 * @param end Ending value
 * @param duration Duration in milliseconds
 * @param callback Function to call with current value on each frame
 * @param easing Optional easing function
 */
export const animateValue = (
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void,
  easing: (t: number) => number = (t) => t
) => {
  const startTime = performance.now();
  
  const updateValue = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = easing(progress);
    const currentValue = start + (end - start) * easedProgress;
    
    callback(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(updateValue);
    }
  };
  
  requestAnimationFrame(updateValue);
};

/**
 * Common easing functions
 */
export const easings = {
  // Linear (no easing)
  linear: (t: number) => t,
  
  // Quadratic
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  
  // Cubic
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) => 
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  // Apple-style easing (approximation)
  appleEasing: (t: number) => {
    // Approximation of Apple's easing function
    return t < 0.5
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;
  }
};

/**
 * Stagger animation for multiple elements
 * @param elements Elements to animate
 * @param staggerDelay Delay between each element in milliseconds
 * @param callback Function to call for each element with its index
 */
export const staggerAnimation = (
  elements: HTMLElement[],
  staggerDelay: number,
  callback: (element: HTMLElement, index: number) => void
) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      callback(element, index);
    }, index * staggerDelay);
  });
};

/**
 * Animate element entrance
 * @param element Element to animate
 * @param direction Direction of entrance ('up', 'down', 'left', 'right')
 * @param duration Duration in milliseconds
 */
export const animateEntrance = (
  element: HTMLElement,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  duration: number = 500
) => {
  // Set initial styles
  element.style.opacity = '0';
  element.style.transition = `opacity ${duration}ms, transform ${duration}ms`;
  
  // Set transform based on direction
  switch (direction) {
    case 'up':
      element.style.transform = 'translateY(20px)';
      break;
    case 'down':
      element.style.transform = 'translateY(-20px)';
      break;
    case 'left':
      element.style.transform = 'translateX(20px)';
      break;
    case 'right':
      element.style.transform = 'translateX(-20px)';
      break;
  }
  
  // Force reflow
  element.offsetHeight;
  
  // Animate to final state
  element.style.opacity = '1';
  element.style.transform = 'translate(0, 0)';
  
  // Clean up styles after animation completes
  setTimeout(() => {
    element.style.transition = '';
  }, duration);
};
