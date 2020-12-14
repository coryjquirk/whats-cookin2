import React, { useState, useEffect } from "react";
import "./style.css";
import $ from "jquery";

function Footer() {
  
  function getCoordinates() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function success(pos) {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lng = crd.longitude.toString();
      var coordinates = [lat, lng];
      getCity(coordinates);
      return;
    }
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
  function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];
    xhr.open(
      "GET",
      "https://us1.locationiq.com/v1/reverse.php?key=pk.e87a2cda53fae1cd1bea780cbaa3ca5c&lat=" +
        lat +
        "&lon=" +
        lng +
        "&format=json",
      true
    );
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);
    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        // console.log(response.lat)
        // console.log(response.lon)
        getGrocery(response.lat, response.lon);
        return;
      }
    }
  }
  
  function findGrocery () {
    getCoordinates();
  }
  
  function getGrocery(latitude, longitude) {
    window.open(
      "https://www.google.com/maps/search/grocery+stores/@" +
        latitude +
        "," +
        longitude +
        ",12z/data=!4m4!2m3!5m1!2e1!6e6",
      "_blank"
    );
  }
    return (
      <footer>
            NEED GROCERIES? <button onClick={findGrocery}>CLICK HERE!</button>
      </footer>
    );
  }
  
  export default Footer;