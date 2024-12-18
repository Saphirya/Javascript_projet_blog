import "./assets/javascripts/topbar.js";
import "./assets/styles/styles.scss";
import "./index.scss";

const articleContainerElement = document.querySelector(".articles-container");
const createArticles = (articles) => {
  const articlesDom = articles.map((article) => {
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
        </div>
    `;
    return articleDom;
  });
  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...articlesDom);
  const deleteButtons = articleContainerElement.querySelectorAll(".btn-danger");
  console.log(deleteButtons);

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
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
    });
  });
};

//requete GET
const fetchArticles = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/article");
    let articles = await response.json();
    console.log("Données reçues :", articles);

    // Transformez en tableau si un seul article est retourné
    if (!Array.isArray(articles)) {
      articles = [articles];
    }

    createArticles(articles);
  } catch (e) {
    console.error("Erreur dans fetchArticles :", e);
  }
};

fetchArticles();
