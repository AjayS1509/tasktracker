import React, { ReactNode } from "react";

interface OverlayProps {
  children: ReactNode;
  show: boolean;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ children, show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Overlay;
