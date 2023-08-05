const header = document.querySelector(".header");

let game = {
    grid: new Array(9),
    currentPlayer: 0,
    playerSymbols: ["x", 'o'],
    isBotEnabled: false,
    score: [0, 0],
    moveLeft: 9,
    nextPlayer: function () {
        this.currentPlayer = (this.currentPlayer + 1) % 2
        this.moveLeft--;
    },
    pickRandomMove: function () {
        let pos;
        let count = 0
        do {
            pos = Math.floor(Math.random() * 9)
        } while (this.grid[pos] !== undefined)
        this.grid[pos] = 1
        this.nextPlayer()
        return pos
    },
    // pickBotMove: function () {
    //     let gridImg = this.grid.slice()
    //     let bestMove ;
    //     let bestScore = -Infinity
    //     let tmpScore
    //     for (let i = 0; i< 9 ;i++){
    //         if (gridImg[i] === undefined){
    //             gridImg[i] = 1
    //             tmpScore = this.minmax(gridImg, !this.currentPlayer)
    //             console.log(tmpScore,i)
    //         }
    //     }
    // },
    pickMove: function (position) {
        this.grid[position] = this.currentPlayer
        this.nextPlayer()
    },
    // minmax: function (grid, maximizingPlayer) {
    //     if (this.verifyResult(grid) !== null || grid.every(val => val !== undefined)) {
    //         return this.verifyResult(grid)
    //     }

    //     if (isMaximizing) {
    //         let bestScore = -Infinity;

    //         for (let i = 0; i < grid.length; i++) {
    //             if (grid[i] == undefined) {
    //                 let tmpGrid = grid.slice()
    //                 tmpGrid[i] = 1
    //                 let child = tmpGrid
    //                 let score = this.minimax(child, false)
    //                 if (score >= bestScore) {
    //                     bestScore = score;
    //                 }
    //             }
    //         }
    //         return bestScore;
    //     }
    //     else {
    //         let bestScore = Infinity;

    //         for (let i = 0; i < board.length; i++) {
    //             if (grid[i] == undefined) {
    //                 let tmpGrid = grid.slice()
    //                 tmpGrid[i] = 0
    //                 let child = tmpGrid
    //                 let score = this.minimax(child, true)
    //                 if (score <= bestScore) {
    //                     bestScore = score;
    //                 }
    //             }
    //         }
    //         return bestScore;
    //     }

    // },
    verifyResult: function (grid) {
        grid = grid === undefined ? this.grid : grid
        if (
            // Horizontal Line8
            (grid[0] === grid[1] && grid[1] === grid[2] && grid[2] === 0) || (grid[3] === grid[4] && grid[4] === grid[5] && grid[5] === 0) || (grid[6] === grid[7] && grid[7] === grid[8] && grid[8] === 0)
            ||
            // Vertical Line
            (grid[0] === grid[3] && grid[3] === grid[6] && grid[6] === 0) || (grid[1] === grid[4] && grid[4] === grid[7] && grid[7] === 0) || (grid[2] === grid[5] && grid[5] === grid[8] && grid[8] === 0)
            ||
            // Diagonals
            (grid[0] === grid[4] && grid[4] === grid[8] && grid[8] === 0) || (grid[2] === grid[4] && grid[4] === grid[6] && grid[6] === 0)
        ) { return 1 }

        else if (
            // Horizontal Line8
            (grid[0] === grid[1] && grid[1] === grid[2] && grid[2] === 1) || (grid[3] === grid[4] && grid[4] === grid[5] && grid[5] === 1) || (grid[6] === grid[7] && grid[7] === grid[8] && grid[8] === 1)
            ||
            // Vertical Line
            (grid[0] === grid[3] && grid[3] === grid[6] && grid[6] === 1) || (grid[1] === grid[4] && grid[4] === grid[7] && grid[7] === 1) || (grid[2] === grid[5] && grid[5] === grid[8] && grid[8] === 1)
            ||
            // Diagonals
            (grid[0] === grid[4] && grid[4] === grid[8] && grid[8] === 1) || (grid[2] === grid[4] && grid[4] === grid[6] && grid[6] === 1)
        ) {
            return -1
        }
        if (this.moveLeft === 0) {
            return 0
        }
        return null
    },
    reset: function () {
        this.currentPlayer = 0;
        this.moveLeft = 9
        this.grid = new Array(9)

    }
}


const start = {
    window: document.querySelector(".start"),
    video: document.querySelector(".start__selector_video"),
    buttons: document.querySelector(".start__selector_buttons"),
    human: document.querySelector(".start__human"),
    bot: document.querySelector(".start__bot"),
    startGame: document.querySelector(".start__start")
};

