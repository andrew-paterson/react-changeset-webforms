# Clause Sonnet 4.6

For this task , I'm giving you a correct example to test your work. The example did the following:

Read the Ember.js component files in /home/paddy/development/ember-addons/react-changeset-webforms/test-app/src/components/demos/attr-functions.hbs and /home/paddy/development/ember-addons/react-changeset-webforms/test-app/src/components/demos/attr-functions.js.

Created a react component out of these two files, named AttrFunctions.jsx.
2.1) Important- from the .hbs file, we only want to use the code inside the demo.example tag to create the react component.
2.2) Really important- in the .js file, there was a comment // BEGIN-SNIPPET attr-functions.js". The opening line of the react component must have this comment, exactly the same, but ending in .jsx, not .js. Then the last line should have the comment // END-SNIPPET". This is important for the docs to be able to pull in the correct code snippets for the documentation site.

As a first attempt, please only the same pattern with /home/paddy/development/ember-addons/react-changeset-webforms/test-app/src/components/demos/checkbox-group-example-one

## Create demo wrappers

1. Look at the following files:
   /home/paddy/development/ember-addons/react-changeset-webforms/test-app/src/components/demos/attr-functions.hbs
   /home/paddy/development/ember-addons/react-changeset-webforms/test-app/src/components/demos/attr-functions.js
   /home/paddy/development/ember-addons/react-changeset-webforms/test-app/src/components/demos/AttrFunctions.jsx
   /home/paddy/development/ember-addons/react-changeset-webforms/test-app/src/components/demos/AttrFunctionsDemo.jsx

These provide the example of what I would like you to do.

I created a new component at /home/paddy/development/ember-addons/react-changeset-webforms/test-app/src/components/demos/AttrFunctionsDemo.jsx, which is roughly speaking the React version of /home/paddy/development/ember-addons/react-changeset-webforms/test-app/src/components/demos/attr-functions.hbs. The React version is the name of the corresponding React component with 'Demo' appended.

Note that in the Ember version, there are two snippets, one for .hbs and one for .js. The react version only has one, with the same label, but with the extension .jsx.

Note also, that within the <DocsExample> in AttrFunctionsDemo.jsx, we have different content. We simply invoke the corresponding React component.

I would like you to please repeat this pattern for all other components in /home/paddy/development/ember-addons/react-changeset-webforms/test-app/src/components/demos.

IMPORTANT. Ignore any .hbs files that do not have exactly 2 snippets, where one they have the same label, but one with .hbs and one with .js.

## Generate create-snippets script

Please write a Node.js script at /home/paddy/development/ember-addons/react-changeset-webforms/test-app/create-snippets.js, which will find all code snippets from all the files within these directories:
/home/paddy/development/ember-addons/react-changeset-webforms/test-app/src
/home/paddy/development/ember-addons/react-changeset-webforms/test-app/src
And then output them to /home/paddy/development/ember-addons/react-changeset-webforms/test-app/src/snippets.js

A code snippet is identified by an opening comment in this form: // BEGIN-SNIPPET snippet-name.extension, and a closing tag which in in the form // END-SNIPPET

Each snippet object in snippets.js should be an object with keys name and text.

The name is what comes after // BEGIN-SNIPPET

The text is the code found between opening and closing snippet comments.

Please maintain whitespace when outputting the text for each snippet.

There is one example you can use in snippets.js, which is derived from /home/paddy/development/ember-addons/react-changeset-webforms/test-app/src/components/demos/AttrFunctions.jsx

## File create-snippets script

In /home/paddy/development/ember-addons/react-changeset-webforms/test-app/create-snippets.js, I've added two relative paths in the array 'relativeDirPaths'.

Please update /home/paddy/development/ember-addons/react-changeset-webforms/test-app/create-snippets.js to determine which files to search for snippets.

Also, the trailing quote at the end of the BEGIN-SNIPPET lines was a mistake, which I have removed. Please update the create-snippets file accordingly.
