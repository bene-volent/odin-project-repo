const sketchGrid = document.querySelector(".sketch__grid")
const sizeButtons = document.querySelectorAll(".sizes .controls__button")
const clrButtons = document.querySelectorAll(".colors .controls__button")
const clearButton = document.querySelector("#clearButton")
const toggleModeBtn = document.querySelector(".toggle__color")
const creditBtn = document.querySelector("#creditsButton")
let currentClr = "black"

let mousePressed = false;


toggleModeBtn.addEventListener("click", () => {


    const icon = toggleModeBtn.querySelector("span")
    document.body.classList.toggle('dark')

    icon.animate([{ rotate: CSS.deg(0) }, { rotate: CSS.deg(720) }], {
        duration: 1000, easing: "cubic-bezier(0.05, 1.2, 0.84, 1.06)"
    })
    toggleModeBtn.animate([{ translate: "0 0px" }, { translate: "0 10px" }, { translate: "0 0 " }], {
        duration: 500, easing: "cubic-bezier(0.35, 0.44, 0.51, 1.21)"
    })
    setTimeout(() => {


        if (document.body.classList.contains("dark")) {
            icon.textContent = 'dark_mode'
        }
        else {
            icon.textContent = 'light_mode'
        }
    }, 500
    )

})


function createSketchGrid(size) {


    while (sketchGrid.firstChild) {
        sketchGrid.removeChild(sketchGrid.firstChild)
    }

    let pixel;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {

            pixel = document.createElement('div')
            pixel.classList.add("sketch__pixel")

            pixel.addEventListener("mousedown", drawOnPixel)
            pixel.addEventListener("mouseenter", drawOnPixel)

            sketchGrid.appendChild(pixel)

        }
    }

    sketchGrid.style.setProperty("--size", size)
}



function drawOnPixel(event) {

    if (event.type === "mousedown") mousePressed = !mousePressed;

    if (!mousePressed) return;

    // event.stopPropagation()

    const btn = event.target

    switch (currentClr) {
        case "black":
            btn.style.backgroundColor = "#000000";
            break;

        case "rainbow":
            let hue = Math.floor(Math.random() * 360)
            btn.style.backgroundColor = `hsl(${hue}deg, 100%, 50%)`;
            break;

        case "grayscale":
            let color = btn.style.backgroundColor
            let colors = color.slice(4, color.length - 1).split(", ")
            let lightness = 80;

            if (colors.length > 1) {

                let [red, green, blue] = colors.map((val) => { return parseInt(val) })

                if (red === green && green == blue) {
                    lightness = Math.max(Math.floor(red / 255 * 100) - 20, 0)
                }

            }


            btn.style.backgroundColor = `hsl(0deg, 0%, ${lightness}%)`;
            break;

        case "colorPicker":
            const colorPicker = document.getElementById("colorPicker")
            btn.style.backgroundColor = colorPicker.value;
            
            break;
        case "erase":
            btn.style.backgroundColor ="#fff";
            break;
    }


}

function setGridSize(btn) {
    const size = parseInt(btn.dataset.size)

    createSketchGrid(size)
}

sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => setGridSize(btn))
})

function setColor(btn) {
    currentClr = btn.dataset.clr

    if (btn.id === "colorPicker")
        currentClr = "colorPicker"



    const colorTooltip = document.querySelector('.sketch__color_tooltip span')
    colorTooltip.textContent = currentClr;
    colorTooltip.parentElement.classList.remove('active')
    setTimeout(() => {
        colorTooltip.parentElement.classList.add('active')

    })
}

clrButtons.forEach((btn) =>
    btn.addEventListener("click", () => setColor(btn))
)

function clearSketch() {
    sketchGrid.childNodes.forEach((pixel) => { pixel.style.backgroundColor = "#fff" })
    mousePressed = false
}

clearButton.addEventListener("click", () => { clearSketch() })


window.addEventListener("keypress", (event) => {
    if (event.key === 'c') document.getElementById("colorPicker").click()
})

creditBtn.addEventListener("click", () => {
    document.querySelector(".credits").classList.toggle("active")
})


createSketchGrid(16)

