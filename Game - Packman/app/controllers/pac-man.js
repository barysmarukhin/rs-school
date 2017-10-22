import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    gameOver() {
      this.transitionToRoute('game-over');
    }
  }
});
