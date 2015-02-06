var Controller = require('../base/controller');
var ExifParser = require('exif-parser');

var FormController = Controller.extend({
	events: {
		'change .upload': 'handleChange'
	},

	handleChange: function(event) {
        var file = event.target.files[0];

        //if dialog is canceled
        if (!file) {
            return;
        }

        //set table contents
        this.readFile(file, function cont(arrayBuffer) {
            var exif = this.parseExif(arrayBuffer);
            this.model.set('exif', exif);
        });

        //set image preview
        this.readFile(file, function cont(dataURI) {
            this.model.set('src', dataURI);
        }, true);
    },

    readFile: function(file, callback, useDataURI) {
        var fileReader = new FileReader();
        var controller = this;

        //allows the reading to be done in the 'background'
        fileReader.onload = function(e) {
            var arrayBuffer = e.target.result; //can also do fileReader.result
            callback.call(controller, arrayBuffer);
        };

        if (useDataURI) {
            fileReader.readAsDataURL(file);
        } else {
            fileReader.readAsArrayBuffer(file);
        }
    },

    parseExif: function(arrayBuffer) {
        var parser = ExifParser.create(arrayBuffer);
		var result = parser.parse();
        return result.tags;
    }
});

module.exports = FormController;
