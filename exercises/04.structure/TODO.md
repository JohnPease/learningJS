Providing some structure
========================

Currently we're writing the entire application in a single file and not really
taking advantage of many best practices learned in the JS landscape.  This
exercise will bring in LoDash to utilize templates and some functional
goodness.

1. Look in the vendor folder and include the copy of LoDash in the markup.

2. Since we're not using a web server, we cannot load remote resources, this
   means if we want to write a template for our two Views (form and table)
   we'll need to do some trickery.

   We've seen script tags loading JavaScript, but we can modify them to not
   execute anything, and provide a useful way to write reusable templates.

   Create two script tags with ids corresponding to the form and table.  Maybe
   something like `id="form-template"` and `id="table-template"`.  Set the type
   of each of them to anything other than "javascript".  A good idea might be a
   word that indicatees what they are, "text/template" or just "template" will
   work fine.

   Since we've changed the type of the script to non-code, we'll be able to put
   text in here without worrying about the browser trying to execute it.

3. Extract the markup from the `<form>` into the form template script tag.  Do
   the same with the `<table>` element.  Keep the form and the table elements
   in their respective parts of the page to serve as placeholders.  Take only
   the inside contents and move those.

4. Now that we have two templates, we can take advantage of LoDash's template
   syntax and make our View's more intelligent.
   
   - Make the form-template image src point to a `<%= src %>` property.
   - Add in a loop for the table template to render the `<%= name %>` and `<%=
     value %>` values from the `exif` object we'll be passing in later.
   - Use an if statement in the template to add the "No exif data found"
     message we were setting from code earlier.  If no `exif` exists at all,
     show the existing "No image selected" TableCell (td).

     *Hint* Using an `else if` statement will make this a lot easier to figure
     out.

   If you get stuck please ask us for help, this can be tricky to debug later,
   since these templates are converted to JavaScript functions by LoDash.

5. Okay so we've done some blind coding with these templates, and we want to
   actually use them.  Lets do that before creating the View base class.

   Inside our src/app.js file, lets add at the top references to our new
   templates and compile them with LoDash.  The code for one template might
   look something like: 

   ```
   var someTemplate = _.template($("#some-template").text());
   ```

   Don't be too clever, but create the two templates and assign them to
   variables.

6. Okay so I lied in the previous step, we aren't ready to use them just yet,
   first we'll need to create a matching render method for the form template.
   Add a function named `renderForm`, which we'll call whenever we want to
   update our form.  This function should accept a data object, just like
   `renderTable` does.

   Now figure out a way to set the form element's HTML to the template's
   contents (along with the passed data object).  While we discussed the 
   template function we showed a simple render, so this shouldn't be so bad to
   implement.

   Call this function at the bottom of our IIFE in the source.  Pass it an
   object with `src: ''` for now (we don't have an image source yet).

   Refresh the page, see the form? Good, you rock! No? You still rock, just
   not as hard as say, Led Zeppelin.  Try and figure out what's wrong, call one
   of us over to jam with you, if you need some help.

7. Try and implement the `renderTable` function using our new template.  The
   object you pass to the `tableTemplate` will need a key of `exif` and the
   value should be the passed data object, or `null`. 

   Call `renderTable` after `renderForm`, but do not pass it an empty object.
   The object will only be passed once there is actual data.  This is how
   the table will know to show the "No image selected" text.

8. If you've refreshed and tried uploading an image and found it's broken, do
   not fret, it's us not you.  We've forgotten that since the elements don't
   exist until we render the templates, we cannot cache the lookups at the top
   of our source code.  This is where event delegation will make sense, until
   we make an encapsulated/intelligent View.

   So where we have `inputElement.on` we'll need to change to
   `applicationElement.on` something... try and figure this part out, it was
   discussed in the previous day.  If you're stuck, check out the jQuery
   documentation.

9. Finally we'll need to ensure our trusty preview works, so where we call
   `readFile` to get a dataURI, change the logic to re-render the form, only
   this time pass `src: dataURI`.

Try out the new code and admire how much nicer this is.  Our code should be
looking much cleaner.  Now on to making it even more perfect.
