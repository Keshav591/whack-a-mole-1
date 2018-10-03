import 'styles/index.scss';


class MoleWhacker5000 {
    /**
     * @param startButton - Element object representing the start button
     * @param stopButton - Element object representing the stop button
     * @param resetButton - Element object representing the reset button
     * @param moles - HTMLCollection of elements to target
     * @param scoreBoard - Element object representing the scoreBoard
     * @param status - Element object representing the status text container
     */
    constructor(startButton, stopButton, resetButton, moles, scoreBoard, status) {
        this.startButton = startButton;
        this.stopButton = stopButton;
        this.resetButton = resetButton;
        this.moles = [...moles];
        this.score = 0;
        this.scoreBoard = scoreBoard;
        this.status = status;
        this.gameRunning = false;
    }
    handleWhack(mole) {
        if (mole.classList.contains('active')) {
            mole.classList.add('whacked');
            // Keep the whacked mole visible for a second so we can bask in its glory
            // CSS rules on the whacked class will prevent extra points from accruing
            setTimeout(() => {
                mole.classList.remove('whacked', 'active');
            }, 1000);
            this.score ++;
            this.scoreBoard.textContent = this.score;
        }
    }
    setStatusText(text) {
        this.status.textContent = text;
    }
    start() {
        // Prevent users from clicking start multiple times
        if (this.gameRunning) { return; }
        this.gameRunning = true;

        // Taunt the player by showing all the moles before starting the game
        this.moles.forEach(mole => mole.classList.add('active', 'slow'));
        this.setStatusText('Ready...?');
        setTimeout(() => {
            this.setStatusText('Playing...');
            this.moles.forEach(mole => mole.classList.remove('active', 'slow'));
            this.toggleTimer = setInterval(this.toggleMole.bind(this), 800);
            // 30 second game time
            setTimeout(() => this.stop(), 30000);
        }, 2000);
    }
    stop() {
        this.gameRunning = false;
        clearInterval(this.toggleTimer);
        this.moles.forEach(mole => mole.classList.remove('active', 'whacked'));
        this.setStatusText('Game ended...');
    }
    toggleMole() {
        this.randomMole = this.moles[Math.floor(Math.random() * this.moles.length)];
        // Make sure we don't select the same mole again
        if (this.randomMole === this.previousMole) {
            return this.toggleMole();
        }
        this.randomMole.classList.add('active');
        setTimeout(() => {
            // we don't want to hide a 'whacked' mole just yet
            if (!this.randomMole.classList.contains('whacked')) {
                this.randomMole.classList.remove('active');
            }
        }, Math.round(Math.random() * 1000)); // vary the amount of time a mole is visible
        this.previousMole = this.randomMole;
    }
    init() {
        this.startButton.addEventListener('click', () => this.start());
        this.stopButton.addEventListener('click', () => this.stop());
        this.resetButton.addEventListener('click', () => {
            this.stop();
            this.score = 0;
            this.scoreBoard.textContent = this.score;
            this.setStatusText('Waiting for player...');
        });
        this.moles.forEach(mole => mole.addEventListener('click', this.handleWhack.bind(this, mole)));
    }
}

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const moles = document.getElementsByClassName('mole');
const scoreBoard = document.getElementById('score');
const status = document.getElementById('status');

const game = new MoleWhacker5000(startButton, stopButton, resetButton, moles, scoreBoard, status);

game.init();
