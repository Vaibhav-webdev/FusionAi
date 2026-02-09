import Navbar from "./components/navbar.js";
import HeroSection from "./components/heroSection";
import AIToolsSection from "./components/AIToolsSection"
import Footer from "./components/footer";
import Testimonials from "./components/Testimonial.js";
import Faq from "./components/Faq.js";
import Cta from "./components/CallToAction.js";
import Pricing from "./components/Pricing.js";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AIToolsSection />
      <Pricing />
      <Cta />
      <Testimonials />
      <Faq />
      <Footer />
    </>
  );
}
