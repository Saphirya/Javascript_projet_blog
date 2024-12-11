import "../assets/styles/styles.scss";
import "./form.scss";

//recuperation du formulaire
const form = document.querySelector("form");
let errors = [];
//On ecoute le submit du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //creation du formData
  const formData = new FormData(form);
  console.log(formData);
  //transformer en objet javascript et en json
  const json = JSON.stringify(Object.fromEntries(formData.entries()));
  console.log(json);
});
