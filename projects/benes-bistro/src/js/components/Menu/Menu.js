import { createElement, createWrapper ,addClickListener,query} from "../../utils.js"


const menuList = [
    {
        img: "./assets/img/dish/1.webp",
        title: "Dates Stuffed Dahi Kebab [6 Pieces]",
        ingredients: "Dates pulp, hung curd cottage cheese, ginger and chilli coriander shallow fry.",
        cost: 425
    },
    {
        img: "./assets/img/dish/2.webp",
        title: "Honey Chilli Potato",
        ingredients: "Freshly potato finger chips coated with corn flour tossed in chilli sauce.",
        cost: 299
    },
    {
        img: "./assets/img/dish/3.webp",
        title: "Schezwan Soya Chaap",
        ingredients: "Soya champ, red yellow peppers, green onion, chilli and tomato sauce chopped ginger garlic.",
        cost: 355
    },
    {
        img: "./assets/img/dish/4.webp",
        title: "Nuts Stuffed Malai Soya Champ [6 Pieces]",
        ingredients: "Soft champ, mixed dry fruit, cheese, cream, hung curd and green cardamom",
        cost: 325
    },
    {
        img: "./assets/img/dish/5.webp",
        title: "Classical Veg Biryani With Mirch Ka Salan & Raita",
        ingredients: "Served with mirch ka salan and raita. Long grain rice, carrot, beans, cauliflower, paneer, desi ghee, golden onion and nuts.",
        cost: 425
    },
    {
        img: "./assets/img/dish/6.webp",
        title: "Soya Keema Biryani Mirch Ka Salan & Raita",
        ingredients: "Served with mirch ka salan and raita. Long grain rice, soya chunks, desi ghee, golden onion and nuts.",
        cost: 460
    }
]

export default function Menu() {
    const menu = createElement("section", "main__menu")

    const menuWrapper = createWrapper(menu, "menu__wrapper")

    const menuHeading = createElement("h2", "menu__heading")
    menuHeading.textContent = "Our Menu"

    const menuGrid = createElement("div", "menu__grid_main")

    const menuContact = createElement("button","menu__contact",{type:"button"})
    menuContact.innerHTML = '<span class="material-icons">call</span> Book a Table'

    
    
    const onScreenObserver = new IntersectionObserver((entries,observer)=>{
        entries.forEach(entry=>{
            if (!entry.isIntersecting) return
            entry.target.classList.add("entered")
            observer.unobserve(entry.target)
            
        })
    },{
        root:null,threshold:0.75
    })

    for (let i = 0; i < menuList.length; i++) {
        
        const menuImg = createElement("img", "menu__img", {
            src: menuList[i].img, alt: menuList[i].title,loading:"lazy"
        })
        const menuDesc = createElement("div", "menu__desc")

        const menuTitle = createElement("h3", "menu__title")
        const menuIng = createElement("p", "menu__ingredients")
        const menuCost = createElement("p", "menu__cost", { "data-currency": "\\20B9" })

        const menuTitleContainer = createElement("div", "menu__titleContainer")

        menuTitle.textContent = menuList[i].title
        menuIng.textContent = menuList[i].ingredients
        menuCost.textContent = menuList[i].cost
        

        menuTitleContainer.append(menuTitle, menuCost)

        menuDesc.append(menuTitleContainer, menuIng)

        const menuContentGrid = createElement("div", "menu__grid_content")
        menuContentGrid.append(menuImg, menuDesc)

        menuGrid.append(menuContentGrid)

        onScreenObserver.observe(menuContentGrid)
        
    }


    addClickListener(menuContact, () => {
        query('.header__navLink[data-link="3"]').click()
})

    menuWrapper.append(menuHeading, menuGrid,menuContact)

    return menu
}