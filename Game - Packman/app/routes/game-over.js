import Ember from 'ember';

export default Ember.Route.extend({
     activate: function () {
        Ember.$('body').toggleClass("game-over-screen");
    },
    deactivate: function () {
        Ember.$('body').toggleClass("game-over-screen");
    }
});
