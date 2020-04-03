## GITHUB REPO BROWSER

### INSTALLATION AND SETUP

#### Live version available at: https://github.prayingmadness.com

##### Note: as of April 2020 this project is about 6 years old, it still runs but obviously using some pretty outdated dependencies. It still runs locally just fine but installing it will throw a _ton_ of deprecation warnings and errors, you've been warned. The likelihood of me ever updating this is close to zero.

To build and run the project you need to have [Yeoman](http://yeoman.io/learning/index.html "Getting started with Yeoman") installed (with all it's dependencies). Click on the link to see how to get started. TL;DR if you've got Node and npm installed, then `npm install -g yo bower grunt-cli gulp` should get you where you need to go. You'll also need Ruby and Sass installed – on a Mac this is done via `gem install sass` (possibly requiring `sudo` depending on your setup).

After unzipping the project, you will need to run `npm install && bower install` from the directory to install all the required node modules and bower packages (again, may require `sudo` on your device). 

When this is done you can start up a local server with livereload and file watching by running `grunt serve`.

To create a production build (image optimised, JS minified and concatenated, Sass compiled to CSS, etc.) run `grunt` to output a production-ready build into the /dist directory. This can be uploaded to a server or run from a local server (note: simply double-clicking on `index.html` won't work correctly due to file pathing and potential ajax security rules, etc.).

Finally, if you're really ambitious there's a Grunt task that builds and rsyncs the app to a server. Simply replace the server address/file path the `config` section of the Gruntfile.js (starts on line 20) with your own information and run `grunt deploy`.

### NOTES

Harnessing the power of the Github API this app serves up all the public repository information from any user or organization, sorted by the most recently-updated repos. Selecting a repo will show a list of the most recent 100 commits, sorted by most recent.

#### Github Access Tokens

This app no longer uses authenticated requests, so using it heavily will quickly hit the [API rate limit](https://developer.github.com/v3/#rate-limiting).


//TODO: make that a config option, allowing anyone to easily add their own [Github access token](https://github.com/blog/1509-personal-api-tokens), bypassing the rate limit.