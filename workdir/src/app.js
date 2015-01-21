(function() {

  var applicationElement = $('[role=main]');
  console.log(applicationElement);

  var inputElement = applicationElement.find('input[type=file]');
  console.log(inputElement);

  //can also do: inputElement.on('change', function(event) {...})
  inputElement.bind('change', function(event) {
     console.log('event: ', event);
     var file = event.target.files[0];

     //if dialog is canceled
     if (!file) {
         return;
     }

     //set table contents
     readFile(file, function cont(arrayBuffer) {
         var exif = parseExif(arrayBuffer);
         console.log('exif: ', exif);

         renderTable(exif);
     });

     //set image preview
     readFile(file, function(imgSrc) {
        var imgElement = applicationElement.find('.preview');
        imgElement.attr('src', imgSrc);

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
      return parser.parse().tags;
  }

  function renderTable(exif) {
      var tbodyElement = $('<tbody>');

      if (Object.keys(exif).length === 0) {
          $('<tr><td colspan=2>No exif data found</td></tr>').appendTo(tbodyElement);
      } else {

          for (var key in exif) {
              if (!exif.hasOwnProperty(key)) {
                  continue;
              }
              var data = exif[key];

              $('<tr>').appendTo(tbodyElement);
              $('<td>' + key + '</td>').appendTo(tbodyElement);
              $('<td>' + data + '</td>').appendTo(tbodyElement);
              $('</tr>').appendTo(tbodyElement);
          }
      }

      $('</tbody>').appendTo(tbodyElement);
      $('tbody').replaceWith(tbodyElement);
  }

})();
