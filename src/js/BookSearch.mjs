const OPEN_LIBRARY_URL = "https://openlibrary.org";

function normalizeBook(doc) {
  return {
    id: doc.key?.replace("/works/", "") || doc.key,
    title: doc.title || "Untitled",
    author: doc.author_name?.[0] || "Unknown author",
    year: doc.first_publish_year || "—",
    cover: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : "/images/placeholder-cover.svg",
  };
}

export default class BookSearch {
  async search(query) {
    const url = `${OPEN_LIBRARY_URL}/search.json?q=${encodeURIComponent(query)}&limit=12`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return data.docs.map(normalizeBook);
  }
}