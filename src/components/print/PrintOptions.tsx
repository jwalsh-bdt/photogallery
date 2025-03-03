import React from "react";
import { motion } from "framer-motion";

interface Option {
  id: string;
  name: string;
  description?: string;
  price?: number;
  dimensions?: string;
  imageUrl?: string;
}

interface PrintOptionsProps {
  type: "size" | "material" | "frame";
  options: Option[];
  selectedOption: Option | null;
  onSelect: (option: Option) => void;
}

const PrintOptions = ({
  type,
  options,
  selectedOption,
  onSelect,
}: PrintOptionsProps) => {
  // Determine the layout based on option type
  const getLayout = () => {
    switch (type) {
      case "size":
        return "grid grid-cols-2 md:grid-cols-4 gap-4";
      case "material":
      case "frame":
        return "grid grid-cols-1 md:grid-cols-2 gap-4";
      default:
        return "grid grid-cols-2 gap-4";
    }
  };

  return (
    <div className="w-full">
      <div className={getLayout()}>
        {options.map((option) => (
          <motion.div
            key={option.id}
            className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${selectedOption?.id === option.id ? "border-white" : "border-gray-700"}`}
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelect(option)}
          >
            {/* Background image for material and frame options */}
            {(type === "material" || type === "frame") && option.imageUrl && (
              <div className="absolute inset-0 opacity-30">
                <img
                  src={option.imageUrl}
                  alt={option.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="relative p-4 bg-gray-800 bg-opacity-80 h-full">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-white">{option.name}</h3>
                {option.price !== undefined && (
                  <span className="text-sm font-semibold">
                    {option.price === 0
                      ? type === "frame" && option.id === "frame-0"
                        ? ""
                        : "Included"
                      : `+$${option.price.toFixed(2)}`}
                  </span>
                )}
              </div>

              {option.dimensions && (
                <p className="text-sm text-gray-300 mb-1">
                  {option.dimensions}
                </p>
              )}

              {option.description && (
                <p className="text-xs text-gray-400">{option.description}</p>
              )}

              {/* Selected indicator */}
              {selectedOption?.id === option.id && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PrintOptions;
