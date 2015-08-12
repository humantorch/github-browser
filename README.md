##GITHUB REPO BROWSER

###INSTALLATION AND SETUP

To build and run the project you need to have [Yeoman](http://yeoman.io/learning/index.html "Getting started with Yeoman") installed (with all it's dependencies). Click on the link to see how to get started. TL;DR if you've got Node and npm installed, then `npm install -g yo bower grunt-cli gulp` should get you where you need to go.

After unzipping the project, you will need to run `npm install && bower install` from the directory to install all the required node modules and bower packages. You might need to run these commands with admin rights: `sudo npm install` and `sudo bower install` and then type in your password.

When this is done you can start up a local server with livereload and file watching by running `grunt serve`.

To create a production build (image optimised, JS minified and concatenated, Sass compiled to CSS, etc.) run `grunt` to output a production-ready build into the /dist directory. This can be uploaded to a server or run from a local server (note: simply double-clicking on `index.html` won't work correctly due to file pathing and potential ajax security rules, etc.).

Finally, if you're really ambitious there's a Grunt task that builds and rsyncs the app to a server. Simply replace the server address/file path the `config` section of the Gruntfile.js (starts on line 20) with your own information and run `grunt deploy`.

**If any of the above isn't working for whatever reason, please do not hesitate to try to contact me. The project is also running online at http://onion.prayingmadness.com if all else fails.**

###NOTES

Harnessing the power of the Github API this app serves up all the public repository information from any user or organization, sorted by the most recently-updated repos. Selecting a repo will show a list of the most recent 100 commits, sorted by most recent.