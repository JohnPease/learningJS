var Controller = require('../base/controller');
var ExifParser = require('exif-parser');

var FormController = Controller.extend({
    constructor: function(model) {
        this.model = model;
    },
    events: {
        'change input[type=file]': function(event) {
            var file = event.target.files[0];

            //if dialog is canceled
            if (!file) {
                return;
            }

            //set table contents
            this.readFile(file, function cont(arrayBuffer) {
                var exif = this.parseExif(arrayBuffer);
                //tableView.render({ exif : exif.tags });
                this.model.set('exif', exif);
            });

            //set image preview
            this.readFile(file, function(dataURI) {
                //formView.render({ src : dataURI});
                this.model.set('src', dataURI);
            }, true);
        },

        readFile: function(file, callback, toDataURI) {
            var fileReader = new FileReader();
            var controller = this;

            //allows the reading to be done in the 'background'
            fileReader.onload = function(e) {
                var arrayBuffer = e.target.result; //can also do fileReader.result
                callback(controller, arrayBuffer);
            }

            if (toDataURI) {
                fileReader.readAsDataURL(file);
            } else {
                fileReader.readAsArrayBuffer(file);
            }
        },

        parseExif: function(arrayBuffer) {
            var parser = ExifParser.create(arrayBuffer);
            return parser.parse();
        }
    }
});

module.exports = FormController;
