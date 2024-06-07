const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledCards = shuffleArray(cards);
console.log(shuffledCards); // Imprimindo o array embaralhado

const gameBoard = document.querySelector('.game-board');
gameBoard.style.display = 'grid';

shuffledCards.forEach((cardNumber) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.cardNumber = cardNumber;
    gameBoard.appendChild(card);
});

let flippedCard = null;

function flipCard() {
    if (this === flippedCard) return;

    this.classList.toggle('flipped');

    if (!flippedCard) {
        flippedCard = this;
        return;
    }

    if (flippedCard.dataset.cardNumber === this.dataset.cardNumber) {
        // Cartas correspondentes, não faça nada
        flippedCard = null;
    } else {
        // Cartas não correspondentes, volte-as
        setTimeout(() => {
            flippedCard.classList.remove('flipped');
            this.classList.remove('flipped');
            flippedCard = null;
        }, 1000);
    }
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