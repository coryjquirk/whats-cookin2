import React from "react";
import "./style.css";
import HeroImg from "./hero.jpg"

function Hero() {  
    return (
    <div id="hero">    
        <img id="heroImg" src={HeroImg} alt="hero img"></img>
        <h1 id="title">What's Cookin'?</h1>
    </div>
    );
  }
  
  export default Hero;