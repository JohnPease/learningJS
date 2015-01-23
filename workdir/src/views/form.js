var _ = require('lodash');
var View = require('../base/view');
var $ = require('jquery');
var FormController = require('../controllers/form');

var FormView = View.extend({
    template: require('../templates/form.html'),
    constructor: function() {
        //Called whenever we call new FormView()
        var controller = new FormController();
        controller.bindEvents(this.$el);

        var view = this;
        this.model.onChange(function() {
            //'this' is the model
            view.render(this.get());
        });
    }
});

module.exports = FormView;
