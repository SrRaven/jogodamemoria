let flippedCard = null;

function flipCard() {
    if (this === flippedCard) return;

    this.classList.add('flipped');

    if (!flippedCard) {
        flippedCard = this;
        return;
    }

    if (flippedCard.dataset.cardNumber === this.dataset.cardNumber) {
        // Cartas correspondentes, não faça nada
    } else {
        // Cartas não correspondentes, volte-as
        setTimeout(() => {
            flippedCard.classList.remove('flipped');
            this.classList.remove('flipped');
            flippedCard = null;
        }, 1000);
    }
}