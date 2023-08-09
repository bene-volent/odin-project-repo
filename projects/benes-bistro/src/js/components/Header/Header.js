import { addClickListener, createContainer, createElement } from "../../utils.js";



export default function Header() {

    const root = document.getElementById("root")

    const header = createElement("header", "header");

    const headerContainer = createContainer()
    header.appendChild(headerContainer);

    const headerWrapper = createElement("div", "header__wrapper");
    headerContainer.appendChild(headerWrapper);

    const headerLogoWrapper = createElement('div',"header__logo_wrapper")

    const headerLogo = createElement("div", "header__logo");
    const headerImage = createElement("img", "header__logo_img", {
        src: "/assets/img/logo.png",
        alt: "Bene's Bistro Logo",
    });
    const headerText = createElement("h1", "header__logo_text");
    headerText.textContent = "Bene's Bistro"

    headerLogo.append(headerImage, headerText);



    const headerMenuButton = createElement("button", "header__ham")


    headerLogoWrapper.append(headerLogo,headerMenuButton)

    const headerNav = createElement("nav", "header__nav", { "data-mobile-active": 0 });



    const headerNavList = createElement("ul", "header__navList");
    headerNav.appendChild(headerNavList)
    const navItems = ["home", "menu", "contact us"];

    for (let navDir in navItems) {
        const headerNavItem = createElement("li", "header__navItem", {
            "data-link": +navDir + 1,
        });
        const headerNavLink = createElement("a", "header__navLink", {
            "data-link": +navDir + 1,"tabindex":1
        });
        headerNavLink.textContent = navItems[navDir]
        headerNavItem.appendChild(headerNavLink);
        headerNavList.appendChild(headerNavItem);

        headerNavLink.addEventListener("keydown",(event)=>{
            headerNavLink.click()
        })
    }

    addClickListener(headerMenuButton, () => {
        headerMenuButton.classList.toggle("active")
        headerNav.dataset.mobileActive = (parseInt(headerNav.dataset.mobileActive) + 1) % 2

    })

    headerWrapper.append(headerLogoWrapper, headerNav)

    

    return header
}
