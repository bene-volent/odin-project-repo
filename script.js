
function cardTemplate({name , link,img}) {
    return `<article class="card">
        <div class="card__image">
            <img src="${img}" alt="Project ScreenShot"> 
        </div>
        <div class="card__content">
            <a href="#projects">
                <h3 class="card__title">${name}</h3>
                <span class="card__link">
                    <span class="card__link__icon material-symbols-outlined"> link </span>
                    <span class="card__link__content">${link}</span>
                </span>
            </a>
        </div>
    </article>`
}
function getCardPlaceholder() {
    return `<article class="card placeholder">
                <div class="card__image">
                    <div class="place-holder"></div>
                </div>
                <div class="card__content">
                    <a href="#projects">
                        <h3 class="card__title place-holder"></h3>
                        <span class="card__link">
                            <span class="card__link__icon material-symbols-outlined"> link </span>
                            <span class="card__link__content place-holder"></span>
                        </span>
                    </a>
                </div>
            </article>`
}


const projectListGrid = document.querySelector("#projects .projects__grid")
const nPlaceholders = 5

async function retrieveProjectInfo() {
    let json = await (await fetch("./projectList.json")).json()

    for (let project of json.projects){
        projectListGrid.innerHTML+=cardTemplate(project)
    }
    for (let i = 0; i < nPlaceholders; i++) {
        projectListGrid.innerHTML += getCardPlaceholder()
    }
}

await retrieveProjectInfo()
