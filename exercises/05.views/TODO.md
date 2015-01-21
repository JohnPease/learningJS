Writing a basic base View
=========================

In this exercise, we'll work on adding in a base view to emulate what you may
find in a framework like Ember or Backbone.

1. Create a folder named base inside your src folder and make a few file called
   view.js.  We'll be putting in our base constructor code here.  Don't forget
   to include this before app.js inside the index.html file.

2. Our Views require at a minimum:

   - A pointer to what element to render into and scope events to.
   - A function for fetching the template contents.
   - A function for rendering data in the template.

   Nice to have:

   - A function that scopes DOM lookups to the current View's element.
   - Shorthand for extending the prototype.

   We'll discuss and implement these methods together.

3. Now that we have a working View base class, lets implement our two Views.

   Inside the src folder, make a folder named views and a file for each view
   (form and table) where we'll store the definitions.  Don't forget to add
   these to the index.html after the base View file.

4. In each file extend the View and add a custom template lookup
    function that will take the template lookup logic that already
    exists from app.js and returns the function.  We can simply
    assign the `_.template` calls directory to the template.

5. Back inside the app.js file, at the very top, make instances of each View,
   ensuring that you pass in a jQuery object that refers to the given View.

   Call render on each one to do the initial page render.  Make sure you pass
   `{ exif: null }` to the table View so that it knows to render the correct
   text.

   We can safely delete the `renderForm` and `renderTable` functions and calls
   now from app.js.  In the case of `readFile` calls, we'll want to replace
   them with the equivalent renders with our new views.

   Once you've done this, refresh the page and check it out!

At this point everything should be working and we can move on to organizing our
code further with Controllers.
