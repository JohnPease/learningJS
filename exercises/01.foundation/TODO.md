Laying out the foundation
=========================

In this exercise we're going to lay the foundation for the rest of the
application.  Even though we aren't going to be using all the best practices up
front, we're going to try and nail down the markup to avoid breaking changes.

1. To start, open index.html and add in an element to serve as the main entry
   point into the application.  This is not strictly necessary as the `<body>`
   tag could serve this purpose, however, since we want our application to be
   future-proof and portable, a separate entry point is a good discipline.  We
   also have our script tags within `<body>` so it's useful to have our
   application entrypoint encapsulated.  To ensure our application picks up the
   right element, ensure you add the attribute and value combination
   `role="main"`.

   Inspect the src/app.js file and you'll notice there is a reference to the
   jQuery selection for `[role='main']`.  Log this value out to the console and
   inspect that the length is `1`.

2. Once we have an element to inject our application contents, think about the
   mockup, and insert two elements that have classes `left` and `right`.
   There are existing styles that will pick up these elements.  You'll know if
   you are correct by seeing two shades of blue.

3. We now have two columns to inject our application contents into.  In the
   left column insert a file upload input type.  Search MDN to find the correct
   element and attributes if you are not sure offhand which to use.  You'll
   know you have the correct element when the background shows up as white
   around the input control.

4. In the right hand column, add in a table element.  This table element should
   include a header and body.  Again, refer to MDN if you are confused on how
   this should look.  The header should contain two columns `Key` and `Value`.
   The body should contain a row spanning two columns.  Look up `colspan` usage
   to get this correct.  The content should read something like "No images
   selected".

You should now have a nice looking frontend interface that is completely non-
functional.  This is okay, we'll start hooking into it with the next exercise.
