export default function Book(name, author, pages, read,insertTime=Date.now(),removeFunction=function(){}) {
    this.name = name;
    this.author = author;
    this.pages = pages
    this.read = read;
    this.id = name.toLowerCase().split(" ").join("") + author.toLowerCase().split(" ").join("")
    this.insertTime = insertTime
    this.removeFunction = removeFunction
}
Book.prototype.toggleRead = function () {
    this.read = !this.read
}

Book.prototype.createElement = function (library) {
    // <article class="book">
    // 					<h3 class="book__title">Lorem, ipsum.</h3>
    // 					<p class="book__author">Lorem, ipsum.</p>
    // 					<p class="book__pages">123.</p>
    // 						<div class="book__read"><input type="checkbox" id="Loremipsum"><label
    // 								for="Loremipsum"></label></div>
    // 					<button type="button" class="book__button button button--danger">Remove</button>
    // 				</article>

    let element = document.createElement('article')
    element.classList.add("book")

    let [name, author, pages,read, remove] = [document.createElement("h3"),
                                         document.createElement("p"), 
                                         document.createElement("p"), 
                                         document.createElement("div"),
                                         document.createElement("button")]

    name.classList.add("book__title")
    name.textContent = this.name
    
    author.classList.add("book__author")
    author.textContent = this.author

    pages.classList.add("book__pages")
    pages.textContent = this.pages

    read.classList.add("book__read")
    let input = document.createElement("input")
    input.setAttribute("type","checkbox")
    input.setAttribute("id",this.id)
    input.checked = this.read
    input.addEventListener("change",()=>{
        this.read = input.checked
    })



    let label = document.createElement("label")
    label.setAttribute('for',this.id)
    read.appendChild(input)
    read.appendChild(label)

    remove.classList.add("book__button","button","button--danger")
    remove.setAttribute("type","button")
    remove.textContent = "Remove"
    remove.addEventListener("click",()=>{

        library.books = library.books.filter(book=> book.id!==this.id)
        library.ReorganizeShelf()
        // console.log(library.books,this) 
    })


    element.appendChild(name)
    element.appendChild(author)
    element.appendChild(pages)
    element.appendChild(read)
    element.appendChild(remove)

    return element
}