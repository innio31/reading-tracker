import { loadHeaderFooter } from "./utils.mjs";
import BookSearch from "./BookSearch.mjs";

loadHeaderFooter();

const search = new BookSearch();

document.querySelector("#search-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.querySelector("#search-input").value.trim();
  if (!query) return;

  // For now, log results. Next we'll build the results page.
  try {
    const results = await search.search(query);
    console.log("Results:", results);
  } catch (err) {
    console.error("Search error:", err);
  }
});