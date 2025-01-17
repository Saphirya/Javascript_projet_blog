import "./assets/javascripts/modal.js";
import { openModal } from "./assets/javascripts/modal.js";
import "./assets/javascripts/topbar.js";
import "./assets/styles/styles.scss";
import "./index.scss";

const articleContainerElement = document.querySelector(".articles-container");
const categoriesContainerElement = document.querySelector(".categories");
const selectElement = document.querySelector("select");
let filter;
let articles;
let sortBy = "desc";

selectElement.addEventListener("change", (event) => {
  sortBy = selectElement.value;
  fetchArticles();
  console.log(sortBy);
});

const createArticles = () => {
  const articlesDom = articles
    .filter((article) => {
      if (filter) {
        return article.category === filter;
      } else {
        return true;
      }
    })
    .map((article) => {
      const articleDom = document.createElement("div");
      articleDom.classList.add("article");
      articleDom.innerHTML = `
      <img src="${article.image}" alt="profil" />
      <h2>${article.title}</h2>
      <p class="article-author">Auteur : ${article.author} - ${new Date(
        article.createdAt
      ).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}</p>
      <p class="article-content">${article.content}</p>
      <div class="article-actions">
        <button class="btn btn-danger" data-id="${
          article._id
        }">Supprimer</button>
        <button class="btn btn-primary" data-id="${
          article._id
        }">Modifier</button>
        </div>
    `;
      return articleDom;
    });
  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...articlesDom);
  const deleteButtons = articleContainerElement.querySelectorAll(".btn-danger");
  const editButtons = articleContainerElement.querySelectorAll(".btn-primary");
  editButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      try {
        const target = event.target;
        const articleId = target.dataset.id;
        const response = await fetch(
          `https://restapi.fr/api/article/${articleId}`
        );
        const article = await response.json();
        console.log(article);
        location.assign(`/form/form.html?id=${articleId}`);
      } catch (e) {
        console.error(e);
      }
    });
  });

  console.log(deleteButtons);

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const result = await openModal(
        "Etes vous sur de vouloir supprimer cet article ?"
      );
      if (result === true) {
        try {
          const target = event.target;
          const articleId = target.dataset.id;
          const response = await fetch(
            `https://restapi.fr/api/article/${articleId}`,
            {
              method: "DELETE",
            }
          );
          const body = await response.json();
          fetchArticles();
          console.log(body);
        } catch (e) {
          console.error(e);
        }
      }
    });
  });
};

const displayMenuCategories = (categoriesArr) => {
  const liElements = categoriesArr.map((categoryElem) => {
    const li = document.createElement("li");
    li.innerHTML = `${categoryElem[0]} <strong>(${categoryElem[1]})</strong>`;
    if (categoryElem[0] === filter) {
      li.classList.add("active");
    }
    li.addEventListener("click", () => {
      if (filter === categoryElem[0]) {
        filter = null;
        liElements.forEach((li) => {
          li.classList.remove("active");
        });
        createArticles();
      } else {
        filter = categoryElem[0];
        liElements.forEach((li) => {
          li.classList.remove("active");
        });
        li.classList.add("active");
        createArticles();
      }
    });
    return li;
  });
  categoriesContainerElement.innerHTML = "";
  categoriesContainerElement.append(...liElements);
  console.log(liElements);
};

//utilisaton de reduce pour créer le menu catégories
const createMenuCategories = () => {
  const categories = articles.reduce((acc, article) => {
    if (acc[article.category]) {
      acc[article.category]++;
      return acc;
    } else {
      acc[article.category] = 1;
      return acc;
    }
  }, {});

  const categoriesArr = Object.keys(categories)
    .map((category) => {
      return [category, categories[category]];
    })
    .sort((c1, c2) => c1[0].localeCompare(c2[0]));
  displayMenuCategories(categoriesArr);
  console.log(categoriesArr);
};

//requete GET
const fetchArticles = async () => {
  try {
    const response = await fetch(
      `https://restapi.fr/api/article?sort=createdAt:${sortBy}`
    );
    articles = await response.json();
    console.log("Données reçues :", articles);
    // Transformez en tableau si un seul article est retourné
    if (!Array.isArray(articles)) {
      articles = [articles];
    }
    createArticles();
    createMenuCategories();
  } catch (e) {
    console.error("Erreur dans fetchArticles :", e);
  }
};

fetchArticles();
