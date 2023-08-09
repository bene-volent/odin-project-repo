import { createElement, createWrapper } from "../../utils.js"

export default function Contacts() {
    const contacts = createElement("section", "main__contacts")

    const contactWrapper = createWrapper(contacts, "contact__wrapper")
    const contactHeading = createElement("h2", "contact__heading")
    contactHeading.textContent = "Contact Us"



    const contactGrid = createElement("div","contact__grid")

    const contactMap = createElement("img","contact__map",{
        src:"./assets/img/map.png"
    })

    const contactConnection = createElement('div',"contact__connect")

    const address = createElement("address","contact__container")
    const addressSymbol = createElement("span","material-icons contact__symbol")
    addressSymbol.textContent = 'place'

    const addressText = createElement('p',"contact__text")
    addressText.textContent = "Bene's Bistro, West Brown Deer Road, Milwaukee, WI, USA"

    address.append(addressSymbol,addressText)


    const phone = createElement("address","contact__container")
    const phoneSymbol = createElement("span","material-icons contact__symbol")
    phoneSymbol.textContent = 'phone'

    const phoneText = createElement('p',"contact__text")
    phoneText.textContent = "(717) 550-1675"

    phone.append(phoneSymbol,phoneText)

    
    const creator = createElement("address","contact__container")
    const creatorSymbol = createElement("span","devicon-github-original contact__symbol")

    const creatorText = createElement('a',"contact__text contact__link",{
        href:"https://github.com/bene-volent"
    })
    creatorText.textContent = "Developer : Bene-volent"

    creator.append(creatorSymbol,creatorText)

    contactConnection.append(address,phone,creator)



    contactGrid.append(contactMap,contactConnection)





    contactWrapper.append(contactHeading,contactGrid)

    return contacts
}