import Ember from 'ember';

export default Ember.Object.extend({
    grid: [],
    width: Ember.computed(function() {
        return this.get('grid.firstObject.length');
    }),
    height: Ember.computed(function() {
        return this.get('grid.length')
    }),
    pixelWidth: Ember.computed(function() {
        return this.get('width') * this.get('squareSize');
    }),
    pixelHeight: Ember.computed(function() {
        return this.get('height') * this.get('squareSize');
    }),

    isComplete() {
        let hasPelletsLeft = false;
        let grid = this.get('grid');

        grid.forEach((row) => {
            row.forEach((cell) => {
            if (cell === 2) {
            hasPelletsLeft = true;
        }
    })
    })
        return !hasPelletsLeft;
    },

    restart() {
        let grid = this.get('grid');
        grid.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
            if(cell === 0) {
            grid[rowIndex][columnIndex] = 2;
        }
    })
    })
    },
})
