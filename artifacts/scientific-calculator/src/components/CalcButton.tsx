import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CalcButtonProps extends HTMLMotionProps<"button"> {
  variant?: "default" | "primary" | "secondary" | "destructive" | "ghost";
  size?: "default" | "wide";
  label?: string; // For aria-label
}

export const CalcButton = React.forwardRef<HTMLButtonElement, CalcButtonProps>(
  ({ className, variant = "default", size = "default", label, children, ...props }, ref) => {
    const variantClasses = {
      default: "bg-card text-card-foreground hover:bg-muted border border-border/50",
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      ghost: "bg-transparent hover:bg-muted text-foreground"
    };

    const sizeClasses = {
      default: "col-span-1 aspect-[4/3] sm:aspect-square",
      wide: "col-span-2 aspect-[8/3] sm:aspect-[2/1]"
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.02 }}
        className={cn(
          "rounded-xl font-medium text-sm sm:text-base flex items-center justify-center transition-colors shadow-sm",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        aria-label={label || typeof children === "string" ? children as string : "button"}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
CalcButton.displayName = "CalcButton";
