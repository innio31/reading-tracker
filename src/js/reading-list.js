import { loadHeaderFooter } from "./utils.mjs";
import ReadingList from "./ReadingList.mjs";

loadHeaderFooter();

const readingList = new ReadingList();
const listElement = document.querySelector("#book-list");
const filterSelect = document.querySelector("#status-filter");

function bookCardTemplate(book) {
    const statusLabels = {
        want: "Want to Read",
        reading: "Currently Reading",
        finished: "Finished",
    };

    return `<li class="book-card" data-book-id="${book.id}">
    <a href="/book/index.html?book=${book.id}">
      <img src="${book.cover || "/images/placeholder-cover.svg"}" alt="${book.title}" />
      <h3 class="book-card__title">${book.title}</h3>
      <p class="book-card__author">${book.author || "Unknown author"}</p>
    </a>
    <label class="book-card__status-label">
      Status:
      <select class="book-card__status" data-book-id="${book.id}">
        <option value="want" ${book.status === "want" ? "selected" : ""}>Want to Read</option>
        <option value="reading" ${book.status === "reading" ? "selected" : ""}>Currently Reading</option>
        <option value="finished" ${book.status === "finished" ? "selected" : ""}>Finished</option>
      </select>
    </label>
    <button class="book-card__remove" data-book-id="${book.id}">Remove</button>
  </li>`;
}

function render() {
    const status = filterSelect.value;
    const books = readingList.filterByStatus(status);

    if (books.length === 0) {
        listElement.innerHTML = "<li>No books here yet.</li>";
        return;
    }

    listElement.innerHTML = books.map(bookCardTemplate).join("");

    // Wire status change handlers
    listElement.querySelectorAll(".book-card__status").forEach((select) => {
        select.addEventListener("change", (e) => {
            readingList.updateStatus(e.target.dataset.bookId, e.target.value);
        });
    });

    // Wire remove handlers
    listElement.querySelectorAll(".book-card__remove").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.bookId;
            if (confirm("Remove this book from your list?")) {
                readingList.remove(id);
                render();
            }
        });
    });
}

filterSelect.addEventListener("change", render);
render();