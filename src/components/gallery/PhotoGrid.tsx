import React, { useState } from "react";
import { motion } from "framer-motion";
import PhotoCard from "./PhotoCard";

export interface Photo {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  collectionId?: string;
}

interface PhotoGridProps {
  photos?: Photo[];
  filteredCollectionId?: string;
  onPhotoQuickView?: (id: string) => void;
  onPhotoPurchase?: (id: string) => void;
}

const PhotoGrid = ({
  photos = [
    {
      id: "photo-1",
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Mountain Landscape",
      description: "Serene mountain vista captured at dawn",
      price: 79.99,
      collectionId: "landscapes",
    },
    {
      id: "photo-2",
      imageUrl:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      title: "Forest Path",
      description: "Mystical forest trail in morning fog",
      price: 89.99,
      collectionId: "landscapes",
    },
    {
      id: "photo-3",
      imageUrl:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Coastal Sunset",
      description: "Dramatic sunset over rocky coastline",
      price: 99.99,
      collectionId: "landscapes",
    },
    {
      id: "photo-4",
      imageUrl:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      title: "Woodland Stream",
      description: "Peaceful stream flowing through ancient forest",
      price: 74.99,
      collectionId: "landscapes",
    },
    {
      id: "photo-5",
      imageUrl:
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Mountain Lake",
      description: "Pristine alpine lake reflecting mountain peaks",
      price: 109.99,
      collectionId: "landscapes",
    },
    {
      id: "photo-6",
      imageUrl:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Prairie Sunset",
      description: "Golden hour over vast prairie landscape",
      price: 69.99,
      collectionId: "landscapes",
    },
    {
      id: "photo-7",
      imageUrl:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Lion Portrait",
      description: "Majestic lion in the African savanna",
      price: 119.99,
      collectionId: "wildlife",
    },
    {
      id: "photo-8",
      imageUrl:
        "https://images.unsplash.com/photo-1564349683136-77e08dba1ef3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1972&q=80",
      title: "Panda Eating",
      description: "Giant panda enjoying bamboo in its natural habitat",
      price: 99.99,
      collectionId: "wildlife",
    },
    {
      id: "photo-9",
      imageUrl:
        "https://images.unsplash.com/photo-1504006833117-8886a355efbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Elegant Woman",
      description: "Studio portrait with dramatic lighting",
      price: 129.99,
      collectionId: "portraits",
    },
    {
      id: "photo-10",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      title: "Urban Portrait",
      description: "Stylish portrait in an urban setting",
      price: 89.99,
      collectionId: "portraits",
    },
    {
      id: "photo-11",
      imageUrl:
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      title: "City Skyline",
      description: "Modern city skyline at blue hour",
      price: 109.99,
      collectionId: "urban",
    },
    {
      id: "photo-12",
      imageUrl:
        "https://images.unsplash.com/photo-1506259091721-347e791bab0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Abstract Light",
      description: "Abstract light patterns in long exposure",
      price: 79.99,
      collectionId: "abstract",
    },
  ],
  filteredCollectionId = "all",
  onPhotoQuickView = () => {},
  onPhotoPurchase = () => {},
}: PhotoGridProps) => {
  const [loadedItems, setLoadedItems] = useState(0);

  const handleItemLoad = () => {
    setLoadedItems((prev) => prev + 1);
  };

  // Staggered animation for grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Filter photos based on selected collection
  const displayedPhotos =
    filteredCollectionId === "all"
      ? photos
      : photos.filter((photo) => photo.collectionId === filteredCollectionId);

  return (
    <div className="bg-black py-8 px-4 md:px-8 lg:px-12 w-full">
      {displayedPhotos.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-gray-400">
            No photos found in this collection
          </h3>
          <p className="text-gray-500 mt-2">
            Try selecting a different collection
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayedPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              onViewportEnter={handleItemLoad}
            >
              <PhotoCard
                id={photo.id}
                imageUrl={photo.imageUrl}
                title={photo.title}
                description={photo.description}
                price={photo.price}
                onQuickView={onPhotoQuickView}
                onPurchase={onPhotoPurchase}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Loading indicator */}
      {loadedItems < displayedPhotos.length && (
        <div className="flex justify-center mt-8">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default PhotoGrid;
