"use strict";

const url = "https://passionproject-5d13.restdb.io/rest/passionproject/";
const key = "620e15ef34fd6215658586f3";
const options = {
  headers: {
    "x-apikey": key,
  },
};

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let bean;

document.addEventListener("DOMContentLoaded", loadJSON);

async function loadJSON() {
  const JSONData = await fetch(url + id, options);
  bean = await JSONData.json();
  console.log(bean);
  visBeans(bean);
}

function visBeans(bean) {
  const png = ".png";
  document.querySelector(".navn").textContent = bean.navn;
  document.querySelector(".billede").src =
    "medium/produkt/" + bean.billede_id + png;
  document.querySelector(".langbeskrivelse").textContent =
    bean.beskrivelse_lang;
  document.querySelector(".smagsnoter").textContent = bean.smagsnoter;
  document.querySelector(".land").textContent = bean.land;
  document.querySelector(".proccess").textContent = bean.proccess;
  document.querySelector(".velegnet").textContent = bean.velegnet_til;
  document.querySelector(".pris").textContent = bean.pris + " kr.-";
  document.querySelector("button").addEventListener("click", () => {
    window.history.back();
  });
}
