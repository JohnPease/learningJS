Writing a basic base Controller
===============================

This exercise will focus on structuring our methods related to events and
logic.

1. Inside our folder named base, make a few file called controller.js.  We'll
   be putting in our base constructor code here.  Don't forget to include this
   before app.js inside the index.html file.

2. Copy the code from our base View into this file, it'll save some time.
   Simply do a find and replace View/Controller.  You can safely delete all
   methods inside the prototype as well.

   Also remove the `$el` references in the constructor.

3. To make events work, we'll want to iterate over them, split and break down
   the parts into event name and selector.  If the selector exists, find it and
   then bind the event.

   Name the function `bindEvents` and assume it is passed a jQuery element to
   scope events to.

   The code in here should iterate over the `this.events` and do the logic
   described above, while binding using `$el.on`.

   This can be a bit tricky, but is quite simple once you figure out exactly
   how it should work.  Flag one of us down if you get stuck here.

   *Hint*: Do not forget to set the context of the event to be the controller,
   otherwise `this` will be incorrect.

4. Create a folder to hold our controllers, and make one for form, but not
   table.  There will be one controller for form, since it has events in this
   case.

   Don't forget to add these to index.html as well.  Don't worry this nonsense
   will end soon!

5. Inside of the Form Controller file, extend the base Controller just like we
   did with Views.

   Inside here we'll want to paste in the change event function.  To separate
   events from other methods, make an events object.  We'll attach the `change`
   event in here in the same way as Backbone.  Which is event and then an
   optional space and selector.  Since we are doing the change event on the
   input file field, we'll write something like: 

   ```
   events: {
     'change input[type=file]': function(event) { ... }
   }
   ```

   We'll also move in our `readFile` and `parseExif` calls to this Controller.

   Ensure you reformat the functions to match, and ensure that all function
   calls are now prefixed with `this.`.

   If we did nothing else here, and hooked up our controller, we'd see many
   failures, due to `this` context being invalid.  `this` is not magic, it must
   be manually cared for.

   In the `readFile` function, where you see `callback(...);` we'll
   need to change this to pass the correct `this`.  The easiest way is to cache
   the outer `this` as something like `var controller = this;` and then use
   `call` or `apply` to set it correctly to the callback.

6. We can now hook our FormController up to the FormView.

   Inside FormView, add a `constructor` method, which we learned is simply a
   function that runs at the time of construction.  Inside this method,
   initialize a new FormController and then call `bindEvents` on it, passing
   the current `this.$el` in.

So in the process of abstracting our code out to be all nice and neat, we've
broken some functionality.  Suddenly our `formView` and `tableView` objects
are not available, because we've left the safety scope of the IIFE.

We'll solve this by using a model and coordinating changes with that, next.
