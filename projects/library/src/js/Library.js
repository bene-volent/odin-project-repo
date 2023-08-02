import Book from "./Book.js";

const booksContainer = document.querySelector(".main__books--wrapper");

export const SORT_METHOD = {
    insertion: 1,
    alphabetic: 2
}
export const SORT_DIR = {
    ascending: 1,
    descending: 2
}

function clearInner(node) {
    while (node.hasChildNodes()) {
        clear(node.firstChild);
    }
}

function clear(node) {
    while (node.hasChildNodes()) {
        clear(node.firstChild);
    }
    node.parentNode.removeChild(node);
}


function removeBooksFromDOM() {
    clearInner(booksContainer)
}

export default function Library(sort = SORT_METHOD.alphabetic, direction = SORT_DIR.ascending) {
    this.sortMethod = sort
    this.direction = direction
    this.currentID = 1
    this.books = []
}

Library.prototype.AddNewBook = function (name, author, pages, read) {
    let book = new Book(name, author, pages, read, this.currentID++, this.RemoveBook)
    if (this.books.every(libBook => { return !(book.id === libBook.id) })) {
        this.books.unshift(book);
        return true
    }
    else {
        return false
    }
}

Library.prototype.ClearShelf = function () {
    removeBooksFromDOM()
}

Library.prototype.ReorganizeShelf = function () {
    // Remove Books from Shelves
    this.ClearShelf()

    // Sort The Books in desired Order
    this.SortBooks()

    // Put The Books back on the Shelves
    this.AddBooksToShelf()

    this.SaveData()
}

Library.prototype.AddBooksToShelf = function () {
    for (let book of this.books) {
        booksContainer.appendChild(book.createElement(this))
    }
}

Library.prototype.SortBooks = function () {


    switch (this.sortMethod) {
        case SORT_METHOD.alphabetic:

            this.books.sort((bookNext, bookPrev) => {
                if (bookPrev.name <= bookNext.name) return 1
                else
                    return -1;
            })
            break;


        case SORT_METHOD.insertion:
            this.books.sort((bookNext, bookPrev) => bookNext.insertTime - bookPrev.insertTime)
    }


    if (this.direction === SORT_DIR.descending) {
        this.books.reverse()
    }
}

Library.prototype.ChangeSortMethod = function (sort) {
    this.sortMethod = sort
}

Library.prototype.ChangeSortDirection = function (direction) {
    this.direction = direction
}

Library.prototype.SaveData = function () {
    let booksJSON = JSON.stringify(this.books)
    localStorage.setItem("OdinLibraryData", booksJSON)
}


Library.prototype.RestoreData = function () {
    let data = JSON.parse(localStorage.getItem("OdinLibraryData"))
    let insertTime = 0
    for (let book of data) {
        this.books.push(new Book(book.name, book.author, book.pages, book.read, book.insertTime, this.RemoveBook))
        insertTime = Math.max(book.insertTime, insertTime)
    }
    this.currentID = insertTime+1

    this.ReorganizeShelf()
}
