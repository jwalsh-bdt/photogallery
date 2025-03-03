import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface PhotoCardProps {
  id?: string;
  imageUrl?: string;
  title?: string;
  description?: string;
  price?: number;
  onQuickView?: (id: string) => void;
  onPurchase?: (id: string) => void;
}

const PhotoCard = ({
  id = "photo-1",
  imageUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  title = "Mountain Landscape",
  description = "Serene mountain vista captured at dawn",
  price = 79.99,
  onQuickView = () => {},
  onPurchase = () => {},
}: PhotoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg bg-gray-900 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500",
            isHovered ? "scale-110" : "scale-100",
          )}
        />
      </div>

      {/* Overlay with details that appears on hover */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-4 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-1 text-sm text-gray-300">{description}</p>
        <p className="mt-2 text-lg font-semibold">${price.toFixed(2)}</p>

        <div className="mt-4 flex space-x-2">
          <Button
            size="sm"
            variant="secondary"
            className="flex items-center gap-1"
            onClick={() => onQuickView(id)}
          >
            <Eye className="h-4 w-4" />
            <span>Quick View</span>
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1"
            onClick={() => onPurchase(id)}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Purchase</span>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhotoCard;
