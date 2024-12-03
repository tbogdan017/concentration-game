const container = document.querySelector('.container');

const upperPanel = document.createElement('div');
upperPanel.classList = 'upper__panel';

const upperMoves = document.createElement('span');
upperMoves.classList = 'upper-text__moves';
upperMoves.textContent = 'Moves: 0';

const upperTime = document.createElement('span');
upperTime.classList = 'upper-text__timer';
upperTime.textContent = 'Time: '

const minutes = document.createElement('span');
minutes.textContent = '0:'
const seconds = document.createElement('span');
seconds.textContent = '00'

upperTime.appendChild(minutes);
upperTime.appendChild(seconds);

const upperLives = document.createElement('span');
upperLives.classList = 'upper-text__lives';
let lives = 6;
upperLives.textContent = `Lives: ${lives}`;

const upperButton = document.createElement('button');
upperButton.classList = 'upper__panel-btn';
upperButton.textContent = 'Restart';

const wrapper = document.createElement('div');
wrapper.classList = 'wrapper';

const cardContainer = document.createElement('div');
cardContainer.classList = 'card__container';

const alertBox = document.getElementById('alertBox');
// alertBox.textContent = "You've lost :("
let alertText = document.createElement('p');
// alertText.textContent = "You've lost :("
let alertBoxBtn = document.createElement('button');
alertBoxBtn.classList = 'alertBtn';
alertBoxBtn.textContent = 'Try Again';
alertBox.appendChild(alertText);
alertBox.appendChild(alertBoxBtn);

container.appendChild(upperPanel);
container.appendChild(wrapper);
wrapper.appendChild(cardContainer);
upperPanel.appendChild(upperMoves);
upperPanel.appendChild(upperTime);
upperPanel.appendChild(upperLives);
upperPanel.appendChild(upperButton);

let cardsArray = [
    { value: 'panda', image: '/img/panda.svg' },
    { value: 'wolf', image: '/img/wolf.svg' },
    { value: 'bear', image: '/img/bear.svg' },
    { value: 'beaver', image: '/img/beaver.svg' },
    { value: 'capybara', image: '/img/capybara.svg' },
    { value: 'fox', image: '/img/fox.svg' },
    { value: 'lion', image: '/img/lion.svg' },
    { value: 'raccoon', image: '/img/raccoon.svg' },
    { value: 'panda', image: '/img/panda.svg' },
    { value: 'wolf', image: '/img/wolf.svg' },
    { value: 'bear', image: '/img/bear.svg' },
    { value: 'beaver', image: '/img/beaver.svg' },
    { value: 'capybara', image: '/img/capybara.svg' },
    { value: 'fox', image: '/img/fox.svg' },
    { value: 'lion', image: '/img/lion.svg' },
    { value: 'raccoon', image: '/img/raccoon.svg' }
];

const shuffleCards = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

shuffleCards(cardsArray);

const generateCards = () => {
    cardsArray.forEach(function (item) {
        const card = document.createElement('div');
        card.classList = 'card';
        card.setAttribute('value', item.value);
        cardContainer.appendChild(card);

        const front = document.createElement('img');
        front.classList = 'front';
        front.src = item.image;
        card.appendChild(front);

        const back = document.createElement('img');
        back.classList = 'back';
        back.setAttribute('src', '/img/question-mark.svg')
        card.appendChild(back);
    });
}

const firstFlip = () => {

    setTimeout(() => {
        let card = document.querySelectorAll('.card');
        card.forEach(item => {
            item.classList.toggle('toggledCard');
        })
    }, 2000)
    setTimeout(() => {
        let card = document.querySelectorAll('.card');
        card.forEach(item => {
            item.classList.toggle('toggledCard');
        })
    }, 50)
}

const toggleCards = () => {
    let card = document.querySelectorAll('.card');
    card.forEach((item) => {
        item.addEventListener('click', (e) => {
            item.classList.toggle('toggledCard');
            compareCards(e);
        })
    })
}

const compareCards = (e) => {
    let clicked = e.target;
    clicked.classList.add('flipped');
    let flipped = document.querySelectorAll('.flipped');
    let toggledCard = document.querySelectorAll('.toggledCard');

    if (flipped.length === 2) {
        if (flipped[0].getAttribute('value') === flipped[1].getAttribute('value')) {
            flipped.forEach((card) => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            });
        } else {
            flipped.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggledCard'), 999);
            });
            lives--;
            upperLives.textContent = `Lives: ${lives}`;
            if (lives === 0) {
                setTimeout(() => {
                    handleGameOver();
                }, 500)
            }
        }
    }
    if (toggledCard.length === 16) {
        alertText.textContent = "You Won!"
        alertBox.style.background = 'lightgreen'
        alertBox.style.display = 'block';

        alertBoxBtn.addEventListener('click', () => {
            location.reload();
        })
    }
}

const handleGameOver = () => {
    let card = document.querySelectorAll('.card');
    alertText.textContent = "You've lost :("
    alertBox.style.display = 'block';

    card.forEach((item) => {
        item.style.pointerEvents = 'none';
    })

    alertBoxBtn.addEventListener('click', () => {
        location.reload();
    })
}

const timeSetter = () => {
    let second = 0;

    function upTimer(count) {
        return count > 9 ? count : '0' + count;
    }
    let timer = setInterval((minUp, secUp) => {
        secUp = upTimer(second++ % 60);
        minUp = (parseInt(second / 61));

        seconds.innerHTML = secUp;
        minutes.innerHTML = minUp;

        upperTime.innerHTML = `Time: ${minUp}:${secUp}`;

        if (alertBox.style.display === 'block') {
            clearInterval(timer);
        }
    }, 1000);
}

const movesCounter = () => {
    let card = document.querySelectorAll('.card');
    let counter = 0;

    card.forEach((item) => {
        item.addEventListener('click', () => {
            counter++;
            if (counter % 2 === 0) {
                upperMoves.textContent = `Moves: ${counter / 2}`;
            }
            if (counter === 1) {
                timeSetter();
            }
        })
    })
}

const restart = () => {
    upperButton.addEventListener('click', () => {
        window.location.reload()
    })
}

generateCards();
firstFlip();
toggleCards();
movesCounter();
restart();








