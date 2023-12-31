let playerChoice;
let computerChoice;

let game = document.querySelector(".game")
let gameWindow = game.querySelector(".game__window")
let resultElement = document.querySelector(".result")
let score = document.querySelector(".header__score")
let resultTxt = document.querySelector('.result__span')
// Let us represent choices in numbers
// Rock : 1
// Paper : 2
// Scissor : 3
let choices = ["Rock", "Paper", "Scissor"]

function evaluteReult(player, cpu) {

    // Tie Conditions [ 0 ]  : (Player - Computer + 3) % 3 =  0 |   [ (x - x + 3) % 3 = 0 ] 
    // Win Conditions [ 1 ]  : (Player - Computer + 3) % 3 =  1 |   [ 1. (x + 1 - x + 3) % 3 = 1 || 2. (1 - 3 + 3) % 3 = 1 [Rock , Scissor] ]
    // Loss Conditions[ 2 ]  : (Player - Computer + 3) % 3 =  2 |   [ 1. (x - 1 - x + 3) % 3 = 2 || 2. (3 - 1 + 3) % 3 = 2 [Scissor , Rock] ]

    return ((player - cpu + 3) % 3)

}

function generateCPUMove() { return Math.ceil(Math.random() * 3) }





function showRules() {
    if (document.querySelector(".rules").classList.contains("active")){
        hideRules()
        return;
    }
    document.querySelector(".rules").classList.add("active")
}
function hideRules() {
    document.querySelector(".rules").classList.remove("active")
}


document.querySelectorAll(".game__btn").forEach((button) => {
    button.addEventListener("click", () => {
        if (game.dataset.state === 'played') return;

        game.dataset.state = 'played'

        button.dataset.select = 'player'
        playerChoice = parseInt(button.dataset.value)
        computerChoice = generateCPUMove()

        // Creating Clone in case computer choose same Button
        let cpuButton = document.querySelector(`.game__btn[data-value="${computerChoice}"`).cloneNode(true)
        // console.log(computerChoice,cpuButton)
        cpuButton.classList.add("game__btn--clone")
        cpuButton.dataset.select = 'cpu'
        console.log(computerChoice)
        gameWindow.append(cpuButton)

        // Creating a timeout effect to let css animations to end
        
        const timeOut = setTimeout(() => {
            switch (evaluteReult(playerChoice, computerChoice)) {
                case 0:
                    resultElement.dataset.result = "tie"
                    resultTxt.textContent="tied"
                    break;
                case 1:
                    resultElement.dataset.result = "win"
                    resultTxt.textContent="win"
                    score.textContent = parseInt(score.textContent) + 1
                    button.classList.add('won')
                    break;
                case 2:
                    resultElement.dataset.result = "loss"
                    resultTxt.textContent="lost"
                    score.textContent = parseInt(score.textContent) - 1
                    cpuButton.classList.add('won')
                    break;
                default:
                    break;
            }
            clearInterval(timeOut)
        },3000)

        // console.log(resultTxt)


    })
})


function replayGame(){
    const clone = (gameWindow.querySelector(".game__btn--clone"))
    const player = (gameWindow.querySelector("[data-select='player'"))

    // Clear Game states from window,player and remove the cpu clone button.
    
    player.classList.remove('won')
    player.dataset.select=''
    game.dataset.state=""
    resultElement.dataset.result=''
    gameWindow.removeChild(clone)

}
