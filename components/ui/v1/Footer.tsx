import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const footerData = {
    logo: {
      src: "/assets/svgs/logo-orange.svg",
      alt: "Company Logo",
      width: 168,
      height: 48,
    },
    navigation: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "Referral", href: "/referral" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Licenses", href: "/licenses" },
    ],
    social: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
        icon: "/assets/svgs/facebook10.svg",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/",
        icon: "/assets/svgs/linkedin10.svg",
      },
    ],
    copyright: {
      year: 2026,
      company: "Your Company Name",
    },
  };

  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Bottom Section: Multi-Column Layout */}
        <div className="grid md:grid-cols-4 gap-8 pt-8">
          {/* Column 1: Tagline & Credits */}
          <div className="md:col-span-2">
            <p className="text-lg font-semibold mb-4">
              Your website, your way
            </p>
            <p className="text-sm text-base-content/60 mb-2">
              &copy; {footerData.copyright.year} - All rights reserved
            </p>
            <p className="text-sm text-base-content/60 mb-1">
              Built with{" "}
              <Link href="/" className="link link-hover font-semibold">
                Boilerplate
              </Link>
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-xs font-bold text-base-content/60 uppercase tracking-wider mb-4">
              LINKS
            </h3>
            <ul className="space-y-2">
              {footerData.navigation.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-base-content/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-xs font-bold text-base-content/60 uppercase tracking-wider mb-4">
              LEGAL
            </h3>
            <ul className="space-y-2">
              {footerData.legal.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-sm text-base-content/70 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center md:justify-end gap-4 mt-8">
          {footerData.social.map((social, index) => (
            <a
              key={index}
              href={social.url}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-base-300 hover:bg-primary hover:text-primary-content transition-colors"
            >
              <Image
                src={social.icon}
                alt={`${social.name} icon`}
                width={20}
                height={20}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
