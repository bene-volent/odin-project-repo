import { addClickListener, createContainer, createElement, createWrapper, query } from "../../utils.js"
import { showRoute } from "../Main.js"

export default function Home() {
    const home = createElement("section", "main__home")

    const homeWrapper = createWrapper(home, "home__wrapper")


    const homeContent = createElement("div", "home__content")
    const homeImage = createElement("div", "home__image")

    const homeTitle = createElement("h2", "home__title")
    homeTitle.textContent = "Explore the World of Asian Fusion Cuisine"

    const homeText = createElement("p", "home__text")
    homeText.textContent = "A fusion of cultures and cuisines that will tantalize your taste buds."

    const menuButton = createElement("button", "home__button", { type: "button" })
    menuButton.textContent = "Check our Menu"

    homeContent.append(homeTitle, homeText, menuButton)

    const homeImg = createElement("img", "home__img", {
        src: "./assets/img/homeImg.avif", alt: "Home Image"
    })
    homeImage.appendChild(homeImg)

    homeWrapper.append(homeContent, homeImage)

    addClickListener(menuButton, () => {
            query('.header__navLink[data-link="2"]').click()
    })

    return home
}