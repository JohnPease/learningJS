var PhotoModel = require('./models/photo');
var FormView = require('./views/form');
var TableView = require('./views/table');

var $ = require('jquery');

var applicationElement = $('[role=main]');

var photoModel = new PhotoModel({ exif : null, src : '' });

var formView = new FormView(applicationElement.find('form'), photoModel);
var tableView = new TableView(applicationElement.find('table'), photoModel);

formView.render({ src : '' });
tableView.render({ exif : null });