const gameWindow = {
    window: document.querySelector(".game"),
    grid: document.querySelector(".game__grid"),
    buttons: document.querySelectorAll(".game__button"),

    roundOver: document.querySelector(".round__over"),
    roundOverContinue: document.querySelector(".round__buttons > [data-continue]"),
    roundOverClose: document.querySelector(".round__buttons > [data-close]"),

    gameOver: document.querySelector(".game__over"),
    gameWinner: document.querySelector(".game__winner"),
    gameOverOpen: false
}

start.video.addEventListener("loadeddata", () => {

    setTimeout(() => {
        header.classList.remove("loading");
    }, 500)

});

start.human.addEventListener('click', () => {

    if (start.video.currentTime <= 0) {
        start.video.currentTime = 0
        return;
    }
    else {
        let reversePlayback = setInterval(() => {
            start.video.currentTime += - 0.03
            if (start.video.currentTime <= 0) {
                clearInterval(reversePlayback)
            }
        }, 25)
    }
    start.buttons.dataset.selected = 0

})

start.bot.addEventListener("click", () => {
    if (start.video.currentTime === 0) { start.video.play() }
    start.buttons.dataset.selected = 1
})


gameWindow.gameOver.addEventListener("close", (event) => {
    event.preventDefault()

    location.reload()

})

start.startGame.addEventListener("click", () => {
    start.window.animate(
        [
            { translate: "0 0", opacity: "1" }, { translate: "0 50px", opacity: 0 }
        ]
        , {
            duration: 750, fill: "forwards"
        }
    )
    setTimeout(() => {
        start.window.classList.add("hidden")
        gameWindow.window.classList.remove("hidden")
        setTimeout(() => {
            gameWindow.window.animate(
                [{
                    opacity: 0, translate: "0 100px"
                },
                {
                    opacity: 1, translate: "0 0"
                }
                ]
                , {
                    duration: 750, fill: "forwards"
                }
            )
        })
    }, 750)


    let isBotEnabled = parseInt(start.buttons.dataset.selected)
    game.isBotEnabled = isBotEnabled
})

function botMoveEvent() {

    let position = game.pickRandomMove()
    gameWindow.buttons[position].dataset.value = 'o'

}

gameWindow.buttons.forEach(
    (button, index) => {
        button.addEventListener("click", () => {

            if (button.dataset.value || game.moveLeft <= 0) {
                return
            }
            let isBotEnabled = game.isBotEnabled
            let result

            let currentSymbol = game.playerSymbols[game.currentPlayer]
            game.pickMove(index)

            button.dataset.value = currentSymbol


            result = game.verifyResult()

            if (isBotEnabled && result === null && game.moveLeft > 0) {
                botMoveEvent()
                result = game.verifyResult()
            }
            gameWindow.grid.dataset.currentPlayer = game.playerSymbols[game.currentPlayer]
            if (result != null) {
                declareRoundResult(result)
            }
        })
    }
)

function declareRoundResult(result) {
    const winner = gameWindow.roundOver.querySelector(".round__winner")

    switch (result) {
        case 0:
            winner.textContent = "No one"

            break;

        case 1:
            winner.textContent = "Player X"
            game.score[0]++
            break;

        case -1:
            winner.textContent = "Player O"
            game.score[1]++
            break
        default:
            return;

    }
    updateScore();


    if (Math.max(...game.score) === 2) {
        declareGameResult();
        return;
    }

    setTimeout(() =>
        gameWindow.roundOver.showModal()
        , 250)
}

function declareGameResult() {
    if (game.score[0] > game.score[1]) {
        gameWindow.gameWinner.textContent = "Player X"
    }
    else if (game.score[0] < game.score[1]) {
        gameWindow.gameWinner.textContent = "Player O"
    }
    else {
        gameWindow.gameWinner.textContent = "No One"
    }
    setTimeout(() => {
        gameWindow.gameOver.showModal()
        gameWindow.gameOverOpen = true
    }
        , 250)
    return;

}


function updateScore() {
    let scores = document.querySelectorAll(".score__player .score__score")
    scores[0].textContent = game.score[0]
    scores[1].textContent = game.score[1]
}

function resetGame() {
    game.reset()

    gameWindow.grid.dataset.currentPlayer = 'x'
    gameWindow.buttons.forEach(button => {
        button.dataset.value = ''
    })
}

function continueRoundModal() {
    resetGame()
    gameWindow.roundOver.close()
}

function closeRoundModal() {
    gameWindow.roundOver.close()
    declareGameResult()
}

gameWindow.roundOverClose.addEventListener("click", closeRoundModal)
gameWindow.roundOverContinue.addEventListener("click", continueRoundModal)

document.body.addEventListener("click",()=>{
    if (gameWindow.gameOverOpen){
        gameWindow.gameOver.close() 
    }
})