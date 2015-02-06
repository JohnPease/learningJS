var _ = require('lodash');

function Controller(model) {
    this.model = model;
}

Controller.prototype = {
    bindEvents: function($el) {
		
		var controller = this;

        _.each(this.events, function(func, eventSelector) {
            var parts = eventSelector.split(' ');
            var event = parts[0];
            var selector = parts[1];

            $el.on(event, selector, _.bind(controller[func], controller));
        });
    }
};

Controller.extend = require('../util/extend');

module.exports = Controller;
