//import Level from './level';

export default LevelClass.extend({
    path: '/CrazyDolphinTeam-game-team/assets/graphic-models/',
    images: ['ghost-01.svg',
        'ghost-02.svg',
        'ghost-03.svg',
        'pacman-right.svg',
        'pacman-left.svg',
        'pacman-up-left.svg',
        'pacman-down-left.svg',
        'pacman-up-right.svg',
        'pacman-down-right.svg'
    ],

    imagesCollection: null,

    preload: function () {
        let loadedImages = {};

        for (let i = 0; i < this.images.length; i++) {
            let currentImage = new Image();
            currentImage.src = this.path + this.images[i];
            let imageName = this.images[i] + '';
            loadedImages[imageName.slice(0, -4)] = currentImage;
        }

        this.set('imagesCollection', loadedImages);
    }

})
