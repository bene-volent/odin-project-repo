const header = document.querySelector(".header")
const searchBar = document.querySelector(".header-search")
const searchBarLabel = document.querySelector(".header-search-text")

const searchCloseBtn = document.querySelector(".header-search-close");


const menu = document.querySelector('.menu')
const menuOpen = document.querySelector('.header-menu')
const menuClose = document.querySelector('.menu-close')

const navMenu = document.querySelector('.menu-menu')


menuOpen.addEventListener('click',()=>{
    menu.dataset.status = 'open'
})
menuClose.addEventListener("click",()=>{
    menu.dataset.status = ''
})


navMenu.addEventListener("click",(event)=>{
    const link = event.target.closest("li")

    navMenu.dataset.activeLink = link.dataset.link
    // link.dataset.status='active'
})

searchBarLabel.addEventListener("click",()=>{
    header.toggleAttribute("header-showSearch")
})
searchCloseBtn.addEventListener("click",()=>{
    header.removeAttribute("header-showSearch")
})