import { loadHeaderFooter, getParam } from "./utils.mjs";
import BookSearch from "./BookSearch.mjs";

loadHeaderFooter();

const query = getParam("q") || "";

function bookCardTemplate(book) {
  return `<li class="book-card">
    <a href="/book/index.html?book=${book.id}">
      <img src="${book.cover}" alt="${book.title}" />
      <h3 class="book-card__title">${book.title}</h3>
      <p class="book-card__author">${book.author}</p>
      <p class="book-card__year">${book.year}</p>
    </a>
  </li>`;
}

async function init() {
  const heading = document.querySelector("#results-heading");
  const list = document.querySelector("#book-list");

  if (!query) {
    heading.textContent = "Enter a search term on the home page.";
    return;
  }

  heading.textContent = `Results for "${query}"`;

  const search = new BookSearch();
  try {
    const results = await search.search(query);
    if (results.length === 0) {
      list.innerHTML = "<li>No results found.</li>";
      return;
    }
    list.innerHTML = results.map(bookCardTemplate).join("");
  } catch (err) {
    console.error("Search error:", err);
    list.innerHTML = "<li>Something went wrong. Please try again.</li>";
  }
}

init();