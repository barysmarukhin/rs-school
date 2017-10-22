import LevelClass from './levelClass';

export default LevelClass.extend({
    layout: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1],
        [1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 1],
        [1, 3, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1],
        [1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    squareSize: 60,
    startingPac: {
        x: 4,
        y: 6
    },
    startingGhost: [
        {
            x: 3,
            y: 2,
            imageSource: 'assets/graphic-models/ghost-02.svg',
            imagePelletSource: 'assets/graphic-models/ghost-pellet.svg'
        },
        {
            x: 8,
            y: 7,
            imageSource: 'assets/graphic-models/ghost-03.svg',
            imagePelletSource: 'assets/graphic-models/ghost-pellet.svg'
        }
    ],
    ghostRetreat: {
        x: 5,
        y: 5
    },
    restart() {
        const newGrid = jQuery.extend(true, [], this.get('layout'));
        this.set('grid', newGrid);
    }
})
