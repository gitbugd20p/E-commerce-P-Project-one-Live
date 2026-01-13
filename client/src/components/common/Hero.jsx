import { Link } from "react-router-dom";
import HeroImg from "../../assets/images/iphone_hero_img.png";

const Hero = () => {
  return (
    <div className="w-full bg-[#e0e7ff] py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
          {/* Left side: Text-50% */}
          <div className="space-y-6 md:w-1/2">
            <h2 className="text-6xl leading-none font-black uppercase italic md:text-8xl">
              Limitless <br /> Power
            </h2>
            <div className="bg-secondary text-secondary-content inline-block -rotate-2 transform px-6 py-2 text-xl font-bold">
              UP TO 50% OFF
            </div>
            <p className="border-primary border-l-4 pl-4 text-xl opacity-80">
              The Best SmartPhone Collection 2026 is here. <br /> Don't settle
              for less.
            </p>
            <Link
              to="/products"
              className="btn btn-secondary btn-wide rounded-none transition-transform hover:skew-x-5"
            >
              SHOP NOW
            </Link>
          </div>

          {/* Right side: Image-50% width */}
          <div className="flex justify-center md:w-1/2">
            <div className="border-primary/20 rotate-3 rounded-xl border-8 p-4 transition-all duration-500 hover:rotate-0">
              <img
                src={HeroImg}
                className="w-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
