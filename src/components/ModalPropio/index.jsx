import React, { useEffect } from "react";

const ModalPropio = ({
  size = "lg",
  show,
  onHide,
  title,
  footer,
  children,
  loading = false,
  closeButton = true,
  onOpen = () => {},
  onClose = () => {},
  animated = true,
}) => {
  useEffect(() => {
    if (show) {
      onOpen();
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onHide();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        onClose();
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [show, onHide, onOpen, onClose]);

  if (!show) return null;

  // Tamaños del modal
  const modalSizeClass = {
    sm: "max-w-sm",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  }[size] || "max-w-lg";


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-full ${modalSizeClass} transform ${
          show ? "scale-100 opacity-300" : "scale-90 opacity-0"
        } }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>{!loading && title && title()}</div>
        </div>

        {/* Body */}
        <div className="p-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-4 border-t border-gray-200 text-right bg-gray-50 rounded-b-lg">
            {footer()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalPropio;
