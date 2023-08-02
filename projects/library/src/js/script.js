import Library, { SORT_DIR, SORT_METHOD } from "./Library.js"

let library = new Library()



const body = document.body
const themeButton = document.querySelector(".header__theme")
const addNewButton = document.querySelector('.main__addnew')
const addNewFormContainer = document.querySelector(".newBook")
const addNewForm = document.querySelector(".newBook__form")
const addNewError = document.querySelector(".newBook__submitError")
const newFormClose = document.querySelector(".newBook__close")

const sortByBtn = document.querySelector(".button__sort--method")
const sortDirBtn = document.querySelector(".button__sort--direction")


const clearStorageBtn = document.querySelector('.main__clear')
const clearStorageBtnY = document.querySelector('.main__clear-yes')
const clearStorageBtnN = document.querySelector('.main__clear-no')
const clearWarning = document.querySelector(".main__warning")

// const 

function openNewBookForm() {
    addNewFormContainer.classList.remove("hidden")
    setTimeout(() => {
        addNewFormContainer.dataset.active = true
    })
}
function closeNewBookForm() {
    addNewFormContainer.dataset.active = false
    setTimeout(() => {
        addNewFormContainer.classList.add("hidden")
    }, 350)
}

const isFormOpen = () => addNewFormContainer.dataset.active === "true" ? true : false;



themeButton.addEventListener("click", () => {
    const currentlyDark = body.dataset.theme === 'dark' ? true : false;

    let buttonIcon = themeButton.querySelector("span");

    if (currentlyDark) {
        themeButton.animate([
            { transform: "translateY(0) rotateX(0) rotateY(0)" }, { transform: "translateY(10px) rotateX(90deg) rotateY(90deg)" }, { transform: "translateY(0) rotateX(0) rotateY(0)" },
        ], { duration: 250 })
    }
    else {
        themeButton.animate([
            { transform: "translateY(0) rotateX(0) rotateY(0)" }, { transform: "translateY(10px) rotateX(90deg) rotateY(-90deg)" }, { transform: "translateY(0) rotateX(0) rotateY(0)" },
        ], { duration: 250 })
    }

    setTimeout(() => {
        if (currentlyDark) {
            buttonIcon.textContent = buttonIcon.dataset.light
            body.dataset.theme = "light"
        }
        else {
            buttonIcon.textContent = buttonIcon.dataset.dark
            body.dataset.theme = "dark"
        }
    }, 125)
})


clearStorageBtn.addEventListener("click",()=>{
    clearWarning.showModal()
})
clearStorageBtnN.addEventListener('click',()=>{
    clearWarning.close()
})
clearStorageBtnY.addEventListener('click',()=>{
    localStorage.setItem("OdinLibraryData","[]")
    library.books.splice(0,library.books.length)
    library.ReorganizeShelf()

    clearWarning.close()
})
addNewButton.addEventListener("click", () => {

    if (!isFormOpen()) openNewBookForm()
    else closeNewBookForm()

})

newFormClose.addEventListener("click",()=>{
    closeNewBookForm()
})

addNewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (library.books.length > 15) {
        alert("This Library can only hold 15 books at a time. Kindly remove the read ones or clear storage!!!")
        return;
    }

    const bookName = addNewForm.bookName.value
    const bookAuthor = addNewForm.bookAuthor.value
    const bookPages = addNewForm.bookPages.value
    const bookRead = addNewForm.bookRead.checked


    if (library.AddNewBook(bookName, bookAuthor, bookPages, bookRead))
        library.ReorganizeShelf()
    else {
        addNewError.animate(
            [
                { scale: 1, opacity: 1 },
                { scale: 1, opacity: 1 },
                { scale: 1, opacity: 1 },
                { scale: 1, opacity: 0 }
            ],
            {
                duration: 2000, easing: "ease"
            }
        )

    }
})

sortByBtn.addEventListener("click", () => {
    let nextSortMethod = parseInt(sortByBtn.dataset.nextSortMethod)
    let currSortMethod = parseInt(sortByBtn.dataset.currentSortMethod)

    sortByBtn.dataset.currentSortMethod = nextSortMethod
    sortByBtn.dataset.nextSortMethod = currSortMethod

    sortByBtn.textContent = nextSortMethod === SORT_METHOD.insertion ? "Sorted By Date" : "Sorted By Name"

    library.ChangeSortMethod(nextSortMethod)
    library.ReorganizeShelf()


})
sortDirBtn.addEventListener('click', () => {
    let nextSortDir = parseInt(sortDirBtn.dataset.nextSortDirection)
    let currSortDir = parseInt(sortDirBtn.dataset.currentSortDirection)

    sortDirBtn.dataset.currentSortDirection = nextSortDir
    sortDirBtn.dataset.nextSortDirection = currSortDir


    let dirIcon = sortDirBtn.querySelector('span')

    dirIcon.textContent = (nextSortDir === SORT_DIR.ascending) ? dirIcon.dataset.asc : dirIcon.dataset.desc


    library.ChangeSortDirection(nextSortDir)
    library.ReorganizeShelf()


})

document.body.addEventListener("click", event => {
    if (isFormOpen() && event.target.closest(".newBook") === null) closeNewBookForm()
})

document.body.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "esc") {
        if (isFormOpen())
            closeNewBookForm()

    }
    if (event.key==='q'){
        console.log(library) 
    }
})

library.RestoreData()

