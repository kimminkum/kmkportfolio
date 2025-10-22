import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "All Products", href: "/products", enabled: true },
      { name: "New Arrivals", href: "/new", enabled: false },
      { name: "Best Sellers", href: "/bestsellers", enabled: false },
      { name: "Deals", href: "/deals", enabled: false },
      { name: "Gift Cards", href: "/gift-cards", enabled: false },
    ],
    support: [
      { name: "Help Center", href: "/help", enabled: false },
      { name: "Contact Us", href: "/contact", enabled: false },
      { name: "Track Order", href: "/track-order", enabled: false },
      { name: "Returns", href: "/returns", enabled: false },
      { name: "Size Guide", href: "/size-guide", enabled: false },
    ],
    company: [
      { name: "About Us", href: "/about", enabled: false },
      { name: "Careers", href: "/careers", enabled: false },
      { name: "Press", href: "/press", enabled: false },
      { name: "Blog", href: "/blog", enabled: false },
      { name: "Investors", href: "/investors", enabled: false },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy", enabled: false },
      { name: "Terms of Service", href: "/terms", enabled: false },
      { name: "Cookie Policy", href: "/cookies", enabled: false },
      { name: "Accessibility", href: "/accessibility", enabled: false },
      { name: "Sitemap", href: "/sitemap", enabled: false },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">ShopStore</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Your trusted online shopping destination. We offer quality
              products with fast delivery and excellent customer service.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@shopstore.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
                <span>1-800-SHOPSTORE</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>123 Commerce St, City, State 12345</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map(link => (
                <li key={link.name}>
                  {link.enabled ? (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <span className="text-gray-600 text-sm cursor-not-allowed">
                      {link.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map(link => (
                <li key={link.name}>
                  {link.enabled ? (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <span className="text-gray-600 text-sm cursor-not-allowed">
                      {link.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map(link => (
                <li key={link.name}>
                  {link.enabled ? (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <span className="text-gray-600 text-sm cursor-not-allowed">
                      {link.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map(link => (
                <li key={link.name}>
                  {link.enabled ? (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <span className="text-gray-600 text-sm cursor-not-allowed">
                      {link.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md">
            <h3 className="font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest deals and updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} ShopStore. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              <div className="flex items-center gap-3">
                <Link
                  href="https://facebook.com"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="https://instagram.com"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="https://youtube.com"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">We accept:</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">
                  VISA
                </div>
                <div className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">
                  MC
                </div>
                <div className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">
                  AMEX
                </div>
                <div className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">
                  PP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
