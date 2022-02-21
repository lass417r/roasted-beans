"use strict";

window.addEventListener("DOMContentLoaded", start);

const url = "https://passionproject-5d13.restdb.io/rest/passionproject";
const key = "620e15ef34fd6215658586f3";
const options = {
  headers: {
    "x-apikey": key,
  },
};

let beans;
let filter = "alle";
const png = ".png";

function start() {
  const filterKnapper = document.querySelectorAll(".dropdown-content button");
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerKategori)
  );
  loadJSON();
}

function filtrerKategori() {
  filter = this.dataset.land;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  visBeans();

  const txtKategori = document.querySelector("header .txt_kategori");
  console.log(this);
  txtKategori.textContent = "Filter: " + this.textContent;
}

async function loadJSON() {
  const JSONData = await fetch(url, options);
  beans = await JSONData.json();
  console.log(beans);
  visBeans();
}

//grid view
function visBeans() {
  const container = document.querySelector("section");
  const temp = document.querySelector("template");
  container.textContent = "";

  beans.forEach((bean) => {
    if (filter == bean.land || filter == "alle") {
      let klon = temp.cloneNode(true).content;
      klon.querySelector(".billede").src =
        "medium/produkt/" + bean.billede_id + png;

      klon.querySelector(".navn").textContent = bean.navn;
      klon.querySelector(".smagsnoter").textContent = bean.smagsnoter;
      klon.querySelector(".land").textContent = bean.land;
      klon.querySelector(".pris").textContent = "Pris: " + bean.pris + " kr";
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(bean));
      container.appendChild(klon);
    }
  });
}

document.querySelector("#popup button").addEventListener("click", lukPopup);

function lukPopup() {
  document.querySelector("#popup").style.display = "none";
}
//popup view
function visDetaljer(bean) {
  console.log(bean);
  const popup = document.querySelector("#popup");
  popup.style.display = "block";
  popup.querySelector(".navn").textContent = bean.navn;
  popup.querySelector(".billede").src =
    "medium/produkt/" + bean.billede_id + png;
  popup.querySelector(".kortbeskrivelse").textContent = bean.beskrivelse_kort;
  popup.querySelector(".smagsnoter").textContent = bean.smagsnoter;
  popup.querySelector(".land").textContent = bean.land;
  popup.querySelector(".pris").textContent = bean.pris + " kr.-";
  popup.querySelector(".videre").addEventListener("click", () => {
    location.href = "single_view.html?id=" + bean._id;
  });
}
