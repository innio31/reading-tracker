import { loadHeaderFooter, getParam, setLocalStorage, getLocalStorage } from "./utils.mjs";
import BookSearch from "./BookSearch.mjs";

loadHeaderFooter();

const bookId = getParam("book");

function bookDetailTemplate(book) {
    const subjects = book.subjects
        .map((s) => `<span class="subject-tag">${s}</span>`)
        .join("");

    return `
    <img class="book-detail__cover" src="${book.cover || "/images/placeholder-cover.svg"}" alt="${book.title}" />
    <h2 class="book-detail__title">${book.title}</h2>
    <p class="book-detail__author">by ${book.author || "Unknown author"}</p>
    <p class="book-detail__year">${book.year || ""}</p>
    <p class="book-detail__description">${book.description}</p>
    <div class="book-detail__subjects">${subjects}</div>
    <button id="add-to-list" data-book-id="${book.id}">Add to Reading List</button>
  `;
}

async function init() {
    if (!bookId) {
        document.querySelector("#book-detail").innerHTML = "<p>No book selected.</p>";
        return;
    }

    const search = new BookSearch();
    const detailEl = document.querySelector("#book-detail");

    try {
        const book = await search.getBookById(bookId);
        detailEl.innerHTML = bookDetailTemplate(book);

        document.querySelector("#add-to-list").addEventListener("click", () => {
            const list = getLocalStorage("reading-list") || [];
            if (list.some((b) => b.id === bookId)) {
                alert("This book is already in your list.");
                return;
            }
            list.push({
                id: bookId,
                title: book.title,
                author: book.author,
                cover: book.cover,
                status: "want",
                addedAt: new Date().toISOString(),
            });
            setLocalStorage("reading-list", list);
            alert("Added to reading list.");
        });
    } catch (err) {
        console.error("Book detail error:", err);
        detailEl.innerHTML = "<p>Could not load this book.</p>";
    }
}

init();