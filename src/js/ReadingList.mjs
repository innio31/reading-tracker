import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ReadingList {
    constructor() {
        this.list = getLocalStorage("reading-list") || [];
    }

    getAll() {
        return this.list;
    }

    filterByStatus(status) {
        if (status === "all") return this.list;
        return this.list.filter((book) => book.status === status);
    }

    add(book) {
        if (this.list.some((b) => b.id === book.id)) return false;
        this.list.push({ ...book, status: "want", addedAt: new Date().toISOString() });
        this.save();
        return true;
    }

    remove(id) {
        this.list = this.list.filter((b) => b.id !== id);
        this.save();
    }

    updateStatus(id, status) {
        const book = this.list.find((b) => b.id === id);
        if (book) {
            book.status = status;
            this.save();
        }
    }

    save() {
        setLocalStorage("reading-list", this.list);
    }
}