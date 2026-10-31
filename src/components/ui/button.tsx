"use client";

import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs md:text-sm font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d31c31] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] disabled:pointer-events-none disabled:opacity-50 overflow-hidden will-change-transform",
  {
    variants: {
      variant: {
        default:
          "bg-[#d31c31] text-[#dddddd] shadow-[3px_3px_0px_rgba(15,15,17,1)] md:shadow-[4px_4px_0px_rgba(15,15,17,1)] hover:shadow-[1px_1px_0px_rgba(15,15,17,1)] md:hover:shadow-[2px_2px_0px_rgba(15,15,17,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200",
        dark: "bg-[#0f0f11] text-[#d31c31] border-2 border-[#d31c31] shadow-[3px_3px_0px_rgba(211,28,49,1)] md:shadow-[4px_4px_0px_rgba(211,28,49,1)] hover:shadow-[1px_1px_0px_rgba(211,28,49,1)] md:hover:shadow-[2px_2px_0px_rgba(211,28,49,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200",
        outline:
          "border-2 border-[#d31c31] bg-transparent text-[#d31c31] hover:bg-[#d31c31]/10",
        ghost:
          "bg-transparent text-foreground hover:bg-[#d31c31]/10 hover:text-[#d31c31]",
      },
      size: {
        // Mobile sizes are smaller, scaling up on md screens
        default: "h-10 px-5 md:h-12 md:px-8 text-sm md:text-base",
        sm: "h-8 px-4 md:h-10 md:px-5 text-xs",
        lg: "h-12 px-6 md:h-14 md:px-10 text-base",
        icon: "h-10 w-10 md:h-12 md:w-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  animated?: boolean;
  magnetic?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      animated = true,
      magnetic = true,
      loading = false,
      disabled,
      children,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      onMouseDown,
      onMouseUp,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const localRef = React.useRef<HTMLButtonElement>(null);
    const blockRef = React.useRef<HTMLSpanElement>(null);
    const isHovered = React.useRef(false);
    const isPressed = React.useRef(false);

    React.useImperativeHandle(ref, () => localRef.current as HTMLButtonElement);

    const isDisabled = disabled || loading;
    const getEl = (e: React.SyntheticEvent) => e.currentTarget as HTMLElement;

    const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseEnter?.(e);
      // Disable magnetic/gsap effects on touch devices for native feel
      if (
        !animated ||
        isDisabled ||
        isHovered.current ||
        window.matchMedia("(pointer: coarse)").matches
      )
        return;
      isHovered.current = true;

      const el = getEl(e);

      gsap.to(el, {
        y: -2,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (blockRef.current) {
        gsap.fromTo(
          blockRef.current,
          { xPercent: -100 },
          {
            xPercent: 100,
            duration: 0.4,
            ease: "power2.inOut",
            overwrite: true,
          },
        );
      }
    };

    const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseLeave?.(e);
      if (!animated || window.matchMedia("(pointer: coarse)").matches) return;
      isHovered.current = false;
      isPressed.current = false;

      gsap.to(getEl(e), {
        y: 0,
        x: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseMove?.(e);
      if (
        !animated ||
        !magnetic ||
        isDisabled ||
        !isHovered.current ||
        window.matchMedia("(pointer: coarse)").matches
      )
        return;
      const el = getEl(e);
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.1,
        y: y * 0.1 - 2,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseDown?.(e);
      if (!animated || isDisabled || isPressed.current) return;
      isPressed.current = true;

      gsap.to(getEl(e), {
        scale: 0.97,
        duration: 0.1,
        ease: "none",
        overwrite: "auto",
      });
    };

    const handleUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseUp?.(e);
      if (!animated) return;
      isPressed.current = false;

      gsap.to(getEl(e), {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const interactionHandlers = animated
      ? {
          onMouseEnter: handleEnter,
          onMouseLeave: handleLeave,
          onMouseMove: handleMove,
          onMouseDown: handleDown,
          onMouseUp: handleUp,
        }
      : {};

    return (
      <Comp
        ref={localRef}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...interactionHandlers}
        {...props}
      >
        {/* Geometric slide block */}
        {animated && (
          <span
            ref={blockRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-20"
            style={{
              background: "currentColor",
              transform: "translateX(-100%)",
            }}
          />
        )}

        <Slottable>
          <span className="relative z-10 inline-flex items-center justify-center gap-2">
            {loading && (
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {children}
          </span>
        </Slottable>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
