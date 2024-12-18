import "../assets/javascripts/topbar.js";
import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
const btnCancel = document.querySelector(".btn-secondary");
let articleId;
const fillForm = (article) => {
  const author = document.querySelector('input[name="author"]');
  const img = document.querySelector('input[name="image"]');
  const category = document.querySelector('input[name="category"]');
  const title = document.querySelector('input[name="title"]');
  const content = document.querySelector('textarea[name="content"]');

  author.value = article.author || "";
  img.value = article.image || "";
  category.value = article.category || "";
  title.value = article.title || "";
  content.value = article.content || "";
};

const initForm = async () => {
  const params = new URL(location.href);
  articleId = params.searchParams.get("id");

  console.log("ID article :", articleId);

  if (articleId) {
    try {
      const response = await fetch(
        `https://restapi.fr/api/article/${articleId}`
      );
      if (response.ok) {
        let article = await response.json();

        // Si l'API retourne un tableau, prenez le premier élément
        if (Array.isArray(article)) {
          article = article[0];
        }

        fillForm(article);
      } else {
        console.error("Erreur lors de la récupération de l'article.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  }
};
initForm();

let errors = [];

btnCancel.addEventListener("click", (event) => {
  event.preventDefault();
  location.assign("/");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);
      let response;
      if (articleId) {
        response = await fetch(`https://restapi.fr/api/article/${articleId}`, {
          method: "PATCH",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      response = await fetch("https://restapi.fr/api/article", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status < 299) {
      }
      location.assign("/");
    } catch (e) {
      console.error("e : ", erreur);
    }
  }
});

//requete PUT

const formIsValid = (article) => {
  errors = [];

  if (
    !article.author ||
    !article.category ||
    !article.content ||
    !article.title ||
    !article.image
  ) {
    errors.push("Vous devez renseigner tous les champs");
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHTML;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};
