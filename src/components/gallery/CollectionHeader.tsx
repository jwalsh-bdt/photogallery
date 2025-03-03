import React from "react";
import { motion } from "framer-motion";
import { Collection } from "./CollectionFilter";

interface CollectionHeaderProps {
  activeCollection: string;
  collections: Collection[];
}

const CollectionHeader = ({
  activeCollection,
  collections,
}: CollectionHeaderProps) => {
  // Find the active collection
  const collection = collections?.find((c) => c.id === activeCollection);

  // If no collection is found or it's the "all" collection, return null
  if (!collection || activeCollection === "all") return null;

  // Background images for different collections
  const backgroundImages = {
    landscapes:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    wildlife:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    portraits:
      "https://images.unsplash.com/photo-1504006833117-8886a355efbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    urban:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    abstract:
      "https://images.unsplash.com/photo-1506259091721-347e791bab0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  };

  // Get the background image for the active collection
  const backgroundImage =
    backgroundImages[activeCollection as keyof typeof backgroundImages] || "";

  return (
    <motion.div
      className="relative w-full h-64 mb-8 overflow-hidden rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      key={activeCollection}
    >
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={collection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <motion.h2
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {collection.name}
        </motion.h2>
        {collection.description && (
          <motion.p
            className="text-gray-300 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {collection.description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default CollectionHeader;
