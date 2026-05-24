import Quote from "../components/QuoteSection";
import Hero from "../components/Hero";
import Cards from "../components/Cards";

/**
 * Renders the public home page with search prompt, feature cards, and quote.
 */
const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      {/* Cards Section , 3 cards*/}
      <Cards />
      {/* Quote section */}
      <Quote />
    </>
  );
};

export default Home;
