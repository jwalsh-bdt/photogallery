import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, ShoppingCart, ZoomIn, ZoomOut, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Photo } from "./PhotoGrid";
import PrintPreview from "../print/PrintPreview";

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

interface PhotoDetailModalProps {
  photoId: string;
  onClose: () => void;
  onPurchase: (id: string) => void;
}

const PhotoDetailModal = ({
  photoId,
  onClose,
  onPurchase,
}: PhotoDetailModalProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Sample data for preview options
  const sizeOptions: SizeOption[] = [
    { id: "size-1", name: "Small", dimensions: '8" × 10"', price: 29.99 },
    { id: "size-2", name: "Medium", dimensions: '12" × 16"', price: 49.99 },
    { id: "size-3", name: "Large", dimensions: '18" × 24"', price: 79.99 },
  ];

  const materialOptions: MaterialOption[] = [
    {
      id: "material-1",
      name: "Matte Paper",
      description: "Classic matte finish with rich colors and no glare",
      price: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhcGVyJTIwdGV4dHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "material-2",
      name: "Glossy Paper",
      description: "Vibrant colors with a reflective finish",
      price: 10,
      imageUrl:
        "https://images.unsplash.com/photo-1587614298171-a01562f6a72b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2xvc3N5JTIwcGFwZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const frameOptions: FrameOption[] = [
    {
      id: "frame-0",
      name: "No Frame",
      description: "Print only, no frame included",
      price: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhbmslMjBmcmFtZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "frame-1",
      name: "Slim Black",
      description: "Minimalist black aluminum frame",
      price: 39.99,
      imageUrl:
        "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2slMjBmcmFtZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

  // State for selected options
  const [selectedSize, setSelectedSize] = useState<SizeOption>(sizeOptions[1]);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption>(
    materialOptions[0],
  );
  const [selectedFrame, setSelectedFrame] = useState<FrameOption | null>(
    frameOptions[0],
  );

  // Find the photo data based on photoId
  // This is a placeholder - in a real app, you would fetch this data from your API or state
  const photo: Photo = {
    id: photoId,
    imageUrl:
      photoId === "photo-1"
        ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        : "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    title: photoId === "photo-1" ? "Mountain Landscape" : "Forest Path",
    description:
      photoId === "photo-1"
        ? "Serene mountain vista captured at dawn"
        : "Mystical forest trail in morning fog",
    price: photoId === "photo-1" ? 79.99 : 89.99,
    collectionId: "landscapes",
  };

  // Calculate total price
  const totalPrice =
    selectedSize.price +
    selectedMaterial.price +
    (selectedFrame ? selectedFrame.price : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <motion.div
        className="relative w-full max-w-6xl bg-gray-900 rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 text-white bg-black bg-opacity-50 hover:bg-opacity-70"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left side - Photo */}
          <div className="relative h-[50vh] lg:h-[80vh] overflow-hidden bg-black">
            <div
              className={`relative h-full w-full transition-transform duration-300 ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className={`h-full w-full object-contain transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
              />
            </div>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-black bg-opacity-50 border-gray-700 text-white hover:bg-opacity-70"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                {isZoomed ? (
                  <ZoomOut className="h-4 w-4" />
                ) : (
                  <ZoomIn className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-black bg-opacity-50 border-gray-700 text-white hover:bg-opacity-70"
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right side - Details and options */}
          <div className="p-6 bg-gray-900 overflow-y-auto max-h-[80vh]">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">{photo.title}</h2>
              <p className="text-gray-400 mt-1">{photo.description}</p>
              {showInfo && (
                <motion.div
                  className="mt-4 p-4 bg-gray-800 rounded-md"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-sm font-medium text-gray-300 mb-2">
                    Photo Details
                  </h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>
                      <span className="text-gray-300">Location:</span> Colorado,
                      USA
                    </li>
                    <li>
                      <span className="text-gray-300">Date Taken:</span> June
                      2023
                    </li>
                    <li>
                      <span className="text-gray-300">Camera:</span> Sony Alpha
                      a7 III
                    </li>
                    <li>
                      <span className="text-gray-300">Lens:</span> 24-70mm f/2.8
                    </li>
                    <li>
                      <span className="text-gray-300">Exposure:</span> f/8,
                      1/250s, ISO 100
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>

            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="options">Options</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="mt-2">
                <div className="bg-gray-800 p-4 rounded-md">
                  <h3 className="text-lg font-medium mb-4">Print Preview</h3>
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-black">
                    <PrintPreview
                      photoUrl={photo.imageUrl}
                      photoTitle={photo.title}
                      selectedSize={selectedSize}
                      selectedMaterial={selectedMaterial}
                      selectedFrame={selectedFrame}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Preview is approximate. Actual colors and proportions may
                    vary slightly.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="options" className="space-y-6 mt-2">
                {/* Size Options */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Size</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {sizeOptions.map((size) => (
                      <Button
                        key={size.id}
                        variant={
                          selectedSize.id === size.id ? "default" : "outline"
                        }
                        className="flex flex-col h-auto py-3 border-gray-700"
                        onClick={() => setSelectedSize(size)}
                      >
                        <span className="text-sm font-medium">{size.name}</span>
                        <span className="text-xs text-gray-400 mt-1">
                          {size.dimensions}
                        </span>
                        <span className="text-xs mt-1">
                          ${size.price.toFixed(2)}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Material Options */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Material</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {materialOptions.map((material) => (
                      <Button
                        key={material.id}
                        variant={
                          selectedMaterial.id === material.id
                            ? "default"
                            : "outline"
                        }
                        className="flex flex-col items-start h-auto py-3 border-gray-700 text-left"
                        onClick={() => setSelectedMaterial(material)}
                      >
                        <span className="text-sm font-medium">
                          {material.name}
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                          {material.description}
                        </span>
                        <span className="text-xs mt-1">
                          {material.price > 0
                            ? `+$${material.price.toFixed(2)}`
                            : "Included"}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Frame Options */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Frame</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {frameOptions.map((frame) => (
                      <Button
                        key={frame.id}
                        variant={
                          selectedFrame?.id === frame.id ? "default" : "outline"
                        }
                        className="flex flex-col items-start h-auto py-3 border-gray-700 text-left"
                        onClick={() => setSelectedFrame(frame)}
                      >
                        <span className="text-sm font-medium">
                          {frame.name}
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                          {frame.description}
                        </span>
                        <span className="text-xs mt-1">
                          {frame.price > 0
                            ? `+$${frame.price.toFixed(2)}`
                            : "No additional cost"}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Separator className="my-6 bg-gray-700" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Price</p>
                <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
              </div>
              <Button
                size="lg"
                onClick={() => onPurchase(photoId)}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Customize & Purchase
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PhotoDetailModal;
