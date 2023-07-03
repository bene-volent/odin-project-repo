
function cardTemplate({ name, link, img,desc }) {
    return `<article class="card">
        <div class="card__image">
        <a  href="${link}"><img src="${img}" loading="lazy" alt="Project ScreenShot"> </a>
        </div>
        <div class="card__content">
            <a class="card__link" href="${link}">
                <ion-icon name="link-outline"></ion-icon>
                <h3 class="card__title">${name}</h3>  
            </a>
            <p class="card__description">${desc}</p>
        </div>
    </article>`
}
function getCardPlaceholder() {
    return `<article class="card placeholder">
                <div class="card__image">
                    <a href="#projects">
                        <div class="place-holder"></div>
                    </a>
                </div>
                <div class="card__content">
                    <a class="card__link" href="#projects">
                    <ion-icon name="link-outline"></ion-icon>

                    <h3 class="card__title place-holder"></h3>
                        
                    </a>
            <p class="card__description place-holder"></p>

                </div>
            </article>`
}


const projectListGrid = document.querySelector("#projects .projects__grid")
const nPlaceholders = 5

async function retrieveProjectInfo() {
    let json = await (await fetch("./projectList.json")).json()

    for (let project of json.projects) {
        projectListGrid.innerHTML += cardTemplate(project)
    }
    for (let i = 0; i < nPlaceholders; i++) {
        projectListGrid.innerHTML += getCardPlaceholder()
    }
}

await retrieveProjectInfo()
