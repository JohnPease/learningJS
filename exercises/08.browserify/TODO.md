Browserify
==========

Our code is a mess by my standards.  We're doing way too much work and it's not
really paying off the way I'd like.  So. many. script. tags.  Lets get rid of
them!

The reason why I waited to the very end for this section is that up until now
all code changes only required a refresh in the browser.  With the introduction
of a module optimizer, we'll be introducing a build step.

1. Run the command `npm init` inside the work directory.  This will create a
   package.json file for us.  Just hit enter to accept all the defaults all the
   way through until it finishes.

2. Now that we have a package.json file to track our dependencies, run the
   following command to install Browserify and save it as a development
   dependency:

   ```
   npm install --save-dev browserify
   ```

3. Inside package.json add a section named "scripts".  Make it look like this:

   ```
   "scripts": {
      "build": "browserify src/app.js > dist/app.js"
   }
   ```

   Now we can run `npm run build` anytime we want to update.

   Remove all script tags (except for templates from index.html) and replace
   with a single <script src="dist/app.js"></script>.

4. Now we need to go through each file and update the dependencies to require
   correctly.  We also need to update all files to become CommonJS modules.

   We'll do this part together.

5. Lets get rid of those pesky template script tags as well... together!

Isn't Browserify awesome?
