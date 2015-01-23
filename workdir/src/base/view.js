var _ = require('lodash');
var $ = require('jquery');

function View($el, model) {
    this.$el = $el;
    this.model = model;
}

View.prototype = {
    $el: $('<div/>'),

    template: function() {
        console.error('no template found');

        return this;
    },

    render: function(data) {
        this.$el.html(this.template(data));

        return this; //useful for chaining
    }
};

View.extend = require('../util/extend');

module.exports = View;
