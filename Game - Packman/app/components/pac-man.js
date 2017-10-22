import Ember from 'ember';
import SharedStuff from '../mixins/shared-stuff';
import Pac from '../models/pac';
import Level1 from '../models/level1';
import Level2 from '../models/level2';
import Level3 from '../models/level3';
import Level4 from '../models/level4';
import Level5 from '../models/level5';
import Level6 from '../models/level6';
import Level7 from '../models/level7';
import Ghost from '../models/ghost';
import keyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

export default Ember.Component.extend(keyboardShortcuts, SharedStuff, {
    gameStart: null,
    gameOver: null,
    actions: {
        startGame: function (event) {
            if (this.gameStart == null || this.gameStart == false) {
                this.set('gameStart', true);
                this.set('gameOver', false);
                this.didInsertElement();
            }
        },
        exitGame: function () {
            this.didInsertElement(false);
        }
    },

    changeGameOverRoute() {
        this.sendAction('endGame');
    },

    didInsertElement() {
        this.set('gameStart', true);
        Ember.$('.exit-link').addClass("invisible");

        if (arguments[0] === false) {
            this.set('gameStart', arguments[0]);
            this.changeGameOverRoute();
        }

        if (this.gameStart) {
            this.startNewLevel();
            this.loop();
        } else {
            return false;
        }
    },

    levelNumber: 1,
    score: 0,
    lives: 5,
    levels: [Level1, Level2, Level3, Level4, Level5, Level6, Level7],
    livesIcons: null,
    keyboardShortcuts: {
        up() {
            this.set('pac.intent', 'up');
            return false;
        },
        down() {
            this.set('pac.intent', 'down');
            return false;
        },
        left() {
            this.set('pac.intent', 'left');
            return false;
        },
        right() {
            this.set('pac.intent', 'right');
            return false;
        }
    },

    loadNewLevel() {
        let levelIndex = (this.get('levelNumber') - 1) % this.get('levels.length');
        let levelClass = this.get('levels')[levelIndex];
        return levelClass.create();
    },

    recountLives() {
        let livesNumber = [];

        for (let i = 0; i < this.lives; i++) {
            livesNumber.push(i);
        }

        this.set('livesIcons', livesNumber);
    },

    startNewLevel() {
        this.recountLives();
        if (this.gameStart) {
            let level = this.loadNewLevel();
            level.restart();
            if (window.endLevelsAudio) {
                window.endLevelsAudio.pause();
            }

            let pac = Pac.create({
                level: level,
                x: level.get('startingPac.x'),
                y: level.get('startingPac.y')
            });
            this.set('level', level);
            this.set('pac', pac);
            let ghosts = level.get('startingGhost').map((startingPosition) => {
                return Ghost.create({
                    level: level,
                    pac: pac,
                    x: startingPosition.x,
                    y: startingPosition.y,
                    imageSource: startingPosition.imageSource,
                    imagePelletSource: startingPosition.imagePelletSource
                })
            });
            this.set('ghosts', ghosts);
        }
        if (this.gameOver) {
            return false;
        }
    },

    loop() {
        this.get('levelNumber');
        this.get('pac').move();
        this.get('ghosts').forEach(ghost => ghost.move());
        this.processAnyPellets();
        this.clearScreen();
        this.drawGrid();
        this.get('pac').draw();
        this.get('ghosts').forEach(ghost => ghost.draw());

        let ghostCollisions = this.detectGhostCollisions();

        if (ghostCollisions.length > 0) {
            if (this.get('pac.powerMode')) {
                ghostCollisions.forEach(ghost => ghost.retreat());
            } else {
                this.decrementProperty('lives');
                this.recountLives();
                if (this.get('lives') > 0) {
                    this.restart();
                    if (!window.collisionAudio) {
                        window.collisionAudio = new Audio("assets/audio/collision.mp3");
                    }
                    window.collisionAudio.play();
                } else {
                    if (!window.lesionAudio) {
                        window.lesionAudio = new Audio("assets/audio/lesion.mp3");
                    }
                    window.lesionAudio.play();
                    this.set('score', 0);
                    this.set('lives', 5);
                    this.set('levelNumber', 1);
                    this.set('gameStart', false);
                    this.set('gameOver', true);
                    this.changeGameOverRoute();
                    return false;
                }
            }
        }
        Ember.run.later(this, this.loop, 1000 / 60);
    },

    drawGrid() {
        let grid = this.get('level.grid');
        grid.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {

                if (cell === 1) {
                    this.drawWall(columnIndex, rowIndex);
                }
                if (cell === 2) {
                    this.drawPellet(columnIndex, rowIndex);
                }
                if (cell === 3) {
                    this.drawPowerPellet(columnIndex, rowIndex);
                }
            })
        })
    },

    drawWall(x, y) {
        let squareSize = this.get('level.squareSize');
        let ctx = this.get('ctx');

        ctx.fillStyle = '#000';
        ctx.fillRect(x * squareSize,
            y * squareSize,
            squareSize,
            squareSize);
    },

    drawPellet(x, y) {
        let radiusDivisor = 6;
        this.drawCircle(x, y, radiusDivisor * 2, 'stopped', '#fff');
    },

    drawPowerPellet(x, y) {
        let radiusDivisor = 4;
        this.drawCircle(x, y, radiusDivisor, 'stopped', 'green');
    },

    clearScreen() {
        let ctx = this.get('ctx');
        ctx.clearRect(0, 0, this.get('level.pixelWidth'), this.get('level.pixelHeight'));
    },

    restart() {
        if (this.get('lives') <= 0) {
            if (!window.lesionAudio) {
                window.lesionAudio = new Audio("assets/audio/lesion.mp3");
            }
            window.lesionAudio.play();
            this.set('score', 0);
            this.set('lives', 5);
            this.set('levelNumber', 1);
            this.startNewLevel();
        }
        this.get('pac').restart();
        this.get('ghosts').forEach(ghost => ghost.restart());
    },

    processAnyPellets() {
        let x = this.get('pac.x');
        let y = this.get('pac.y');
        let grid = this.get('level.grid');
        if (grid[y][x] === 2) {
            grid[y][x] = 0;
            if (!window.snapAudio) {
                window.snapAudio = new Audio("assets/audio/snap.mp3");
            }
            window.snapAudio.play();
            this.incrementProperty('score');

            if (this.get('level').isComplete()) {
                this.incrementProperty('levelNumber');
                if (!window.winLevelAudio) {
                    window.winLevelAudio = new Audio("assets/audio/winLevel.mp3");
                }
                window.winLevelAudio.play();
                this.startNewLevel();
            }

        } else if (grid[y][x] === 3) {
            grid[y][x] = 0;
            if (!window.powerAudio) {
                window.powerAudio = new Audio("assets/audio/power.mp3");
            }
            window.powerAudio.play();
            this.set('pac.powerModeTime', this.get('pac.maxPowerModeTime'));
        }
    },

    detectGhostCollisions() {
        return this.get('ghosts').filter((ghost) => {
            return ghost.get('x') == this.get('pac.x') &&
                ghost.get('y') == this.get('pac.y')
        })
    },
});
