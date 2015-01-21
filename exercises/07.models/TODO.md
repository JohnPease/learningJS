Writing a basic base Model
==========================

This execise will focus on isolating data to a model which is a useful object
to pass around between your application to synchronize state and prove as your
source of truth.

1. Inside our folder named base, make a few file called model.js.  We'll
   be putting in our base constructor code here.  Don't forget to include this
   before app.js inside the index.html file.

   You know the drill, copy contents from controller or view and rename to
   `Model` wiping out the existing prototype methods.

   Add this to index.html.

2. We'll create the following methods together: `get`, `set`, and `onChange`.

3. Create a models directory and inside that make a file named: photo.js that
   extends the base Model.

4. Inside app.js initialize the `photoModel` and attach it to both `formView`
   and `tableView`.  The easiest way to ensure the model will be ready in the
   View constructors below, is to pass it as a second argument to the View
   constructor.  You can then assign it correctly to `this` inside the Base
   View constructor.

   If you need help with this confusing part, let us know.

5. Inside the constructor of each of our views we can now write code like:
   
   ```
   var view = this;
   view.model.onChange(function() {
     view.render();
   });
   ```

   To automatically re-render.  However, we'll need to make sure we're passing
   the right data into these render calls.

   Since we have a `model.get()` call, we can assume any data structure inside
   the model.  Lets assume the following:

   ```
   {
     exif: null
     src: ''
   }
   ```

   This structure matches both our templates allowing us to simply:
   `view.render(this.get());` inside both Views.  Super convenient!  You could
   even put this in the Base View if you wanted to.

   Don't forget to pass the model to the FormController as well, we'll need it
   in there for the next step.

6. Now we can revist the issue of calling render in our Controller.  Instead
   of rendering, we're now going to use `this.model.set` and set the exif and
   src data.  This will trigger a re-render of both components, because of the
   `onChange` callbacks being set.

7. Everything should be working now, except for an error you should be seeing
   about `src` being undefined.  We'll fix that easily, by allowing a Model to
   specify defaults.  Augment the Base Model constructor function to accept a
   defaults object, and assign that to the data object if it exists, otherwise
   use an empty object.

   In app.js you can now update `photoModel` to pass the defaults we defined
   above `exif: null, src: ''`.

If everything is working, congratulations you did the hard part! Now the full
part, cleanup!
