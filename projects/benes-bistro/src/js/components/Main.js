import { createElement, addClickListener, createContainer, query, queryAll, removeAllChildren } from "../utils.js";
import Contacts from "./Contacts/Contacts.js";
import Home from "./Home/Home.js";
import Menu from "./Menu/Menu.js";

export default function Main() {
    const main = createElement("main", "main", { id: 'main' })

    const mainWrapper = createElement("div", 'main__wrapper')



    const home = Home()
    const menu = Menu()
    const contacts = Contacts()

    const root = query("#root")

    const navLinks = queryAll(".header__navLink")

    let currentWindow = home

    navLinks.forEach(navLink => {
        addClickListener(navLink, () => {
            root.dataset.route = navLink.dataset.link
            console.log(parseInt(navLink.dataset.link))
            switch (parseInt(navLink.dataset.link)) {

                case 2:

                    showRoute(main, menu, currentWindow)
                    currentWindow = menu
                    break;
                case 3:
                    showRoute(main, contacts, currentWindow)
                    currentWindow = contacts
                    break;

                default:
                    showRoute(main, home, currentWindow)
                    currentWindow = home
                    break;
            }

        })
    })


    main.appendChild(home)

    return main


}

export function showRoute(main, route, currentWindow) {


   

    setTimeout(
        () => {
            main.innerHTML = ''
            main.appendChild(route)


        }, 250
    )


}