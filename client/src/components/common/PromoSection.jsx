import React from "react";
import { Link } from "react-router-dom";
import PromoImg1 from "../../assets/images/chanel.png";
import PromoImg2 from "../../assets/images/family-tree.png";
import PromoImg3 from "../../assets/images/whey.png";
import placeHolder from "/placeholder.png";

const PromoSection = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main Banner (2/3 Width) */}
        <div className="flex flex-col items-center justify-between overflow-hidden bg-[#e0e7ff] p-8 transition-shadow hover:shadow-lg md:flex-row md:px-12 lg:w-2/3">
          <div className="space-y-4 text-center md:w-1/2 md:text-right">
            <h3 className="border-0 border-e-2 pe-4 text-sm font-bold tracking-wider text-indigo-500 uppercase">
              Exclusive Offer
            </h3>
            <h2 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
              Get up to 50% Off
            </h2>
            <p className="text-lg text-slate-600">
              Get the best product in your hand with our premium selection.
            </p>
            <Link
              to="/products"
              className="btn btn-secondary btn-wide rounded-none transition-transform hover:skew-x-5"
            >
              SHOP NOW
            </Link>
          </div>
          <div className="mt-8 flex justify-center md:mt-0 md:w-1/2">
            <img
              src={PromoImg1 || placeHolder}
              alt="Main Promo"
              className="h-96 drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Side Stack (1/3 Width) */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          {/* Top Small Card (Image Left, Text Right) */}
          <div className="flex flex-1 items-center gap-4 bg-slate-100 p-6 transition-shadow hover:shadow-md">
            <div className="w-1/2">
              <img
                src={PromoImg2 || placeHolder}
                alt="Small Promo 1"
                className="object-cover"
              />
            </div>
            <div className="w-1/2 space-y-2 text-center">
              <h4 className="text-lg leading-tight font-bold">New Arrivals</h4>
              <Link
                to="/products"
                className="text-sm font-semibold text-indigo-600 hover:underline"
              >
                View All
              </Link>
            </div>
          </div>

          {/* Bottom Small Card (Text Left, Image Right) */}
          <div className="flex flex-1 items-center gap-4 bg-indigo-50 p-6 transition-shadow hover:shadow-md">
            <div className="w-1/2 space-y-2 text-center">
              <h4 className="text-lg leading-tight font-bold">Flash Sale</h4>
              <Link
                to="/products"
                className="text-sm font-semibold text-indigo-600 hover:underline"
              >
                Grab Now
              </Link>
            </div>
            <div className="w-1/2">
              <img
                src={PromoImg3 || placeHolder}
                alt="Small Promo 2"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="divider mt-8 mb-0"></div>
    </section>
  );
};

export default PromoSection;
