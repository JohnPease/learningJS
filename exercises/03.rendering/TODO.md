Rendering data
==============

In this exercise we'll directly render the data we received from the ExifParser
into the table.  In the case of an image not having data, we'll report that the
image metadata is empty.

1. Since the meta information returned by the parser is an Object, we cannot
   directly use the Array methods for iteration.  We also do not know what the
   length is (not provided) so how can we loop through all the object
   properties?

   There are several options:

     - Investigate alternative for-loop syntax.
     - Look up ES5 Object methods for something that returns an Array.

   Once you find a suitable method of iteration, create a `renderTable`
   function that takes in the exif data as an argument.  Implement the loop
   in this function to iterate over each item and log the key and value to
   the console.

   Call this function from the `readFile` function callback after we
   `parseExif`.  Test with various images to see if they log metadata or not.

2. Now that we are able to loop through and know about the various data points,
   lets display them in the table.

   A simple way of doing this is to create a replacement `<tbody>` with jQuery
   and populate it with the correct results.  We'll do this first and
   investigate more efficient methods later.

   So create a variable named `tbodyElement` and make the element with jQuery.
   If you are stuck on this grab one of us and we'll assist you.  Place this
   variable above the loop you've created.

   Within the loop you'll append a new `<tr>` per iteration and within that two
   `<td>` elements to contain the key and value.

   Take a stab at implementing this yourself.  Log out the `tbodyElement` once
   you're done.  It should contain many elements corresponding to the added
   TableRow elements.
   
   Using `jQuery#replaceWith` update the existing `<tbody>` element with the
   new results.

3. Admire your handiwork!

4. Let's improve your handiwork ;-)

   What happens right now if you use an image without any associated metadata?

   We need to account for no data and display an appropriate message.  Take a
   stab at figuring out the length of keys in an Object.  Maybe use the length
   of the TableBody's children? There are a few ways to know if any data was
   located.  Try a few.

   Once you know if an image does not have metadata, add a condition using an
   `if` statement to append special content to the TableBody element we
   created.  Don't forget the `colspan` attribute!

So far we're doing good, we've essentially built the application per our own
specifications, but lets try and add one last feature before the next section.

5. We're going to add in an image preview of what was uploaded.  Inside our
   HTML add an empty `<img src="">` tag directly under the input field.  You
   may want to place this in a `<div>` so that it is always below the input.

   Our styles will account for this image not having a source and it will be
   hidden by default.  Inside our code we'll set this preview once we have
   the right information.

   Unfortunately our current `readFile` function only returns an ArrayBuffer,
   per the `readAsArrayBuffer` method call.  There is another call we can make
   named `readAsDataURL` which we can use to get a string representation of
   the image object, suitable for our new image tag.

   Add a condition to `readFile` to use `readAsDataURL` if a third argument is
   passed `true`.  You can call this whatever you like, but a nice name might
   be `toDataURI` or something similar.  You should use the `else` clause of
   an `if` statement to accomplish this task.

   To elaborate, we want to be able to backwards-support our existing
   `readFile` call, but offer new functionality by introducing a new argument.
   We'll set this argument to `true` to get a dataURI string.

6. Where we call `readFile`, add a second `readFile` call only this time
   pass a function that will locate and set the `src` attribute of our new
   image with the returned value.  You may want to add a class to our image
   to make it easier to locate.  `preview` might be a nice name for this.

If this works, congratulations you've implemented the MVP of this application.

Is everyone else still working? Try and make the `readFile` call a single
invocation that returns both the arrayBuffer and the dataURI.
