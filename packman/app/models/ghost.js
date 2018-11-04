import Ember from 'ember';
import SharedStuff from '../mixins/shared-stuff';
import Movement from '../mixins/movement';

export default Ember.Object.extend(SharedStuff, Movement, {
    removed: Ember.computed.gt('retreatTime', 0),
    retreatTime: 0,
    maxRetreatTime: 500,
    timers: ['retreatTime'],
    framesPerMovement: 25,
    color: Ember.computed('retreatTime', function () {
        let timerPercentage = this.get('retreatTime') / this.get('maxRetreatTime');
        let retreated = { r: 0, g: 0, b: 0 };
        let normal = { r: 100, g: 40, b: 40 };
        let [r, g, b] = ['r', 'g', 'b'].map((rgbSelector) => {
            let color = retreated[rgbSelector] * timerPercentage +
                normal[rgbSelector] * (1 - timerPercentage);
            return Math.round(color);
        })
        return `rgb(${r}%, ${g}%, ${b}%)`;
    }),

    retreat() {
        this.set('retreatTime', this.get('maxRetreatTime'));
        this.set('frameCycle', 0);
        this.set('x', this.get('level.ghostRetreat.x'));
        this.set('y', this.get('level.ghostRetreat.y'));
        if (this.get('retreatTime') === 0) {
            this.set('removed', false);
        }
    },

    init() {
        this.set('startingX', this.get('x'));
        this.set('startingY', this.get('y'));
        this.set('source'), this.get('s');
        return this._super(...arguments);
    },

    restart() {
        this.set('x', this.get('startingX'));
        this.set('y', this.get('startingY'));
        this.set('frameCycle', 0);
        this.set('direction', 'stopped');
    },

    draw() {
        let x = this.get('x');
        let y = this.get('y');
        let imageSource = this.get('imageSource');
        let imagePelletSource = this.get('imagePelletSource');
        let radiusDivisor = 2;
        this.drawGhost(x, y, radiusDivisor, this.get('direction'), this.get('color'), this.get('framesPerMovement'), imageSource, imagePelletSource);
    },

    changeDirection() {
        let directions = ['left', 'right', 'up', 'down'];
        let directionWeights = directions.map((direction) => {
            return this.chanceOfPacmanIfInDirection(direction);
        })
        let bestDirection = this.getRandomItem(directions, directionWeights);
        this.set('direction', bestDirection);
    },

    chanceOfPacmanIfInDirection(direction) {
        if (this.pathBlockedInDirection(direction)) {
            return 0;
        } else {
            let desirabilityOfDirection = ((this.get('pac.y') - this.get('y')) * this.get(`directions.${direction}.y`)) +
                ((this.get('pac.x') - this.get('x')) * this.get(`directions.${direction}.x`));

            if (this.get('pac.powerMode')) {
                desirabilityOfDirection *= -1;
            }

            return Math.max(desirabilityOfDirection, 0) + .2;
        }
    },

    getRandomItem(list, weight) {
        const total_weight = weight.reduce((prev, cur) => {
            return prev + cur;
        });

        const random_num = Math.random() * total_weight;
        let weight_sum = 0;

        for (let i = 0; i < list.length; i++) {
            weight_sum += weight[i];
            weight_sum = Number(weight_sum.toFixed(2));

            if (random_num < weight_sum) {
                return list[i];
            }
        }
    },
})
