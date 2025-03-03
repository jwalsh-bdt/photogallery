import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent } from "./ui/dialog";
import PhotoGrid from "./gallery/PhotoGrid";
import PhotoDetailModal from "./gallery/PhotoDetailModal";
import PrintCustomizer from "./print/PrintCustomizer";
import CartDrawer from "./cart/CartDrawer";
import Footer from "./layout/Footer";
import CollectionFilter, { Collection } from "./gallery/CollectionFilter";
import CollectionHeader from "./gallery/CollectionHeader";

interface HomeProps {
  featuredPhotos?: any[];
  isCartOpen?: boolean;
}

const Home = ({ featuredPhotos = [], isCartOpen = false }: HomeProps) => {
  // State for UI interactions
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(isCartOpen);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [customizingPhoto, setCustomizingPhoto] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [activeCollection, setActiveCollection] = useState<string>("all");

  // Available collections
  const collections: Collection[] = [
    { id: "all", name: "All Photos" },
    {
      id: "landscapes",
      name: "Landscapes",
      description: "Beautiful natural scenery",
    },
    {
      id: "wildlife",
      name: "Wildlife",
      description: "Animals in their natural habitat",
    },
    {
      id: "portraits",
      name: "Portraits",
      description: "Captivating human subjects",
    },
    { id: "urban", name: "Urban", description: "City life and architecture" },
    {
      id: "abstract",
      name: "Abstract",
      description: "Conceptual and abstract imagery",
    },
  ];

  // Handle photo interactions
  const handleQuickView = (id: string) => {
    setSelectedPhoto(id);
  };

  const handlePurchase = (id: string) => {
    setCustomizingPhoto(id);
  };

  const handleAddToCart = (customization: any) => {
    setCartItems([...cartItems, customization]);
    setCustomizingPhoto(null);
    setCartOpen(true);
  };

  // Header component (inline for this page)
  const Header = () => (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900 bg-opacity-95 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-white">
            PhotoArt
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Gallery
            </a>
            <a
              href="/about"
              className="text-white hover:text-gray-300 transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:bg-gray-800"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartOpen(true)}
              className="text-white hover:bg-gray-800 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 space-y-4 flex flex-col items-center"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <a
                href="/"
                className="text-white hover:text-gray-300 transition-colors w-full text-center py-2"
              >
                Gallery
              </a>
              <a
                href="/about"
                className="text-white hover:text-gray-300 transition-colors w-full text-center py-2"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-white hover:text-gray-300 transition-colors w-full text-center py-2"
              >
                Contact
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );

  // Hero section
  const Hero = () => (
    <section className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Hero background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Capture the Moment, Keep it Forever
        </motion.h1>

        <motion.p
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore our collection of fine art photography prints, available in
          various sizes and finishes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200"
            onClick={() => {
              const gallerySection = document.getElementById("gallery");
              if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Explore Gallery
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <Hero />

      {/* Gallery Section */}
      <section id="gallery" className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Photography
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse our collections of premium prints available for purchase.
              Each photograph is printed using archival-quality materials.
            </p>
          </motion.div>

          <CollectionFilter
            collections={collections}
            activeCollection={activeCollection}
            onSelectCollection={setActiveCollection}
          />

          <CollectionHeader
            activeCollection={activeCollection}
            collections={collections}
          />

          <PhotoGrid
            filteredCollectionId={activeCollection}
            onPhotoQuickView={handleQuickView}
            onPhotoPurchase={handlePurchase}
          />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                About Our Prints
              </h2>
              <p className="text-gray-300">
                Each photograph is carefully processed and printed on premium
                materials to ensure the highest quality reproduction of the
                original image.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Archival-quality inks and papers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Multiple size and framing options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Secure packaging and worldwide shipping</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Satisfaction guaranteed</span>
                </li>
              </ul>
              <Button className="mt-4">Learn More</Button>
            </motion.div>

            <motion.div
              className="rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
                alt="Print workshop"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear from people who have purchased our prints for their homes and
              offices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "New York, NY",
                quote:
                  "The print quality exceeded my expectations. The colors are vibrant and the detail is incredible.",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
              },
              {
                name: "Michael Chen",
                location: "San Francisco, CA",
                quote:
                  "I've ordered three prints so far and each one has been perfect. The framing options are excellent too.",
                avatar:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
              },
              {
                name: "Emma Rodriguez",
                location: "Austin, TX",
                quote:
                  "Fast shipping and the packaging was very secure. The print looks amazing in my living room!",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="italic text-gray-300">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore our collection and find the perfect print for your home or
              office.
            </p>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200"
              onClick={() => {
                const gallerySection = document.getElementById("gallery");
                if (gallerySection) {
                  gallerySection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Browse Gallery
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Modals and Drawers */}
      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800 sm:max-w-md">
          <div className="space-y-4 py-2">
            <h2 className="text-xl font-bold">Search Photos</h2>
            <div className="flex">
              <Input
                placeholder="Search by keyword or description..."
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="ml-2">Search</Button>
            </div>
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Popular searches:</h3>
              <div className="flex flex-wrap gap-2">
                {["Mountains", "Ocean", "Forest", "Sunset", "Wildlife"].map(
                  (tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      {tag}
                    </Button>
                  ),
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <PhotoDetailModal
          photoId={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onPurchase={(id) => {
            setSelectedPhoto(null);
            setCustomizingPhoto(id);
          }}
        />
      )}

      {/* Print Customizer */}
      {customizingPhoto && (
        <PrintCustomizer
          photoId={customizingPhoto}
          onClose={() => setCustomizingPhoto(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <CartDrawer
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={(id, quantity) => {
            // Update cart item quantity logic would go here
          }}
          onRemoveItem={(id) => {
            // Remove item from cart logic would go here
            setCartItems(cartItems.filter((item) => item.photoId !== id));
          }}
        />
      )}
    </div>
  );
};

export default Home;
