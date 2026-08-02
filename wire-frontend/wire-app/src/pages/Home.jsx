import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Services from "../components/Services";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <ContactForm />
      <Footer />
    </>
  );
}

export default Home;