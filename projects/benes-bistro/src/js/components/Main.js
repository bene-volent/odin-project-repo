import { createElement, addClickListener, createContainer, query, queryAll, removeAllChildren } from "../utils.js";
import Contacts from "./Contacts/Contacts.js";
import Home from "./Home/Home.js";
import Menu from "./Menu/Menu.js";

export default function Main() {
    const main = createElement("main", "main", { id: 'main' })

    const mainWrapper = createElement("div", 'main__wrapper')

    

    const root = query("#root")

    const navLinks = queryAll(".header__navLink")

    let currentWindow = Home()

    navLinks.forEach(navLink => {
        addClickListener(navLink, () => {
            root.dataset.route = navLink.dataset.link
            console.log(parseInt(navLink.dataset.link))

            console.log(window.location.href)
            switch (parseInt(navLink.dataset.link)) {

                case 2:
                    const menu = Menu()
                    showRoute(main,menu , currentWindow)
                    currentWindow = menu
                    break;
                case 3:
                    const contacts = Contacts()
                    showRoute(main, contacts, currentWindow)
                    currentWindow = contacts
                    break;

                default:
                    const home = Home()
                    showRoute(main, home, currentWindow)
                    currentWindow = home
                    break;
            }

        })
    })


    main.appendChild(currentWindow)

    return main


}

export function showRoute(main, route, currentWindow) {


    setTimeout(
        () => {
            removeAllChildren(main)
            main.appendChild(route)


        }, 250
    )


}