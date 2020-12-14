import React from "react";
import Hero from "../components/hero";
import MainSearch from "../components/mainsearch";
import Header from "../components/header";
import Footer from "../components/footer";
import Results from "../components/results";


const Home = () => {
  return (
    <div class="container">
      <Hero/>
      <Header/>
      <MainSearch/>
      <Results/>
      <Footer/>
    </div>
  );
};

export default Home;
