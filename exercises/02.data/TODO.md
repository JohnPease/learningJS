Accessing the image metadata
============================

In this exercise we'll handle an image being uploaded and dumping its metadata.

1. Inside the src/app.js file, under the `applicationElement` assignment,
   create a variable named `inputElement` and using the `applicationElement`
   selection, find the input element we created in the previous exercise.

   Log out this value to console to ensure that the code has found the right
   element.  You'll know by expanding the selection and seeing the element
   along with the `length` property equaling `1`.

2. Add a `change` event to this `inputElement` and log out the passed event
   object.  Try one of the sample images and nspect the output. Locate the
   target file returned.  Once you find this object, assign this to the
   variable `file`.

   Hint: MDN knows exactly where this property exists.

3. Once you have the file reference in hand, we can do interesting things with
   it locally.  Before we can read any information from it, we'll need a third-
   party library to parse out the EXIF data we're looking for.  Lucky for us
   some smart developer has written an open source module to do just this.
   You'll find it in the vendor directory.

   Add this script to the page before the jquery and app scripts.  Once you
   save and refresh, ensure its loaded correctly by logging out `ExifParser`.
   If this returns an object, you know it worked.

   You'll notice this object has a single method: `create`.  This is what we'll
   use to create a parser.

4. But before we can use this parser, we'll need to get the file into a form
   that the `create` method is expecting.  This is an `ArrayBuffer`.  The
   easiest way to do this, is to use the `FileReader` API.  Our code is
   starting to get a bit procedural, so let's function it up.

   Make a function called `readFile` that accepts a `file`.  Yup, the same file
   we found in the `change` event ;-) Since the `FileReader` API is
   asynchronous, we'll need to also pass a `callback` argument.  This is called
   continuation-passing style.

   Inside this function log out the arguments for debugging purposes.

5. Now that we have a not-so-useful, but existing, function lets call it from
   our event handler.  Pass it the file we found from the event object.  Also
   pass it our "continuing" function.  In this case it should be an anonymous
   inline-function.  What we're looking to get back from the callback is an
   `ArrayBuffer`, so add an argument to our callback function named
   `arrayBuffer`.  Notice it is camelcased to indicate that it is an instance.

6. Time to utilize the `FileReader` API.  It's slightly confusing, but not so
   bad.  We'll first create an instance of the API using the `new` keyword.
   Name this something like `fileReader`.  After this we'll listen to an event
   `onload`.  This can be set directly or using `addEventListener`.  You can
   also wrap the fileReader in jQuery and use `on`.  This will return an
   `event` object that we can use to find the result we're looking for.

   After you have created this event, log out the event object in the load
   function.

   Lastly, call `fileReader.readAsArrayBuffer`, passing in our file object.
   This will parse the file and convert it to an `ArrayBuffer`.

7. Upload an image and test out the code to see the event object logged out.
   Inspect this object and look for the target result.  It should be an
   ArrayBuffer.  Once you find it, call the passed `callback` function with
   this value.  Our code inside the `change` event handler will now have access
   to the buffer.

   Log this value out in the `readFile` callback.  If you get stuck here, flag
   one of us down and we'll help you debug.

8. Now that all the hard stuff is done, lets get back to `ExifParser`! Create
   another function, this time named `parseExif` which accepts the ArrayBuffer.
   Inside this, make a variable named `parser` and assign the return value of
   `ExifParser.create` passing the ArrayBuffer instance into it.  Log this
   value to the console.

   Call this function from the `readFile` callback and assign the return value
   to a variable named `exif`.  Currently we don't return anything, so this
   will be undefined, until we fill out the rest of the `parseExif` function.

   Upload an image and inspect the console.  You should see a parser instance
   with two visible properties: `flags` and `stream`.  Leaning on what you've
   learned of the prototype, inspect this object for a method that looks like
   it will parse for exif tags.

   Once you find this method call it and assign the results to a variable named
   `result`.  Log this value and find the tags property.  We'll be returning
   this from the function.

9. Now that we are returning the EXIF tags we have the data necessary to move
   on to the next section.  Log out the exif variable from the `readFile`
   function and experiment with different images.  Admire your awesomeness from
   the console.  The next exercise will have us sharing this data with the
   table.
