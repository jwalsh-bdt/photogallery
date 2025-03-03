import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import Footer from "./layout/Footer";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
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
              className="text-white hover:text-gray-300 transition-colors border-b-2 border-white pb-1"
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
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Have a question about my work or interested in purchasing a print?
              I'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="bg-gray-900 rounded-lg p-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>

              {isSubmitted ? (
                <motion.div
                  className="bg-green-900/50 border border-green-500 text-green-100 rounded-lg p-4 mb-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="flex items-center">
                    <span className="bg-green-500 rounded-full p-1 mr-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Thank you! Your message has been sent successfully. I'll get
                    back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Print inquiry"
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="I'm interested in purchasing a print of..."
                      required
                      className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-gray-400 mb-8">
                  Feel free to reach out through any of the following methods. I
                  typically respond to inquiries within 24-48 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gray-800 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-400">
                      contact@alexmorgan-photography.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-800 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-400">+1 (303) 555-1234</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Monday-Friday, 9am-5pm MST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-800 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Studio Location</h3>
                    <p className="text-gray-400">123 Mountain View Drive</p>
                    <p className="text-gray-400">Boulder, CO 80302</p>
                    <p className="text-xs text-gray-500 mt-1">
                      By appointment only
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Instagram className="h-6 w-6 text-pink-400" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Facebook className="h-6 w-6 text-blue-400" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Twitter className="h-6 w-6 text-sky-400" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here are answers to some common questions about print orders and
              commissions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How long does shipping take?",
                answer:
                  "Standard shipping within the US typically takes 5-7 business days. International shipping can take 10-14 business days. Expedited shipping options are available at checkout.",
              },
              {
                question: "Do you offer custom sizes?",
                answer:
                  "Yes! If you need a custom size that isn't listed in the standard options, please contact me directly with your requirements and I'll provide a quote.",
              },
              {
                question: "Are your prints signed?",
                answer:
                  "All prints are hand-signed and include a certificate of authenticity. Limited edition prints are numbered as well.",
              },
              {
                question: "Do you take on commission work?",
                answer:
                  "I selectively take on commission work depending on my schedule and the project. Please contact me with details about your project for consideration.",
              },
              {
                question: "What's your return policy?",
                answer:
                  "I stand behind the quality of my prints. If you're not satisfied with your purchase, contact me within 14 days of receipt for return or exchange options.",
              },
              {
                question: "Can I license your photos for commercial use?",
                answer:
                  "Yes, many of my images are available for licensing. Please contact me with details about your intended use for licensing rates and terms.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="rounded-lg overflow-hidden h-[400px] relative">
            {/* This would be replaced with an actual map component in production */}
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold">Studio Location</h3>
                <p className="text-gray-400">
                  123 Mountain View Drive, Boulder, CO 80302
                </p>
                <Button className="mt-4">Get Directions</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
