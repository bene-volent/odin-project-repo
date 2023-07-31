const header = document.querySelector(".header");

const searchForm = document.querySelector(".header-search-form");
const searchBar = document.querySelector(".header-search");
const searchBarBtn = document.querySelector(".header-search-text");

const searchCloseBtn = document.querySelector(".header-search-close");

const menu = document.querySelector(".menu");
const menuOpen = document.querySelector(".header-menu");
const menuClose = document.querySelector(".menu-close");

const navMenu = document.querySelector(".menu-menu");

const main = document.querySelector("body main");

function removeElementChildren(element) {
  function clearInner(node) {
    while (node.hasChildNodes()) {
      clear(node.lastChild);
    }
  }

  function clear(node) {
    while (node.hasChildNodes()) {
      clear(node.lastChild);
    }
    node.parentNode.removeChild(node);
  }

  clearInner(element);
}

function createMainWrapper(route) {
  let mainWrapper = document.createElement("section");
  main.dataset.route = route;
  mainWrapper.classList.add("main-wrapper");
  return mainWrapper;
}

function createProjectsContent() {
  let mainWrapper = createMainWrapper(1);

  const heading = document.createElement("h2");
  heading.classList.add("main-heading");
  heading.textContent = "Projects";

  mainWrapper.appendChild(heading);

  let projectGrid = document.createElement("div");


  fetch("./projects.json")
    .then((response) => {
      response
        .json()
        .then((jsonData) => {
          data = jsonData.projects;
        
          projectGrid.classList.add("project-grid");
        
          for (let i = 0; i < data.length; i++) {
            let img = document.createElement("img");
            img.src = data[i].img;
            img.alt = "Project Image";
        
            img.loading = "lazy";
        
            let title = document.createElement("h3");
            title.classList.add("project-heading");
            title.textContent = data[i].name;
        
            let description = document.createElement("p");
            description.classList.add("project-description");
            description.textContent = data[i].desc

            let share = document.createElement("span");
            let like = document.createElement("span");
        
            share.classList.add("material-symbols-outlined");
            like.classList.add("material-symbols-outlined");
        
            share.textContent = "share";
            like.textContent = "favorite";
        
            let shareLink = document.createElement("a");
            shareLink.href = data[i].link;
            shareLink.target="_blank"
            shareLink.classList.add("button");
            shareLink.appendChild(share);
        
            let likeLink = document.createElement("a");
            likeLink.href = "#";
            likeLink.classList.add("button");
            likeLink.appendChild(like);
        
            let projectDetails = document.createElement("div");
            projectDetails.classList.add("project-details");
        
            projectDetails.appendChild(title);
            projectDetails.appendChild(description);
        
            let projectShare = document.createElement("div");
            projectShare.classList.add("project-share");
        
            projectShare.appendChild(shareLink);
            projectShare.appendChild(likeLink);
        
            let project = document.createElement("article");
            project.classList.add("project");
        
            project.appendChild(img);
            project.appendChild(projectDetails);
            project.appendChild(projectShare);
        
            projectGrid.appendChild(project);
          }
        
        })
        .catch((err) => {console.log("Problem In Projects data")});
    })
    .catch((err) => {console.log("Problem In Projects data")});


  
  

  mainWrapper.appendChild(projectGrid);

  return mainWrapper;
}
function createMessagesContent() {
  let mainWrapper = createMainWrapper(2);

  const heading = document.createElement("h2");
  heading.classList.add("main-heading");
  heading.textContent = "Messages";

  mainWrapper.appendChild(heading);


  
  let para = document.createElement('p')
  para.classList.add("profile-error")

  para.textContent = "You have no unseen messages left!"

  mainWrapper.appendChild(para)

  return mainWrapper;
}
function createStatsContent() {
  let mainWrapper = createMainWrapper(3);

  const heading = document.createElement("h2");
  heading.classList.add("main-heading");
  heading.textContent = "Stats";

  mainWrapper.appendChild(heading);

  let para = document.createElement('p')
  para.classList.add("profile-error")

  para.textContent = "Unable to show your projects stats!"

  mainWrapper.appendChild(para)
  return mainWrapper;
}
function createProfileContent() {
  let mainWrapper = createMainWrapper(4);

  const heading = document.createElement("h2");
  heading.classList.add("main-heading");
  heading.textContent = "Profile";

  mainWrapper.appendChild(heading);

  let para = document.createElement('p')
  para.classList.add("profile-error")

  para.textContent = "Unable to show your profile!"

  mainWrapper.appendChild(para)
  return mainWrapper;
}

function createMainContent(contentType) {
  console.time("Routing");
  console.log(contentType);
  let mainWrapper;

  switch (contentType) {
    case 1:
      mainWrapper = createProjectsContent();
      break;
    case 2:
      mainWrapper = createMessagesContent();
      break;
    case 3:
      mainWrapper = createStatsContent();
      break;

    case 4:
      mainWrapper = createProfileContent();
  }
  const mainContainer = main.querySelector(".container");

  removeElementChildren(mainContainer);

  mainContainer.appendChild(mainWrapper);

  console.timeEnd("Routing");
}

menuOpen.addEventListener("click", () => {
  menu.dataset.status = "open";
});
menuClose.addEventListener("click", () => {
  menu.dataset.status = "";
});

navMenu.addEventListener("click", (event) => {
  const link = event.target.closest("li");

  if (link===null) return 

  if (navMenu.dataset.activeLink === link.dataset.link) return;
  navMenu.dataset.activeLink = link.dataset.link;

  createMainContent(parseInt(link.dataset.link));

  setTimeout(()=>{
    menu.dataset.status = ''
  },350)
  // link.dataset.status='active'
});

searchBarBtn.addEventListener("click", (event) => {
  switch (searchBarBtn.getAttribute("type")) {
    case "button":
      event.preventDefault();
      header.setAttribute("header-showSearch", "");
      searchBarBtn.setAttribute("type", "submit");
      break;
    case "submit":
      break;
  }
});

searchBar.addEventListener("focus", () => {
  header.setAttribute("header-showSearch", "");
});
searchCloseBtn.addEventListener("click", () => {
  searchBarBtn.setAttribute("type", "button");
  header.removeAttribute("header-showSearch");
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(searchBar.value)
  searchBar.value =''
});

createMainContent(1);
