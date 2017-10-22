import LevelClass from './levelClass';

export default LevelClass.extend({
    layout: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
        [1, 2, 2, 3, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 2, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 3, 2, 2, 2, 1],
        [1, 2, 1, 1, 2, 2, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    squareSize: 60,
    startingPac: {
        x: 1,
        y: 6
    },
    startingGhost: [
        {
            x: 7,
            y: 1,
            imageSource: 'assets/graphic-models/ghost-01.svg',
            imagePelletSource: 'assets/graphic-models/ghost-pellet.svg'
        },
        {
            x: 1,
            y: 8,
            imageSource: 'assets/graphic-models/ghost-02.svg',
            imagePelletSource: 'assets/graphic-models/ghost-pellet.svg'
        },
        {
            x: 8,
            y: 3,
            imageSource: 'assets/graphic-models/ghost-03.svg',
            imagePelletSource: 'assets/graphic-models/ghost-pellet.svg'
        }
    ],
    ghostRetreat: {
        x: 9,
        y: 7
    },
    teleport: false,
    restart() {
        const newGrid = jQuery.extend(true, [], this.get('layout'));
        this.set('grid', newGrid);
    }
})

