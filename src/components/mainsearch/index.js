import React from "react";
import "./style.css";

function MainSearch() { 
  
    return (
      <div class="main-search">
      <form onSubmit="return false;">
          <input class="form" placeholder="Search Ingredient" id="searchBar"/>
          <button id="searchBtn" type="button"><i class="fas fa-search"></i></button>
      </form>
      <div class="ingredient1"></div>
      <div class="ingredient2"></div>
    </div>
  );
}
  
export default MainSearch;