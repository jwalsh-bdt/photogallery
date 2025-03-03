import React from "react";
import { motion } from "framer-motion";
import { X, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface CartItem {
  photoId: string;
  photoUrl?: string;
  photoTitle?: string;
  size: {
    name: string;
    dimensions: string;
    price: number;
  };
  material: {
    name: string;
    price: number;
  };
  frame: {
    name: string;
    price: number;
  } | null;
  quantity: number;
  totalPrice: number;
}

interface CartDrawerProps {
  items?: CartItem[];
  onClose?: () => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
}

const CartDrawer = ({
  items = [],
  onClose = () => {},
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
}: CartDrawerProps) => {
  // Calculate cart totals
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = items.length > 0 ? 12.99 : 0;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-gray-900 shadow-xl">
      <motion.div
        className="h-full flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart
            {items.length > 0 && (
              <span className="ml-2 text-sm bg-white text-black px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            )}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <ShoppingBag className="h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-400 mb-6">
                Looks like you haven't added any prints to your cart yet.
              </p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li
                  key={`${item.photoId}-${index}`}
                  className="bg-gray-800 rounded-lg overflow-hidden"
                >
                  <div className="flex">
                    {/* Item image */}
                    <div className="w-24 h-24 bg-gray-700 flex-shrink-0">
                      {item.photoUrl && (
                        <img
                          src={item.photoUrl}
                          alt={item.photoTitle || "Print"}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Item details */}
                    <div className="flex-1 p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">
                          {item.photoTitle || "Print"}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-white -mt-1 -mr-1"
                          onClick={() => onRemoveItem(item.photoId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-sm text-gray-400 mt-1">
                        <p>
                          {item.size.name} ({item.size.dimensions})
                        </p>
                        <p>
                          {item.material.name}
                          {item.frame && item.frame.name !== "No Frame"
                            ? `, ${item.frame.name} Frame`
                            : ""}
                        </p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-gray-700 rounded">
                          <button
                            className="px-2 py-1 text-gray-400 hover:text-white"
                            onClick={() =>
                              onUpdateQuantity(
                                item.photoId,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                          >
                            -
                          </button>
                          <span className="px-2 py-1">{item.quantity}</span>
                          <button
                            className="px-2 py-1 text-gray-400 hover:text-white"
                            onClick={() =>
                              onUpdateQuantity(item.photoId, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <p className="font-medium">
                          ${item.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-800 p-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2 bg-gray-800" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() => (window.location.href = "/checkout")}
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Checkout
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartDrawer;
