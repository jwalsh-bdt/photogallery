import React from "react";
import { motion } from "framer-motion";
import { Camera, Award, Image, MapPin, Mail, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import Footer from "./layout/Footer";

const About = () => {
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
              className="text-white hover:text-gray-300 transition-colors border-b-2 border-white pb-1"
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

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-gray-800"
          >
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Alex Morgan
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Landscape & Nature Photographer
              </p>
              <p className="text-gray-400 mb-8">
                Capturing the beauty of our natural world through a lens of
                wonder and respect.
              </p>
              <div className="flex space-x-4">
                <Button onClick={() => (window.location.href = "/contact")}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
                <Button variant="outline">
                  <Instagram className="mr-2 h-4 w-4" />
                  Follow
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552642986-ccb41e7059e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80"
                  alt="Alex Morgan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gray-900 p-4 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Based in</p>
                <p className="flex items-center text-lg font-bold">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                  Colorado, USA
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">My Story</h2>
            <div className="space-y-6 text-gray-300">
              <p>
                My journey into photography began over 15 years ago when I first
                picked up my father's old film camera during a family trip to
                Yosemite National Park. The majesty of Half Dome and the serene
                beauty of the valley floor awakened something in me that I
                hadn't known existed—a desire to capture and preserve these
                fleeting moments of natural wonder.
              </p>
              <p>
                After studying fine arts at the University of Colorado, I spent
                five years traveling across North America, living out of my
                converted van and documenting the diverse landscapes that make
                this continent so extraordinary. From the rugged coastlines of
                the Pacific Northwest to the sun-drenched deserts of the
                Southwest, my camera became both my companion and my voice.
              </p>
              <p>
                Today, I focus on creating images that not only showcase the
                beauty of our natural world but also highlight the urgent need
                for conservation. My work has been featured in National
                Geographic, Outdoor Photographer, and various environmental
                publications. Through my photography, I hope to inspire others
                to venture outdoors, to connect with nature, and to join the
                effort to protect these precious landscapes for future
                generations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Style & Approach Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">My Approach & Style</h2>
              <div className="space-y-6 text-gray-300">
                <p>
                  I believe that the most powerful landscape photographs are
                  those that evoke emotion and tell a story. My style is
                  characterized by dramatic lighting, thoughtful composition,
                  and a deep respect for the natural environment I'm
                  photographing.
                </p>
                <p>
                  Rather than heavily manipulating my images in post-processing,
                  I prefer to spend time in the field, often returning to the
                  same location multiple times until the conditions are perfect.
                  This patience allows me to capture authentic moments that
                  reflect the true essence of a place.
                </p>
                <p>
                  My work tends toward the atmospheric—misty mornings, golden
                  hour light, and the subtle interplay of weather and landscape.
                  I'm particularly drawn to the transitional moments in nature:
                  storm clouds breaking, first light touching a mountain peak,
                  or the last rays of sunset illuminating a forest.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="order-1 md:order-2 grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Mountain lake at sunset"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Mountain peaks in fog"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Sunrise over mountains"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2088&q=80"
                  alt="Forest in fog"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Influences Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Influences & Inspiration
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My work draws inspiration from both classic landscape masters and
              contemporary photographers who push the boundaries of the medium.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ansel Adams",
                description:
                  "The technical precision and emotional depth of Adams' black and white landscapes taught me the importance of patience and meticulous attention to light.",
                image:
                  "https://images.unsplash.com/photo-1472791108553-c9405341e398?ixlib=rb-4.0.3&auto=format&fit=crop&w=2137&q=80",
              },
              {
                name: "Galen Rowell",
                description:
                  "Rowell's ability to capture fleeting moments of extraordinary light in remote locations continues to inspire my approach to adventure photography.",
                image:
                  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
              },
              {
                name: "Marc Adamus",
                description:
                  "Adamus' dramatic compositions and his mastery of challenging weather conditions have influenced my willingness to endure discomfort for the perfect shot.",
                image:
                  "https://images.unsplash.com/photo-1434394354979-a235cd36269d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2051&q=80",
              },
            ].map((influence, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={influence.image}
                    alt={influence.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{influence.name}</h3>
                  <p className="text-gray-400">{influence.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              My Equipment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Camera className="h-6 w-6 mr-3 text-gray-400" />
                  <h3 className="text-xl font-bold">Cameras</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex justify-between">
                    <span>Sony Alpha a7R IV</span>
                    <span className="text-gray-500">Primary</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sony Alpha a7C</span>
                    <span className="text-gray-500">Secondary</span>
                  </li>
                  <li className="flex justify-between">
                    <span>DJI Mavic 3 Pro</span>
                    <span className="text-gray-500">Aerial</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Image className="h-6 w-6 mr-3 text-gray-400" />
                  <h3 className="text-xl font-bold">Lenses</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex justify-between">
                    <span>Sony 16-35mm f/2.8 GM</span>
                    <span className="text-gray-500">Wide</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sony 24-70mm f/2.8 GM</span>
                    <span className="text-gray-500">Standard</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sony 70-200mm f/2.8 GM</span>
                    <span className="text-gray-500">Telephoto</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sony 100-400mm f/4.5-5.6 GM</span>
                    <span className="text-gray-500">Super Telephoto</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Awards & Recognition</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I'm honored to have had my work recognized by these prestigious
              organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                award: "International Landscape Photographer of the Year",
                category: "Finalist",
                year: "2022",
              },
              {
                award: "National Geographic Nature Photographer",
                category: "Editor's Pick",
                year: "2021",
              },
              {
                award: "Fine Art Photography Awards",
                category: "Landscape - Gold",
                year: "2020",
              },
              {
                award: "Outdoor Photographer of the Year",
                category: "Light on the Land",
                year: "2019",
              },
            ].map((award, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Award className="h-10 w-10 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-lg font-bold mb-2">{award.award}</h3>
                <p className="text-gray-400 text-sm">{award.category}</p>
                <p className="text-gray-500 text-sm">{award.year}</p>
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
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're interested in purchasing a print, licensing an
              image, or discussing a custom project, I'd love to hear from you.
            </p>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200"
              onClick={() => (window.location.href = "/contact")}
            >
              Contact Me
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
