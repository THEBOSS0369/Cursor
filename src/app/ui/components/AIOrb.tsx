"use client";

import { useState, useCallback, useMemo, useEffect, useRef, JSX } from "react";
import dynamic from "next/dynamic";

/**
 * Dynamic import of the Orb component to prevent SSR issues
 * The react-ai-orb library requires browser APIs
 */
const Orb = dynamic(() => import("react-ai-orb").then((mod) => mod.Orb), {
  ssr: false,
  loading: () => (
    <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse" />
  ),
});

/**
 * Type definitions for the AI Orb component
 */
interface AIOrbProps {
  /**
   * Initial state of the orb animation
   * @default false
   */
  initiallyActive?: boolean;

  /**
   * Callback fired when the orb state changes
   * @param isActive - Whether the orb is currently animating
   */
  onStateChange?: (isActive: boolean) => void;

  /**
   * Custom class name for the container
   */
  className?: string;

  /**
   * Size multiplier for the orb
   * @default 1.5
   */
  size?: number;

  /**
   * Enable advanced animation features
   * @default true
   */
  advancedAnimation?: boolean;
}

/**
 * Processing state enum for better type safety
 */
enum ProcessingState {
  IDLE = "idle",
  STARTING = "starting",
  PROCESSING = "processing",
  STOPPING = "stopping",
}

/**
 * AIOrb Component
 *
 * AI Orb interface with sophisticated animation controls.
 * Provides a visual representation of AI processing state similar to Siri.
 *
 * @example
 * ```tsx
 * <AIOrb
 *   size={2}
 *   onStateChange={(isActive) => console.log('Orb state:', isActive)}
 * />
 * ```
 */
export function AIOrb({
  initiallyActive = false,
  onStateChange,
  className = "",
  size = 1.5,
  advancedAnimation = true,
}: AIOrbProps): JSX.Element {
  // State management with proper typing
  const [processingState, setProcessingState] = useState<ProcessingState>(
    initiallyActive ? ProcessingState.PROCESSING : ProcessingState.IDLE
  );
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  const animationFrameRef = useRef<number | null>(null);
  const lastStateChangeRef = useRef<number>(Date.now());

  /**
   * Derived state for active status
   */
  const isActive = useMemo(
    () =>
      processingState === ProcessingState.PROCESSING ||
      processingState === ProcessingState.STARTING,
    [processingState]
  );

  /**
   * Handles the start button click with proper state transitions
   */
  const handleStart = useCallback(() => {
    const now = Date.now();
    // Debounce rapid clicks
    if (now - lastStateChangeRef.current < 300) return;
    lastStateChangeRef.current = now;

    setProcessingState(ProcessingState.STARTING);

    // Smooth transition to processing state
    setTimeout(() => {
      setProcessingState(ProcessingState.PROCESSING);
      onStateChange?.(true);
    }, 200);
  }, [onStateChange]);

  /**
   * Handles the stop button click with proper state transitions
   */
  const handleStop = useCallback(() => {
    const now = Date.now();
    // Debounce rapid clicks
    if (now - lastStateChangeRef.current < 300) return;
    lastStateChangeRef.current = now;

    setProcessingState(ProcessingState.STOPPING);

    // Smooth transition to idle state
    setTimeout(() => {
      setProcessingState(ProcessingState.IDLE);
      onStateChange?.(false);
    }, 200);
  }, [onStateChange]);

  /**
   * Advanced animation effects when enabled
   */
  useEffect(() => {
    if (!advancedAnimation || !isActive) {
      setAnimationSpeed(1);
      return;
    }

    let speed = 1;
    let increasing = true;

    const animate = () => {
      if (increasing) {
        speed += 0.005;
        if (speed >= 1.3) increasing = false;
      } else {
        speed -= 0.005;
        if (speed <= 0.8) increasing = true;
      }

      setAnimationSpeed(speed);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, advancedAnimation]);

  /**
   * Memoized orb configuration for optimal performance
   */
  const orbConfig = useMemo(
    () => ({
      size,
      animationSpeedBase: isActive ? animationSpeed : 0.3,
      animationSpeedHue: isActive ? animationSpeed * 1.2 : 0.1,
      hueRotation: isActive ? 180 : 120,
      mainOrbHueAnimation: isActive,
      blobAOpacity: isActive ? 0.4 : 0.2,
      blobBOpacity: isActive ? 0.9 : 0.6,
    }),
    [isActive, animationSpeed, size]
  );

  /**
   * Button base styles for consistency
   */
  const buttonBaseClasses =
    "px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  /**
   * Get button state classes based on processing state
   */
  const getButtonClasses = useCallback(
    (isStartButton: boolean): string => {
      if (isStartButton) {
        return processingState === ProcessingState.IDLE ||
          processingState === ProcessingState.STOPPING
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-blue-500/50"
          : "bg-gray-600 text-gray-400 cursor-not-allowed";
      } else {
        return processingState === ProcessingState.PROCESSING ||
          processingState === ProcessingState.STARTING
          ? "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 shadow-red-500/50"
          : "bg-gray-600 text-gray-400 cursor-not-allowed";
      }
    },
    [processingState]
  );

  /**
   * Status text for accessibility and user feedback
   */
  const statusText = useMemo(() => {
    switch (processingState) {
      case ProcessingState.STARTING:
        return "Initializing AI...";
      case ProcessingState.PROCESSING:
        return "AI Processing Active";
      case ProcessingState.STOPPING:
        return "Shutting down...";
      default:
        return "AI Ready";
    }
  }, [processingState]);

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-8 ${className}`}
      role="region"
      aria-label="AI Orb Interface"
    >
      {/* Orb Container with glow effect */}
      <div className="relative">
        {/* Glow effect when active */}
        {isActive && (
          <div className="absolute inset-0 scale-110 blur-2xl opacity-50 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full animate-pulse" />
        )}

        {/* Main Orb */}
        <div
          className={`relative transition-transform duration-500 ${
            isActive ? "scale-100" : "scale-90"
          }`}
          style={{
            filter: isActive
              ? "drop-shadow(0 0 40px rgba(139, 92, 246, 0.6))"
              : "drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))",
          }}
        >
          <Orb {...orbConfig} />
        </div>

        {/* Pulsing ring indicator */}
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full rounded-full border-2 border-purple-400/30 animate-ping" />
          </div>
        )}
      </div>

      {/* Status Display */}
      <div className="flex flex-col items-center space-y-3">
        <div
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-400/30"
              : "bg-white/5 text-gray-400 border border-white/10"
          }`}
        >
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-green-400 animate-pulse" : "bg-gray-500"
              }`}
            />
            <span>{statusText}</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleStart}
          disabled={
            processingState === ProcessingState.PROCESSING ||
            processingState === ProcessingState.STARTING
          }
          className={`${buttonBaseClasses} ${getButtonClasses(true)}`}
          aria-label="Start AI processing"
        >
          <span className="flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            <span>Start</span>
          </span>
        </button>

        <button
          onClick={handleStop}
          disabled={
            processingState === ProcessingState.IDLE ||
            processingState === ProcessingState.STOPPING
          }
          className={`${buttonBaseClasses} ${getButtonClasses(false)}`}
          aria-label="Stop AI processing"
        >
          <span className="flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                clipRule="evenodd"
              />
            </svg>
            <span>Stop</span>
          </span>
        </button>
      </div>

      {/* Accessibility announcement for screen readers */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {statusText}
      </div>
    </div>
  );
}

/**
 * Export type definitions for external use
 */
export type { AIOrbProps };
export { ProcessingState };
