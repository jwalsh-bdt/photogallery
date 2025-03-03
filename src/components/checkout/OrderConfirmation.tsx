import React from "react";
import { CheckCircle, Truck, Calendar, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrderConfirmationProps {
  orderNumber?: string;
  orderDate?: string;
  estimatedDelivery?: string;
  email?: string;
  items?: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  insurance?: number;
  total?: number;
}

const OrderConfirmation = ({
  orderNumber = "ORD-12345-6789",
  orderDate = new Date().toLocaleDateString(),
  estimatedDelivery = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString(),
  email = "customer@example.com",
  items = [
    {
      id: "1",
      name: "Mountain Sunrise Print",
      quantity: 1,
      price: 149.99,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    },
    {
      id: "2",
      name: "Ocean Sunset Canvas",
      quantity: 2,
      price: 89.99,
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
    },
  ],
  subtotal = 329.97,
  shipping = 15.99,
  tax = 26.4,
  insurance = 8.99,
  total = 381.35,
}: OrderConfirmationProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 max-w-md">
          Thank you for your purchase. We've received your order and are
          processing it now.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium">{orderDate}</p>
            </div>
            <div className="space-y-2 flex items-start gap-2">
              <Truck className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Estimated Delivery</p>
                <p className="font-medium">{estimatedDelivery}</p>
              </div>
            </div>
            <div className="space-y-2 flex items-start gap-2">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Confirmation Sent To</p>
                <p className="font-medium">{email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-3 border-b border-gray-100"
              >
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="space-y-2 pt-4">
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
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <span className="font-bold">Total</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button asChild variant="outline" className="w-full md:w-auto">
          <Link to="/orders">View Order History</Link>
        </Button>
        <Button asChild className="w-full md:w-auto">
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Need help with your order?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
