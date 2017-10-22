import Ember from 'ember';

export default Ember.Object.extend({
    path: '/assets/graphic-models/',
    images: ['ghost-01.svg',
        'ghost-02.svg',
        'ghost-03.svg',
        'packmam-right.svg',
        'packmam-left.svg',
        'packmam-up-left.svg',
        'packmam-down-left.svg',
        'packmam-up-right.svg',
        'packmam-down-right.svg'
    ],

    imagesCollection: null,

    preload: function() {
        let loadedImages = [];

        for (let i = 0; i < this.images.length; i++) {
            let currentImage = new Image();
            currentImage.src = this.path + this.images[i];
            loadedImages.push(currentImage);
        }

        this.set('imagesCollection', loadedImages);
        return this.get('imagesCollection');
    }
})
