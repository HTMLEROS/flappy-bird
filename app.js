document.addEventListener('DOMContentLoaded' , () => {
    const naves = document.querySelector('.naves')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground-moving')

    let birdLeft = 220
    let birdBottom = 100
    //antes 3
    let gravity = 4
    let isGameOver = false
    //antes 430
    let gap = 440
    let puntos = -1


    function startGame() {
        birdBottom -= gravity
        naves.style.bottom = birdBottom + 'px'
        naves.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

// era 32

    function control(e) {
        if (e.keyCode === 65) {
            jump()
        }
    }

    function jump() {
        //antes era 50
        if (birdBottom < 500) birdBottom += 45
        naves.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control)


    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'
        puntos++
        document.getElementById("puntaje").innerText = puntos

        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
                birdBottom === 0 
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20) 
        if (!isGameOver) setTimeout(generateObstacle, 3000)

    }
    generateObstacle()


    function gameOver() {
        clearInterval(gameTimerId)
        console.log('game over')
        isGameOver = true
        document.removeEventListener('keyup', control)
        ground.classList.add('ground')
        ground.classList.remove('ground-moving')
        document.getElementById("perdiste").innerText = `Perdiste! ${puntos} Ptos.`
    }


})
