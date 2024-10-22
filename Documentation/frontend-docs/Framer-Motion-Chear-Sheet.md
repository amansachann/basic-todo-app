# **Ultimate Framer Motion Cheat Sheet**

## **Table of Contents**
1. [Introduction](#introduction)
2. [Installation and Setup](#installation-and-setup)
3. [Basic Animations](#basic-animations)
4. [Transitions](#transitions)
5. [Keyframe Animations](#keyframe-animations)
6. [Variants for Multiple States](#variants-for-multiple-states)
7. [Gestures (Drag, Pan, Hover, Tap)](#gestures)
8. [Layout Animations](#layout-animations)
9. [SVG Animations](#svg-animations)
10. [Controlling Animations Programmatically](#controlling-animations-programmatically)
11. [Scroll-Based Animations](#scroll-based-animations)
12. [Responsive Animations](#responsive-animations)
13. [Advanced Techniques](#advanced-techniques)
14. [Performance Optimization](#performance-optimization)
15. [Real-World Use Cases](#real-world-use-cases)
16. [Accessibility Considerations](#accessibility-considerations)
17. [Testing Animations](#testing-animations)
18. [Integrating Animations with State Management](#integrating-animations-with-state-management)
19. [Cross-Browser and Mobile Support](#cross-browser-and-mobile-support)
20. [Best Practices for Production Animations](#best-practices-for-production-animations)

---

## 1. **Introduction**

**Framer Motion** is a powerful library for React applications that enables declarative animations and gestures. It’s built for production-level animations, ensuring smooth and intuitive motion for UI elements.

### **Key Features:**
- Declarative animations with `motion` components
- Layout and presence animations
- Gesture support (drag, pan, hover, etc.)
- Powerful variants for complex animations
- SVG animations
- Integration with state management and programmatic control

---

## 2. **Installation and Setup**

To install **Framer Motion** in your React project, use the following command:

```bash
npm install framer-motion
```

To start using animations, import the `motion` component:

```javascript
import { motion } from 'framer-motion';
```

---

## 3. **Basic Animations**

You can easily animate properties like opacity, scale, and position using the `motion` components.

### Example: Simple Fade-In Animation

```jsx
import { motion } from 'framer-motion';

function FadeInExample() {
  return (
    <motion.div
      initial={{ opacity: 0 }}  // Start from opacity 0
      animate={{ opacity: 1 }}  // Animate to opacity 1
      transition={{ duration: 1 }}  // Takes 1 second
    >
      Fading In!
    </motion.div>
  );
}
```

---

## 4. **Transitions**

Framer Motion allows you to customize transitions to create smooth animations using various properties like duration, type, and easing.

### Example: Slide and Bounce Animation

```jsx
export default function SlideBounceExample() {
  return (
    <motion.div
      initial={{ x: -100 }}  // Start from off-screen
      animate={{ x: 0 }}  // Slide in to the center
      transition={{ type: 'spring', stiffness: 100, damping: 10 }}
    >
      Sliding with Bounce!
    </motion.div>
  );
}
```

**Transition Properties:**
- `duration`: Controls the time of the animation.
- `type`: Defines the type (e.g., "spring", "tween").
- `stiffness` and `damping`: Control spring physics.

---

## 5. **Keyframe Animations**

With Framer Motion, you can define keyframes for animations by using arrays of values for properties.

### Example: Keyframe Animation for Scaling

```jsx
export default function KeyframeExample() {
  return (
    <motion.div
      animate={{ scale: [1, 1.5, 1] }}  // Scale changes in steps
      transition={{ duration: 2, repeat: Infinity }}  // Loop animation
    >
      Bouncing Animation!
    </motion.div>
  );
}
```

---

## 6. **Variants for Multiple States**

**Variants** allow you to define different states and handle complex animations with shared configurations.

### Example: Button Hover and Tap Variants

```jsx
const buttonVariants = {
  hover: {
    scale: 1.2,
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

export default function ButtonVariants() {
  return (
    <motion.button
      variants={buttonVariants}  // Assign the variant
      whileHover="hover"  // Apply on hover
      whileTap="tap"  // Apply on tap
    >
      Hover and Tap Me!
    </motion.button>
  );
}
```

---

## 7. **Gestures (Drag, Pan, Hover, Tap)**

Framer Motion simplifies gesture-based interactions like dragging, hovering, and panning.

### Example: Dragging an Element

```jsx
export default function DraggableElement() {
  return (
    <motion.div drag="xy" dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}>
      Drag Me Around!
    </motion.div>
  );
}
```

**Gesture Properties:**
- `drag`: Enables dragging (x, y, or both).
- `dragConstraints`: Limits the area in which the element can be dragged.

---

## 8. **Layout Animations**

Framer Motion automatically animates layout changes when elements reposition dynamically.

### Example: Layout Change Animation

```jsx
export default function LayoutExample() {
  return (
    <motion.div layout>
      <motion.div layout>Element 1</motion.div>
      <motion.div layout>Element 2</motion.div>
    </motion.div>
  );
}
```

**Key Property:**
- `layout`: Automatically animates changes in the layout when elements reposition.

---

## 9. **SVG Animations**

Framer Motion supports smooth SVG animations, allowing for creative and complex vector animations.

### Example: Animate SVG Path

```jsx
export default function SVGExample() {
  return (
    <motion.svg width="200" height="200" viewBox="0 0 100 100">
      <motion.path
        d="M 10 80 C 40 10, 65 10, 95 80"
        fill="transparent"
        stroke="black"
        strokeWidth="2"
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
```

---

## 10. **Controlling Animations Programmatically**

Framer Motion allows you to programmatically trigger animations using the `useAnimation` hook.

### Example: Trigger Animation with Button Click

```jsx
import { useAnimation } from 'framer-motion';

export default function ControlledAnimation() {
  const controls = useAnimation();

  return (
    <>
      <motion.div animate={controls} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
        Trigger Me!
      </motion.div>
      <button onClick={() => controls.start({ opacity: 1 })}>Animate</button>
    </>
  );
}
```

---

## 11. **Scroll-Based Animations**

Framer Motion supports scroll-linked animations, which are perfect for creating dynamic UIs.

### Example: Scroll-Triggered Animation

```jsx
import { useScroll, motion } from 'framer-motion';

export default function ScrollAnimation() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div style={{ scale: scrollYProgress }}>
      I scale as you scroll!
    </motion.div>
  );
}
```

---

## 12. **Responsive Animations**

Framer Motion allows you to create responsive animations by handling screen sizes with CSS or using logic in the code.

### Example: Responsive Animation with Media Queries

```jsx
export default function ResponsiveAnimation() {
  const isSmallScreen = window.innerWidth < 600;
  
  return (
    <motion.div
      initial={{ scale: isSmallScreen ? 0.5 : 1 }}  // Small screen scaling
      animate={{ scale: 1 }}  // Normal scaling
      transition={{ duration: 0.5 }}
    >
      Responsive Element!
    </motion.div>
  );
}
```

---

## 13. **Advanced Techniques**

### **AnimatePresence for Exit Animations**

`AnimatePresence` allows you to animate components entering and exiting the DOM.

```jsx
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}  // Animate when removed
        >
          Modal Content
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### **Staggered Animations for Children**

```jsx
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,  // Stagger animations of children
    },
  },


};

export default function StaggeredList() {
  return (
    <motion.div variants={containerVariants} animate="animate">
      <motion.div>Item 1</motion.div>
      <motion.div>Item 2</motion.div>
      <motion.div>Item 3</motion.div>
    </motion.div>
  );
}
```

---

## 14. **Performance Optimization**

For production, performance is crucial. Here are tips to optimize animations:

### **Use `will-change` CSS Property**

The `will-change` property tells the browser to optimize specific properties that will be animated.

```css
.myElement {
  will-change: transform, opacity;
}
```

### **Memoization with React Hooks**

Use `React.memo` or `useMemo` to prevent unnecessary re-renders of animated components.

```jsx
const OptimizedComponent = React.memo(function () {
  return <motion.div animate={{ opacity: 1 }} />;
});
```

---

## 15. **Real-World Use Cases**

Here are examples of real-world use cases for Framer Motion:

### **Modal with Entry and Exit Animations**

```jsx
// Modal example with `AnimatePresence` and transition animations
```

### **Onboarding Tutorial with Step Transitions**

```jsx
// Multi-step form example with smooth transitions
```

---

## 16. **Accessibility Considerations**

### **Reduce Motion Preference**

Use `prefers-reduced-motion` to disable or simplify animations for users with motion sensitivity.

```jsx
const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion)").matches;

<motion.div
  initial={shouldReduceMotion ? {} : { opacity: 0 }}
  animate={shouldReduceMotion ? {} : { opacity: 1 }}
/>
```

---

## 17. **Testing Animations**

For testing animated components, use tools like **Jest** and **Cypress**.

### **Mocking Animations in Jest**

```jsx
jest.mock('framer-motion', () => ({
  motion: {
    div: (props) => <div {...props} />,  // Simplify `motion.div`
  },
}));
```

---

## 18. **Integrating Animations with State Management**

To integrate animations with Redux, Context API, or Zustand:

```jsx
// Example of integrating Framer Motion animations with Redux or Zustand states
```

---

## 19. **Cross-Browser and Mobile Support**

Handle mobile-specific animations and browser compatibility using tools like CSS `@supports` and media queries.

```css
@supports (transform: translate3d(0, 0, 0)) {
  .myElement {
    will-change: transform;
  }
}
```

---

## 20. **Best Practices for Production Animations**

### **Key Considerations:**
- **Keep Animations Minimal**: Don’t over-animate; use subtle effects that enhance user experience.
- **Test on Different Devices**: Ensure animations work smoothly across a range of devices, from high-performance desktops to low-powered mobiles.
- **Optimize for Performance**: Always profile animations in Chrome DevTools to avoid jank.

