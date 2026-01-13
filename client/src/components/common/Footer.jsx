import { Twitter, Youtube, Facebook, Copyright } from "lucide-react";
import logoF from "../../assets/images/Logo_1_PU.png";

const Footer = () => {
  return (
    <div className="bg-neutral text-neutral-content">
      <footer className="footer sm:footer-horizontal container mx-auto flex flex-col items-center justify-between p-6 md:flex-row">
        <aside className="flex items-center gap-4">
          {/* Logo Icon - Using ShoppingBag as a placeholder for an E-com brand */}
          <div className="bg-indigo-600 p-2 text-white">
            <img src={logoF} className="h-6 w-6" alt="footer-logo" />
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm opacity-80">
              <Copyright size={14} /> {new Date().getFullYear()} —
              <span className="font-medium">Md. Sabur</span>. All rights
              reserved.
            </p>
          </div>
        </aside>

        {/* Social Icons Section */}
        <nav className="mt-4 flex gap-6 md:mt-0">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-indigo-400"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-indigo-400"
          >
            <Youtube size={20} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-indigo-400"
          >
            <Facebook size={20} />
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
