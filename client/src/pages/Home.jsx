import Hero from "../components/common/Hero";
import Newsletter from "../components/common/Newsletter";
import PromoSection from "../components/common/PromoSection";
import Services from "../components/common/Services";
import Testimonials from "../components/common/Testimonials";
import BestSellingProducts from "./product/BestSellingProducts";
import NewArrivalProducts from "./product/NewArrivalProducts";
import UpcomingProducts from "./product/UpcomingProducts";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services */}
      <Services />

      {/* Best selling products */}
      <BestSellingProducts />

      {/* Promo section */}
      <PromoSection />

      {/* New arrival products */}
      <NewArrivalProducts />

      {/* UpcomingProducts section */}
      <UpcomingProducts />

      {/* Testimonials section */}
      <Testimonials />

      {/* Newsletter section */}
      <Newsletter />
    </>
  );
};

export default Home;
