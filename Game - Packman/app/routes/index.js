import Ember from 'ember';

export default Ember.Route.extend({
    templateName: 'start',
    beforeModel() {
        this._super(...arguments);
        this.replaceWith('application');
    },
    activate: function () {
        Ember.$('body').toggleClass("start-screen");
    },
    deactivate: function () {
        Ember.$('body').toggleClass("start-screen");
    }
});
