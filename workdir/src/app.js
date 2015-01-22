(function() {

  var applicationElement = $('[role=main]');
  console.log(applicationElement);

  var inputElement = applicationElement.find('input[type=file]');
  console.log(inputElement);

  var formTemplate = _.template($('#form-template').html());
  var tableTemplate = _.template($('#table-template').html());

  //can also do: inputElement.on('change', function(event) {...})
  applicationElement.on('change', 'input[type=file]', function(event) {
     console.log('event: ', event);
     var file = event.target.files[0];

     //if dialog is canceled
     if (!file) {
         return;
     }

     //set table contents
     readFile(file, function cont(arrayBuffer) {
         var exif = parseExif(arrayBuffer);
         //console.log('exif: ', exif);

         renderTable({ exif : exif.tags });
     });

     //set image preview
     readFile(file, function(dataURI) {
        //var imgElement = applicationElement.find('.preview');
        //imgElement.attr('src', dataURI);

        renderForm({ 'src' : dataURI});

     }, true);
  });

  function readFile(file, callback, toDataURI) {
      console.log('arguments: ', arguments);

      var fileReader = new FileReader();

      //allows the reading to be done in the 'background'
      fileReader.onload = function(e) {
          var arrayBuffer = e.target.result; //can also do fileReader.result
          callback(arrayBuffer);
      }

      if (toDataURI) {
          fileReader.readAsDataURL(file);
      } else {
          fileReader.readAsArrayBuffer(file);
      }
  }

  function parseExif(arrayBuffer) {
      var parser = ExifParser.create(arrayBuffer);
      return parser.parse();
  }

  function renderTable(data) {
    applicationElement.find('table').html(tableTemplate(data));
  }

  function renderForm(data) {
      applicationElement.find('form').html(formTemplate(data));
  }

  renderForm({ src : '' });
  renderTable({ exif : null });

})();
