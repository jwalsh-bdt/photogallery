import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ArrowLeft, CreditCard } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderSummaryProps {
  items?: OrderItem[];
  subtotal?: number;
  shipping?: number;
  tax?: number;
  insurance?: number;
  total?: number;
  onConfirmOrder?: () => void;
  onReturnToCart?: () => void;
}

const OrderSummary = ({
  items = [
    {
      id: "1",
      name: "Mountain Landscape Print",
      quantity: 1,
      price: 120.0,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80",
    },
    {
      id: "2",
      name: "Ocean Sunset Canvas",
      quantity: 2,
      price: 85.0,
      image:
        "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80",
    },
  ],
  subtotal = 290.0,
  shipping = 15.99,
  tax = 23.2,
  insurance = 8.5,
  total = 337.69,
  onConfirmOrder = () => console.log("Order confirmed"),
  onReturnToCart = () => console.log("Return to cart"),
}: OrderSummaryProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Items list */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Items</h3>
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Cost breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance</span>
                <span>${insurance.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>

            {/* Payment method info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Payment Method:</span>
                <span>Credit Card ending in 4242</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onReturnToCart}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Cart
          </Button>
          <Button
            onClick={onConfirmOrder}
            className="bg-green-600 hover:bg-green-700"
          >
            Confirm Order
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderSummary;
