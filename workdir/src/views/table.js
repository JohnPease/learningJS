var $ = require('jquery');
var _ = require('lodash');
var View = require('../base/view');

var TableView = View.extend({
    template: require('../templates/table.html'),
    constructor: function() {
        var view = this;
        this.model.onChange(function() {
            //'this' is the model
            view.render(this.get());
        });
    }
})

module.exports = TableView;
