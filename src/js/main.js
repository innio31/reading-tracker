import { loadHeaderFooter } from "./utils.mjs";
import BookSearch from "./BookSearch.mjs";

loadHeaderFooter();

const search = new BookSearch();

document.querySelector("#search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.querySelector("#search-input").value.trim();
  if (!query) return;
  window.location.href = `/search/index.html?q=${encodeURIComponent(query)}`;
});