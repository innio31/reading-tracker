import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";

loadHeaderFooter();

function renderStats() {
  const list = getLocalStorage("reading-list") || [];
  const stats = {
    want: list.filter((b) => b.status === "want").length,
    reading: list.filter((b) => b.status === "reading").length,
    finished: list.filter((b) => b.status === "finished").length,
  };

  const el = document.querySelector("#stats");
  if (!el) return;

  if (list.length === 0) {
    el.innerHTML = `<p class="stats__empty">Your reading list is empty. Search for a book to get started!</p>`;
    return;
  }

  el.innerHTML = `
    <div class="stats__row">
      <div class="stats__card">
        <span class="stats__number">${stats.want}</span>
        <span class="stats__label">Want to Read</span>
      </div>
      <div class="stats__card">
        <span class="stats__number">${stats.reading}</span>
        <span class="stats__label">Currently Reading</span>
      </div>
      <div class="stats__card">
        <span class="stats__number">${stats.finished}</span>
        <span class="stats__label">Finished</span>
      </div>
    </div>
  `;
}

renderStats();

document.querySelector("#search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.querySelector("#search-input").value.trim();
  if (!query) return;
  window.location.href = `/search/index.html?q=${encodeURIComponent(query)}`;
});