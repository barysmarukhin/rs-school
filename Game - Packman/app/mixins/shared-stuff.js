import Ember from 'ember';

export default Ember.Mixin.create({
    frameCycle: 1,
    framesPerMovement: 25,
    ctx: Ember.computed(function () {
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext("2d");
        return ctx;
    }),

    drawCircle(x, y, radiusDivisor, direction, color = '#000', framesPerMovement = 30) {
        let ctx = this.get('ctx');
        ctx.fillStyle = color;

        let squareSize = this.get('level.squareSize');

        let pixelX = (x + 1 / 2 + this.offsetFor('x', direction, framesPerMovement)) * squareSize;
        let pixelY = (y + 1 / 2 + this.offsetFor('y', direction, framesPerMovement)) * squareSize;

        ctx.beginPath();
        ctx.arc(pixelX, pixelY, squareSize / radiusDivisor, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    },

    movesCache: null,

    drawPacman(x, y, radiusDivisor, direction, color = '#000', framesPerMovement = 30) {
        let ctx = this.get('ctx');
        let squareSize = this.get('level.squareSize');
        let pixelX = (x + this.offsetFor('x', direction, framesPerMovement)) * squareSize;
        let pixelY = (y + this.offsetFor('y', direction, framesPerMovement)) * squareSize;
        let pacmanImage = new Image();

        if (direction == 'stopped') {
            if (this.get('movesCache') === null) {
                pacmanImage.src = "/CrazyDolphinTeam-game-team/assets/graphic-models/pacman-right.svg";
            } else {
                pacmanImage.src = this.get('movesCache');
            }
        }

        if (direction == 'right') {
            pacmanImage.src = "/CrazyDolphinTeam-game-team/assets/graphic-models/pacman-right.svg";
            this.set('movesCache', pacmanImage.src);
        }

        if (direction == 'left') {
            pacmanImage.src = "/CrazyDolphinTeam-game-team/assets/graphic-models/pacman-left.svg";
            this.set('movesCache', pacmanImage.src);
        }

        if (direction == 'down') {
            pacmanImage.src = "/CrazyDolphinTeam-game-team/assets/graphic-models/pacman-down-right.svg";
            this.set('movesCache', pacmanImage.src);
        }

        if (direction == 'up') {
            pacmanImage.src = "/CrazyDolphinTeam-game-team/assets/graphic-models/pacman-up-left.svg";
            this.set('movesCache', pacmanImage.src);
        }

        pacmanImage.onload = function () {
            ctx.drawImage(pacmanImage, pixelX, pixelY);
        };
        ctx.drawImage(pacmanImage, pixelX, pixelY);
    },

    drawGhost(x, y, radiusDivisor, direction, color = '#000', framesPerMovement, imageSource, imagePelletSource) {
        let ctx = this.get('ctx');
        let squareSize = this.get('level.squareSize');
        let pixelX = (x + this.offsetFor('x', direction, framesPerMovement)) * squareSize;
        let pixelY = (y + this.offsetFor('y', direction, framesPerMovement)) * squareSize;
        let ghostImage = new Image();
        let pacmanPowerMode = this.get('pac.powerMode');

        if (pacmanPowerMode) {
            ghostImage.src = imagePelletSource;
            ghostImage.onload = function () {
                ctx.drawImage(ghostImage, pixelX, pixelY);
            };
            ctx.drawImage(ghostImage, pixelX, pixelY);

        } else {
            ghostImage.src = imageSource;
            ghostImage.onload = function () {
                ctx.drawImage(ghostImage, pixelX, pixelY);
            };
            ctx.drawImage(ghostImage, pixelX, pixelY);
        }

    },

    offsetFor(coordinate, direction, framesPerMovement) {
        let frameRatio = this.get('frameCycle') / framesPerMovement;
        return this.get(`directions.${direction}.${coordinate}`) * frameRatio;
    },

    directions: {
        'up': { x: 0, y: -1 },
        'down': { x: 0, y: 1 },
        'left': { x: -1, y: 0 },
        'right': { x: 1, y: 0 },
        'stopped': { x: 0, y: 0 }
    },
})
