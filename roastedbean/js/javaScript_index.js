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
  // Gør Land filter dropdown clickbar og henviser til filtrerLand
  const filterKnapperLand = document.querySelectorAll("#filter1 button");
  filterKnapperLand.forEach((knap) =>
    knap.addEventListener("click", filtrerLand)
  );
  // Gør smagsnoter filter dropdown clickbar og henviser til filtrerSmag
  const filterKnapperSmag = document.querySelectorAll("#filter2 button");
  filterKnapperSmag.forEach((knap) =>
    knap.addEventListener("click", filtrerSmag)
  );
  //Loader vores json array
  loadJSON();
}

function filtrerLand() {
  //ændrer filter variablen, til det valgte filter
  filterLand = this.dataset.land;
  // fjerner samt tilføjer .valgt til det valgte element i dropdown
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  // Starter visBeans() functionen.
  visBeans();
  // Skriver det valgte filter i knappen.
  const txtKategori = document.querySelector("header .txt_kategori");
  console.log(this);
  txtKategori.textContent = this.textContent;
}

function filtrerSmag() {
  //ændrer filter variablen, til det valgte filter
  filterSmag = this.dataset.smagsnoter;
  // fjerner samt tilføjer .valgt til det valgte element i dropdown
  document.querySelector(".valgt2").classList.remove("valgt2");
  this.classList.add("valgt2");
  // Starter visBeans() functionen.
  visBeans();
  // Skriver det valgte filter i knappen.
  const txtKategori2 = document.querySelector("header .txt_kategori2");
  console.log(this);
  txtKategori2.textContent = this.textContent;
}

// Loader vores aray på siden og starter functionen visBeans()
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
      // Dette er vores forskellige filtrerings muligheder, idet vi har 2 filtre.
      (filterLand == bean.land && filterSmag == bean.smagsnoter) ||
      (filterLand == bean.land && filterSmag == "alle") ||
      (filterLand == "alle" && filterSmag == bean.smagsnoter) ||
      (filterLand == "alle" && filterSmag == "alle")
    ) {
      // Her bliver de forskellige bønner vist i grid.
      let klon = temp.cloneNode(true).content;
      klon.querySelector(".billede").src =
        "medium/produkt/" + bean.billede_id + png;
      klon.querySelector(".navn").textContent = bean.navn;
      klon.querySelector(".smagsnoter").textContent = bean.smagsnoter;
      klon.querySelector(".land").textContent = bean.land;
      klon.querySelector(".pris").textContent = "Price: " + bean.pris + " kr";
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(bean));
      container.appendChild(klon);
    }
  });
}
// Lytter efter click på popup knappen, for at lukke den igen.
document.querySelector("#popup button").addEventListener("click", lukPopup);

// Fjerner popup vinduet
function lukPopup() {
  document.querySelector("#popup").style.display = "none";
}

//popup view
function visDetaljer(bean) {
  console.log(bean);
  const popup = document.querySelector("#popup");
  // Gør det muligt at se popup
  popup.style.display = "block";
  // Information til popupvinduet
  popup.querySelector(".navn").textContent = bean.navn;
  popup.querySelector(".billede").src =
    "medium/produkt/" + bean.billede_id + png;
  popup.querySelector(".kortbeskrivelse").textContent = bean.beskrivelse_kort;
  popup.querySelector(".smagsnoter").textContent = bean.smagsnoter;
  popup.querySelector(".land").textContent = bean.land;
  popup.querySelector(".pris").textContent = bean.pris + " kr";
  // Gør så at når man trykker mere info, sender den en til single
  // view siden med ID fra arrayet.
  popup.querySelector(".videre").addEventListener("click", () => {
    location.href = "single_view.html?id=" + bean._id;
  });
}
