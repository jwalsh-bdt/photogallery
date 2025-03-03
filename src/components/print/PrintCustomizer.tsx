import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PrintPreview from "./PrintPreview";
import PrintOptions from "./PrintOptions";

interface FrameOption {
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

interface PrintCustomizerProps {
  photoId?: string;
  photoUrl?: string;
  photoTitle?: string;
  onClose?: () => void;
  onAddToCart?: (customization: PrintCustomization) => void;
}

interface PrintCustomization {
  photoId: string;
  size: SizeOption;
  material: MaterialOption;
  frame: FrameOption | null;
  mat: MatOption | null;
  quantity: number;
  totalPrice: number;
}

const PrintCustomizer = ({
  photoId = "photo-1",
  photoUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  photoTitle = "Mountain Landscape",
  onClose = () => {},
  onAddToCart = () => {},
}: PrintCustomizerProps) => {
  // Sample data for customization options
  const sizeOptions: SizeOption[] = [
    { id: "size-1", name: "Small", dimensions: '8" × 10"', price: 29.99 },
    { id: "size-2", name: "Medium", dimensions: '12" × 16"', price: 49.99 },
    { id: "size-3", name: "Large", dimensions: '18" × 24"', price: 79.99 },
    {
      id: "size-4",
      name: "Extra Large",
      dimensions: '24" × 36"',
      price: 129.99,
    },
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
    {
      id: "material-3",
      name: "Canvas",
      description: "Textured surface with gallery-quality finish",
      price: 40,
      imageUrl:
        "https://images.unsplash.com/photo-1579608578088-220f8d62e873?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FudmFzJTIwdGV4dHVyZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "material-4",
      name: "Metal Print",
      description: "Stunning luminescence on aluminum sheet",
      price: 80,
      imageUrl:
        "https://images.unsplash.com/photo-1535161466759-5717c6df5e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWV0YWwlMjB0ZXh0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const frameOptions: FrameOption[] = [
    {
      id: "frame-0",
      name: "No Frame",
      description: "Print only, no frame included",
      price: 0,
      imageUrl:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhbmslMjBmcmFtZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "frame-1",
      name: "Slim Black",
      description: "Minimalist black aluminum frame",
      price: 39.99,
      imageUrl:
        "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2slMjBmcmFtZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "frame-2",
      name: "Classic Wood",
      description: "Elegant natural wood frame",
      price: 59.99,
      imageUrl:
        "https://images.unsplash.com/photo-1598106755735-3057c8fb5cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29vZCUyMGZyYW1lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: "frame-3",
      name: "Modern White",
      description: "Clean white frame with mat",
      price: 49.99,
      imageUrl:
        "https://images.unsplash.com/photo-1579541591970-e5a7e3a79a0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpdGUlMjBmcmFtZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const matOptions: MatOption[] = [
    { id: "mat-0", name: "No Mat", size: '0"', price: 0 },
    { id: "mat-1", name: "Thin Mat", size: '1"', price: 9.99 },
    { id: "mat-2", name: "Standard Mat", size: '2"', price: 14.99 },
    { id: "mat-3", name: "Medium Mat", size: '3"', price: 19.99 },
    { id: "mat-4", name: "Wide Mat", size: '4"', price: 24.99 },
    { id: "mat-5", name: "Extra Wide Mat", size: '5"', price: 29.99 },
  ];

  // State for selected options
  const [selectedSize, setSelectedSize] = useState<SizeOption>(sizeOptions[1]);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption>(
    materialOptions[0],
  );
  const [selectedFrame, setSelectedFrame] = useState<FrameOption | null>(
    frameOptions[0],
  );
  const [selectedMat, setSelectedMat] = useState<MatOption | null>(
    matOptions[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price whenever selections change
  useEffect(() => {
    const basePrice = selectedSize.price;
    const materialPrice = selectedMaterial.price;
    const framePrice = selectedFrame ? selectedFrame.price : 0;
    const matPrice = selectedMat ? selectedMat.price : 0;

    const itemPrice = basePrice + materialPrice + framePrice + matPrice;
    setTotalPrice(itemPrice * quantity);
  }, [selectedSize, selectedMaterial, selectedFrame, selectedMat, quantity]);

  const handleAddToCart = () => {
    const customization: PrintCustomization = {
      photoId,
      size: selectedSize,
      material: selectedMaterial,
      frame: selectedFrame,
      mat: selectedMat,
      quantity,
      totalPrice,
    };

    onAddToCart(customization);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <motion.div
        className="relative mx-auto w-full max-w-6xl rounded-lg bg-gray-900 p-6 text-white shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>

        <h2 className="mb-6 text-2xl font-bold">Customize Your Print</h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left side - Preview */}
          <div className="flex flex-col space-y-4">
            <div className="overflow-hidden rounded-lg bg-gray-800 p-2">
              <PrintPreview
                photoUrl={photoUrl}
                photoTitle={photoTitle}
                selectedSize={selectedSize}
                selectedMaterial={selectedMaterial}
                selectedFrame={selectedFrame}
                selectedMat={selectedMat}
              />
            </div>

            <div className="rounded-lg bg-gray-800 p-4">
              <h3 className="mb-2 text-lg font-medium">{photoTitle}</h3>
              <p className="text-sm text-gray-400">
                Preview shows approximate appearance. Actual colors and
                proportions may vary slightly.
              </p>
            </div>
          </div>

          {/* Right side - Options */}
          <div className="flex flex-col space-y-6">
            <Tabs defaultValue="size" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="size">Size</TabsTrigger>
                <TabsTrigger value="material">Material</TabsTrigger>
                <TabsTrigger value="frame">Frame</TabsTrigger>
                <TabsTrigger value="mat">Mat</TabsTrigger>
              </TabsList>

              <TabsContent value="size" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Choose a Size</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {sizeOptions.map((size) => (
                      <div
                        key={size.id}
                        className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all p-3 ${selectedSize.id === size.id ? "border-white bg-gray-700" : "border-gray-700 bg-gray-800"}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        <div className="flex flex-col h-full">
                          <h4 className="font-medium text-white text-sm">
                            {size.name}
                          </h4>
                          <p className="text-xs text-gray-300 mt-1">
                            {size.dimensions}
                          </p>
                          <p className="text-xs mt-auto pt-2">
                            ${size.price.toFixed(2)}
                          </p>
                        </div>
                        {selectedSize.id === size.id && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="material" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Select Material</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {materialOptions.map((material) => (
                      <div
                        key={material.id}
                        className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all p-3 ${selectedMaterial.id === material.id ? "border-white bg-gray-700" : "border-gray-700 bg-gray-800"}`}
                        onClick={() => setSelectedMaterial(material)}
                      >
                        <div className="flex flex-col h-full">
                          <h4 className="font-medium text-white text-sm">
                            {material.name}
                          </h4>
                          <p className="text-xs text-gray-300 mt-1">
                            {material.description}
                          </p>
                          <p className="text-xs mt-auto pt-2">
                            {material.price === 0
                              ? "Included"
                              : `+${material.price.toFixed(2)}`}
                          </p>
                        </div>
                        {selectedMaterial.id === material.id && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="frame" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Choose a Frame</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {frameOptions.map((frame) => (
                      <div
                        key={frame.id}
                        className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all p-3 ${selectedFrame?.id === frame.id ? "border-white bg-gray-700" : "border-gray-700 bg-gray-800"}`}
                        onClick={() => setSelectedFrame(frame)}
                      >
                        <div className="flex flex-col h-full">
                          <h4 className="font-medium text-white text-sm">
                            {frame.name}
                          </h4>
                          <p className="text-xs text-gray-300 mt-1">
                            {frame.description}
                          </p>
                          <p className="text-xs mt-auto pt-2">
                            {frame.price === 0 && frame.id === "frame-0"
                              ? "No additional cost"
                              : frame.price === 0
                                ? "Included"
                                : `+${frame.price.toFixed(2)}`}
                          </p>
                        </div>
                        {selectedFrame?.id === frame.id && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mat" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Choose a Mat</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {matOptions.map((mat) => (
                      <div
                        key={mat.id}
                        className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all p-3 ${selectedMat?.id === mat.id ? "border-white bg-gray-700" : "border-gray-700 bg-gray-800"}`}
                        onClick={() => setSelectedMat(mat)}
                      >
                        <div className="flex flex-col h-full">
                          <h4 className="font-medium text-white text-sm">
                            {mat.name}
                          </h4>
                          <p className="text-xs text-gray-300 mt-1">
                            {mat.size}
                          </p>
                          <p className="text-xs mt-auto pt-2">
                            {mat.price === 0 && mat.id === "mat-0"
                              ? "No additional cost"
                              : mat.price === 0
                                ? "Included"
                                : `+${mat.price.toFixed(2)}`}
                          </p>
                        </div>
                        {selectedMat?.id === mat.id && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Separator className="bg-gray-700" />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm">Quantity:</span>
                <div className="flex items-center rounded-md border border-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-r-none px-2"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="flex h-8 w-8 items-center justify-center bg-gray-800">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-l-none px-2"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-400">Total Price</p>
                <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <Button size="lg" className="mt-4 w-full" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrintCustomizer;
