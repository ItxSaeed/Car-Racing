const score = document.querySelector('.score')

const startScreen = document.querySelector('.startScreen')

const gameArea = document.querySelector('.gameArea')


document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)
startScreen.addEventListener('click', start)

let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }
let player = { speed: 3, score : 0 }
function keyDown(e) {

    e.preventDefault()
    keys[e.key] = true
}

function keyUp(e) {

    e.preventDefault()
    keys[e.key] = false
}

function isCollide(a, b) {

    aRect = a.getBoundingClientRect()
    bRect = b.getBoundingClientRect()

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}


function moveLines() {

    let lines = document.querySelectorAll('.lines')

    lines.forEach(function (item) {

        if (item.y >= 700) {

            item.y -= 750
        }

        item.y = item.y + player.speed
        item.style.top = item.y + "px"
    })
}


function moveEnemy(car) {

    let enemy = document.querySelectorAll('.enemy')

    enemy.forEach(function (item) {

        if (isCollide(car, item) == true) {

            console.log("Bom!! Hit")
            player.start = false
            startScreen.classList.remove('hide')
            startScreen.innerHTML = "Game Over <br>Your final score is: " + (player.score+1) + " <br>Press here to restart the game"
        }

        if (item.y >= 750) {

            item.y = -300
            item.style.left = Math.floor(Math.random() * 350) + "px"
        }

        item.y = item.y + player.speed
        item.style.top = item.y + "px"
    })
}

function gamePlay() {

    let car = document.querySelector('.car')
    let road = gameArea.getBoundingClientRect()

    if (player.start == true) {

        moveLines()
        moveEnemy(car)

        if (keys.ArrowUp == true && player.y > (road.top + 90)) {

            player.y = player.y - player.speed
        }

        if (keys.ArrowDown == true && player.y < (road.bottom - 70)) {

            player.y = player.y + player.speed
        }

        if (keys.ArrowLeft == true && player.x > 0) {

            player.x = player.x - player.speed
        }

        if (keys.ArrowRight == true && player.x < 350) {

            player.x = player.x + player.speed
        }

        car.style.top = player.y + "px"
        car.style.left = player.x + "px"

        window.requestAnimationFrame(gamePlay)
        player.score++
        score.innerHTML = "Score: " + player.score
    }
}

function start() {

    //gameArea.classList.remove('hide')
    gameArea.innerHTML = ""
    startScreen.classList.add('hide')
    player.start = true
    player.score = 0
    window.requestAnimationFrame(gamePlay)

    for (x = 0; x < 5; x++) {

        let roadLine = document.createElement('div')
        roadLine.setAttribute('class', 'lines')
        roadLine.y = (x * 150)
        roadLine.style.top = roadLine.y + "px"
        gameArea.appendChild(roadLine)
    }

    let car = document.createElement('div')
    car.setAttribute('class', 'car')
    gameArea.appendChild(car)

    player.x = car.offsetLeft
    player.y = car.offsetTop

    for (x = 0; x < 3; x++) {

        let enemyCar = document.createElement('div')
        enemyCar.setAttribute('class', 'enemy')
        enemyCar.y = ((x + 1) * 350) * -1
        enemyCar.style.top = enemyCar.y + "px"
        enemyCar.style.backgroundColor = 'red'
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px"
        gameArea.appendChild(enemyCar)
    }
}