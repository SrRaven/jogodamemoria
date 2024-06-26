const allImages = [
    'img/image1.jpg',
    'img/image2.jpg',
    'img/image3.jpg',
    'img/image4.jpg',
    'img/image5.jpg',
    'img/image6.jpg',
    'img/image7.jpg',
    'img/image8.jpg',
    'img/image9.jpg',
    'img/image10.jpg',
    'img/image11.jpg',
    'img/image12.jpg',
    'img/image13.jpg',
    'img/image14.jpg',
    'img/image15.jpg',
    'img/image16.jpg'
];

function getRandomImages(images, num) {
    const shuffled = images.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

const selectedImages = getRandomImages(allImages, 8);
const cards = selectedImages.flatMap(img => [{ id: img, img }, { id: img, img }]);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledCards = shuffleArray(cards);
console.log(shuffledCards); // Imprimi o array embaralhado

const gameBoard = document.querySelector('.game-board');
gameBoard.style.display = 'grid';

shuffledCards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.cardId = card.id;

    const frontFace = document.createElement('div');
    frontFace.classList.add('front-face');
    frontFace.style.backgroundImage = `url(${card.img})`;

    const backFace = document.createElement('div');
    backFace.classList.add('back-face');

    cardElement.appendChild(frontFace);
    cardElement.appendChild(backFace);
    gameBoard.appendChild(cardElement);
});

let flippedCard = null;
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if (this === flippedCard) return;

    this.classList.toggle('flipped');

    if (!flippedCard) {
        flippedCard = this;
        return;
    }

    if (flippedCard.dataset.cardId === this.dataset.cardId) {
        // Cartas correspondentes, não faça nada
        flippedCard = null;
    } else {
        // Cartas não correspondentes, volte a posição virada
        lockBoard = true;
        setTimeout(() => {
            flippedCard.classList.remove('flipped');
            this.classList.remove('flipped');
            flippedCard = null;
            lockBoard = false;
        }, 1000);
    }

    // Verificar se o jogo terminou
    if (checkAllCardsFlipped()) {
        showGameOverScreen();
    }
}

function checkAllCardsFlipped() {
    const cards = document.querySelectorAll('.card');
    return Array.from(cards).every(card => card.classList.contains('flipped'));
}

const instructionsScreen = document.querySelector('.instructions-screen');
const startGameBtn = document.querySelector('.start-game-btn');

startGameBtn.addEventListener('click', () => {
    instructionsScreen.style.visibility = 'hidden';
    startGame();
});

// Para mostrar a tela de instruções ao carregar a página
window.addEventListener('load', () => {
    instructionsScreen.style.visibility = 'visible';
});

function startGame() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('flipped');
    });

    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove('flipped');
            card.addEventListener('click', flipCard);
        });
    }, 3000);
}

document.querySelectorAll('.restart-game-btn').forEach(button => {
    button.addEventListener('click', function() {
        console.log('Botão recarregar jogo clicado!');

        // Limpar todas as cartas viradas
        const flippedCards = document.querySelectorAll('.card.flipped');
        flippedCards.forEach(card => card.classList.remove('flipped'));

        // Habilitar o tabuleiro
        lockBoard = false;

        // Selecionar novas imagens aleatórias
        const newSelectedImages = getRandomImages(allImages, 8);
        let cards = newSelectedImages.flatMap(img => [{ id: img, img }, { id: img, img }]);

        // Embaralhar as cartas novamente
        const shuffledCards = shuffleArray(cards);

        const gameBoard = document.querySelector('.game-board');
        gameBoard.innerHTML = ''; // Limpar o tabuleiro
        shuffledCards.forEach((card) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.cardId = card.id;

            const frontFace = document.createElement('div');
            frontFace.classList.add('front-face');
            frontFace.style.backgroundImage = `url(${card.img})`;

            const backFace = document.createElement('div');
            backFace.classList.add('back-face');

            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);
            gameBoard.appendChild(cardElement);
        });

        // Reiniciar o jogo
        startGame();
    });
});

function showGameOverScreen() {
    document.querySelector('.game-over-screen').style.visibility = 'visible';
    var gameOverMusic = document.getElementById('game-over-music');
    gameOverMusic.play();
}

function restartGame() {
    // Lógica para reiniciar o jogo
    var gameOverMusic = document.getElementById('game-over-music');
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;

    // Ocultar a tela de fim de jogo
    const gameOverScreen = document.querySelector('.game-over-screen');
    gameOverScreen.style.visibility = 'hidden';
}

document.querySelectorAll('.restart-game-btn').forEach(button => {
    button.addEventListener('click', restartGame);
});