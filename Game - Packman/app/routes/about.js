import Ember from 'ember';

export default Ember.Route.extend({
    activate: function () {
        Ember.$('.exit-link').removeClass("invisible");
    },
});
