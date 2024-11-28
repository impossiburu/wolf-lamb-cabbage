class Actor
{
    name;
    position = 'left';

    constructor(name) {
        this.name = name;
    }

    getPos() {
        return this.position;
    }

    setPos(pos) {
        this.position = pos;
    }

    getName() {
        return this.name;
    }
}

class Board extends Actor
{
    actors = [];

    getIntoTheBoard(actor) {
        this.actors.push(actor);
    }

    getOutTheBoard() {
        this.actors.pop();
    }

    checkCountActors() {
        return this.actors.length > 0;
    }
}

const wolf = new Actor('wolf');
const lamb = new Actor('lamb');
const cabbage = new Actor('cabbage');
const board = new Board('board');

const actors = [wolf, lamb, cabbage];

draw();

const gameLoop = setInterval(() => {
    if (wolf.getPos() == 'right' && lamb.getPos() == 'right' && cabbage.getPos() == 'right') {
        alert('You win');
        clearInterval(gameLoop);
        window.location.reload();
    }
}, 24);

document.querySelector('.board').addEventListener('click', (e) => {
    if ( e.target != document.querySelector('.board') ) return false;
    if (checkFails()) { alert('You lose'); window.location.reload(); return false} ;

    if (board.getPos() == 'left') {
        board.setPos('right');
        document.querySelector('.board').classList.remove('board-initial');
        document.querySelector('.board').classList.add('board-final');
    } else {
        board.setPos('left');
        document.querySelector('.board').classList.remove('board-final');
        document.querySelector('.board').classList.add('board-initial')
    }
})

function draw() {
    actors.forEach(actor => {
        document.querySelector(`.${actor.getPos()}`)
            .appendChild(
                createActor(actor.getName())
            );
    });

}

function createActor(actor) {
    const actorItem = document.createElement('div');
    actorItem.className = actor;
    

    actorItem.addEventListener('click', () => {
        const current = actors.find(item => actor == item.getName());
        
        if (board.getPos() == current.getPos()) {
           
            if (board.checkCountActors()) return false;
            document.querySelector('.board').appendChild(document.querySelector(`.${current.getName()}`));
            current.setPos('board');
            board.getIntoTheBoard(current);
        } else  if (current.getPos() == 'board') {
            document.querySelector(`.${board.getPos()}`).appendChild(document.querySelector(`.${current.getName()}`));
            current.setPos(board.getPos());
            board.getOutTheBoard();
        }

    });
    return actorItem;
};

function checkFails() {
    return wolf.getPos() == lamb.getPos() || lamb.getPos() == cabbage.getPos();
}

