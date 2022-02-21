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
let filterLand = "alle";
let filterSmag = "alle";
const png = ".png";

//Start function loades når indholdet i DOM'en er loadet.
function start() {
  const filterKnapperLand = document.querySelectorAll("#filter1 button");
  filterKnapperLand.forEach((knap) =>
    knap.addEventListener("click", filtrerLand)
  );
  const filterKnapperSmag = document.querySelectorAll("#filter2 button");
  filterKnapperSmag.forEach((knap) =>
    knap.addEventListener("click", filtrerSmag)
  );
  loadJSON();
}

function filtrerLand() {
  filterLand = this.dataset.land;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  visBeans();

  const txtKategori = document.querySelector("header .txt_kategori");
  console.log(this);
  txtKategori.textContent = this.textContent;
}

function filtrerSmag() {
  filterSmag = this.dataset.smagsnoter;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  visBeans();

  const txtKategori = document.querySelector("header .txt_kategori2");
  console.log(this);
  txtKategori.textContent = this.textContent;
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
    if (
      (filterLand == bean.land && filterSmag == bean.smagsnoter) ||
      (filterLand == bean.land && filterSmag == "alle") ||
      (filterLand == "alle" && filterSmag == bean.smagsnoter) ||
      (filterLand == "alle" && filterSmag == "alle")
    ) {
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
