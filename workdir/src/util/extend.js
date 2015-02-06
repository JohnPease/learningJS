var _ = require('lodash');

module.exports = function(properties) {
    var BaseClass = this;

    function Surrogate() {
        BaseClass.apply(this, arguments);
        this.constructor();
    }

    Surrogate.prototype = _.create(BaseClass.prototype, properties);

    return Surrogate;
};
