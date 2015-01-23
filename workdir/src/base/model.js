var _ = require('lodash');

function Model(defaults) {
    this.data = defaults || {};
    this._callbacks = [];
}

Model.prototype = {
    get: function() {
        return this.data;
    },
    set: function(key, val) {
        this.data[key] = val;

        //trigger all onChange callbacks
        this._callbacks.forEach(function(callback) {
            //trigger the callbacks with the model as the context
            callback.call(this);
        }, this);
    },
    onChange: function(func) {
        this._callbacks.push(func);
    }
};

Model.extend = require('../util/extend');

module.exports = Model;
