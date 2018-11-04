import LevelClass from './levelClass';

export default LevelClass.extend({
    layout: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
        [1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 1],
        [1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1],
        [1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1],
        [1, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1],
        [1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 3, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

    ],
    squareSize: 60,
    startingPac: {
        x: 7,
        y: 4
    },
    startingGhost: [
        {
            x: 2,
            y: 6,
            imageSource: 'assets/graphic-models/ghost-01.svg',
            imagePelletSource: 'assets/graphic-models/ghost-pellet.svg'
        },
        {
            x: 4,
            y: 2,
            imageSource: 'assets/graphic-models/ghost-02.svg',
            imagePelletSource: 'assets/graphic-models/ghost-pellet.svg'
        }
    ],
    ghostRetreat: {
        x: 3,
        y: 3
    },
    teleport: false,
    restart() {
        const newGrid = jQuery.extend(true, [], this.get('layout'));
        this.set('grid', newGrid);
    }

})
