import React from "react";
import { motion } from "framer-motion";

interface FrameOption {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface SizeOption {
  id: string;
  name: string;
  dimensions: string;
  price: number;
}

interface MaterialOption {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface MatOption {
  id: string;
  name: string;
  size: string;
  price: number;
}

interface PrintPreviewProps {
  photoUrl?: string;
  photoTitle?: string;
  selectedSize?: SizeOption;
  selectedMaterial?: MaterialOption;
  selectedFrame?: FrameOption | null;
  selectedMat?: MatOption | null;
}

const PrintPreview = ({
  photoUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  photoTitle = "Mountain Landscape",
  selectedSize = {
    id: "size-2",
    name: "Medium",
    dimensions: '12" × 16"',
    price: 49.99,
  },
  selectedMaterial = {
    id: "material-1",
    name: "Matte Paper",
    description: "Classic matte finish with rich colors and no glare",
    price: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhcGVyJTIwdGV4dHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  selectedFrame = null,
  selectedMat = null,
}: PrintPreviewProps) => {
  // Determine frame styling based on selected frame
  const getFrameStyle = () => {
    if (!selectedFrame || selectedFrame.id === "frame-0") {
      return {};
    }

    switch (selectedFrame.id) {
      case "frame-1": // Slim Black
        return {
          border: "20px solid #111",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
        };
      case "frame-2": // Classic Wood
        return {
          border: "30px solid #5d4037",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
        };
      case "frame-3": // Modern White
        return {
          border: "25px solid #f5f5f5",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
        };
      default:
        return {};
    }
  };

  // Determine material styling (subtle effect)
  const getMaterialStyle = () => {
    switch (selectedMaterial.id) {
      case "material-1": // Matte Paper
        return {
          filter: "saturate(0.95) contrast(1.05)",
        };
      case "material-2": // Glossy Paper
        return {
          filter: "saturate(1.2) contrast(1.1)",
        };
      case "material-3": // Canvas
        return {
          filter: "saturate(0.9) contrast(1.15)",
          backgroundImage: `url(${selectedMaterial.imageUrl})`,
          backgroundBlendMode: "multiply",
          opacity: 0.95,
        };
      case "material-4": // Metal Print
        return {
          filter: "saturate(1.3) contrast(1.2) brightness(1.1)",
        };
      default:
        return {};
    }
  };

  // Determine size styling (aspect ratio)
  const getSizeStyle = () => {
    // This is simplified - in a real app you'd calculate actual dimensions
    const sizeMap = {
      "size-1": { width: "80%", height: "80%" }, // Small
      "size-2": { width: "90%", height: "90%" }, // Medium
      "size-3": { width: "95%", height: "95%" }, // Large
      "size-4": { width: "100%", height: "100%" }, // Extra Large
    };

    return (
      sizeMap[selectedSize.id as keyof typeof sizeMap] || {
        width: "90%",
        height: "90%",
      }
    );
  };

  // Determine mat styling based on selected mat
  const getMatStyle = () => {
    if (!selectedMat || selectedMat.id === "mat-0") {
      return {};
    }

    // Extract the mat size from the id (e.g., "mat-2" -> 2)
    const matSizeInches = parseInt(selectedMat.size);

    // Convert to pixels (this is approximate)
    const matSizePixels = `${matSizeInches * 16}px`;

    return {
      border: `${matSizePixels} solid white`,
    };
  };

  const frameStyle = getFrameStyle();
  const materialStyle = getMaterialStyle();
  const sizeStyle = getSizeStyle();
  const matStyle = getMatStyle();

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-800 p-4">
      <motion.div
        className="relative"
        style={{
          width: sizeStyle.width,
          height: sizeStyle.height,
          ...frameStyle,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        key={`${selectedSize.id}-${selectedMaterial.id}-${selectedFrame?.id || "no-frame"}-${selectedMat?.id || "no-mat"}`}
      >
        <div style={matStyle} className="w-full h-full relative">
          <img
            src={photoUrl}
            alt={photoTitle}
            className="w-full h-full object-cover"
            style={materialStyle}
          />
        </div>

        {/* Mat effect for certain frames */}
        {selectedFrame && selectedFrame.id === "frame-3" && (
          <div className="absolute inset-0 border-[15px] border-white" />
        )}

        {/* Shadow overlay to simulate depth */}
        <div className="absolute inset-0 shadow-inner pointer-events-none" />
      </motion.div>

      {/* Room environment simulation */}
      <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-gray-900 to-transparent opacity-50" />
    </div>
  );
};

export default PrintPreview;
