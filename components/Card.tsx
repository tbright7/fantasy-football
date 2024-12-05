"use client";
import React, { useState } from "react";

interface CardProps {
  children: React.ReactNode;
  header?: string | React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  headerTag?: keyof JSX.IntrinsicElements; // Allows customization of the header tag
  collapsible?: boolean; // Indicates if the card is collapsible
  defaultCollapsed?: boolean; // Initial state for the collapsible card
}

export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  className = "",
  headerTag: HeaderTag = "h5", // Default to h5
  collapsible = false,
  defaultCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const toggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div
      className={`block w-full max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow ${className}`}
    >
      {header && (
        <div
          className={`mb-4 border-b border-gray-200 pb-2 ${
            collapsible ? "cursor-pointer" : ""
          } flex justify-between items-center`}
          onClick={toggleCollapse}
        >
          {typeof header === "string" ? (
            <HeaderTag className="text-lg font-bold">{header}</HeaderTag>
          ) : (
            header
          )}
          {collapsible && (
            <button
              className="text-sm text-blue-500"
              aria-label={isCollapsed ? "Expand content" : "Collapse content"}
            >
              {isCollapsed ? "+" : "−"}
            </button>
          )}
        </div>
      )}
      {!isCollapsed && <div className="mb-4">{children}</div>}
      {!isCollapsed && footer && (
        <div className="mt-4 border-t border-gray-200 pt-2">{footer}</div>
      )}
    </div>
  );
};

export default Card;
