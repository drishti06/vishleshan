import { CategoryShowcase } from "@/features/category-showcase";
import { FeaturedProducts } from "@/features/featured-products";
import { HeroSection } from "@/features/hero-section";
import { Newsletter } from "@/features/newsletter";
import { Testimonials } from "@/features/testimonials";
import { Helmet } from "react-helmet";

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>ShopNow - Modern E-Commerce Store</title>
        <meta
          name="description"
          content="Shop the latest products with fast delivery and excellent customer service."
        />
        <meta property="og:title" content="ShopNow - Modern E-Commerce Store" />
        <meta
          property="og:description"
          content="Shop the latest products with fast delivery and excellent customer service."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shopnow.com" />
        <meta property="og:image" content="https://shopnow.com/og-image.jpg" />
      </Helmet>
      <HeroSection />
      <FeaturedProducts />
      <CategoryShowcase />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Homepage;
