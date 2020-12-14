import React, { useState, useEffect } from "react";
import "./style.css";
import $ from "jquery";

function MainSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  var btncount = 0;
  function handleSearchTerm(event) {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  }
  function innerDivs(recipeTitle, sourceLink) {
    $("<a>")
      .html("<id class='fab fas fa-carrot'></id>")
      .attr({
        href: sourceLink,
        target: "_blank",
      })
      .appendTo("#" + recipeTitle.replace(/\s+/g, "") + "recipeLinks");
    if ($("#h5" + recipeTitle.replace(/\s+/g, "")).length) {
      return;
    }
    $("<h5>")
      .text(recipeTitle)
      .attr("id", "h5" + recipeTitle.replace(/\s+/g, ""))
      .appendTo("#" + recipeTitle.replace(/\s+/g, "") + "recipeTitle");
  }
  function innerImg(recipeTitle, recipeThumb) {
    if ($("#img" + recipeTitle.replace(/\s+/g, "")).length) {
      return;
    }
    $("<img>")
      .attr({
        src: recipeThumb,
        class: "thumbnailImg",
        id: "img" + recipeTitle.replace(/\s+/g, ""),
      })
      .appendTo("#" + recipeTitle.replace(/\s+/g, "") + "thumbnail");
  }
  function publishInfo(recipeTitle, recipeThumb, sourceLink) {
    $("<div>")
      .attr({
        class: "recipeTitle",
        id: recipeTitle.replace(/\s+/g, "") + "recipeTitle",
      })
      .appendTo(".results");
    $("<div>")
      .attr({
        class: "thumbnail",
        id: recipeTitle.replace(/\s+/g, "") + "thumbnail",
      })
      .appendTo(".results");
    $("<div>")
      .attr({
        class: "recipeLinks",
        id: recipeTitle.replace(/\s+/g, "") + "recipeLinks",
      })
      .appendTo(".results");
    innerDivs(recipeTitle, sourceLink);
    innerImg(recipeTitle, recipeThumb);
  }
  $(document).on("click", ".abtn", function (event) {
    --btncount;
    $(this).remove();
    if ($(".abtn").length) {
      searchIngred($(".abtn").text());
    }
  });
  function searchIngred(foodItem) {
    $(".results").empty();
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=%22'" + foodItem + "'%22&app_id=3fde57c1&app_key=98ad8b6a80e961abf27f43122cbe422d"
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)

            for (let index = 0; index < response.hits.length; index++) {
                var recipeTitle = response.hits[index].recipe.label;
                var recipeThumb = response.hits[index].recipe.image;
                var sourceLink = response.hits[index].recipe.url;
                console.log("DA TITLE " + recipeTitle)
                console.log("DA THUMBNAIL LINK " + recipeThumb)
                console.log("DIS BE DA SOURCE LINk " + sourceLink)
                publishInfo(recipeTitle, recipeThumb, sourceLink)
            }
    });
  }
  function btnSearch() {
    if (btncount > 1) {
      return;
    }
    ++btncount;
    console.log(btncount);
    var ingredient = searchTerm;
    var newBtn = $("<button>");
    if ($("#ingredient1").length) {
      newBtn.attr("id", "ingredient2");
      newBtn.attr("class", "abtn");
      newBtn.text(ingredient);
      $(".ingredient2").append(newBtn);
      var twoIngreds = $("#ingredient1").text() + "," + ingredient;
      searchIngred(twoIngreds);
      return;
    }
    newBtn.attr("id", "ingredient1");
    newBtn.attr("class", "abtn");
    newBtn.text(ingredient);
    $(".ingredient1").append(newBtn);
    searchIngred(ingredient);
  }
  return (
    <div class="main-search">
      <form onSubmit="return false;">
        <input onChange={handleSearchTerm} class="form" placeholder="Search Ingredient" id="searchBar" type="text"/>
        <button id="searchBtn" type="button" onClick={btnSearch}>
          <i class="fas fa-search"></i>
        </button>
      </form>
      <div class="ingredient1"></div>
      <div class="ingredient2"></div>
    </div>
  );
}

export default MainSearch;
