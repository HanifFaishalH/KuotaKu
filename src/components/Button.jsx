// components/Button.jsx
import React from "react";
import { useTheme } from "../ThemeContext";

export default function Button({
  children,
  icon: Icon,
  type = "primary", // primary / secondary / accent
  size = "md",      // sm / md / lg
  onClick,
  className = "",
  ...props
}) {
  const { colors } = useTheme();

  // Base classes
  const baseClasses = "rounded-md flex items-center justify-center gap-2 transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";
  
  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base", 
    lg: "px-6 py-3 text-lg"
  };

  // Type classes dengan warna dari theme
  const typeStyles = {
    primary: `bg-[${colors.primary}] hover:bg-[#6A00CC] focus:ring-[${colors.primary}]`,
    secondary: `bg-[${colors.secondary}] hover:bg-[#00C8E0] focus:ring-[${colors.secondary}] text-gray-800`,
    accent: `bg-[${colors.accent}] hover:bg-[#2EE000] focus:ring-[${colors.accent}] text-gray-800`
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${typeStyles[type]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === "sm" ? 16 : size === "lg" ? 20 : 18} />}
      {children}
    </button>
  );
}