##AMERICA'S FINEST OPEN SOURCE REPOS.

###INSTALLATION AND SETUP

To use this template you need to have [Yeoman](http://yeoman.io/learning/index.html "Getting started with Yeoman") installed (with all it's dependencies). Click on the link to see how to get started. TL;DR if you've got Node and npm installed, then `npm install -g yo bower grunt-cli gulp` should get you where you need to go.

After unzipping the project, you will need to run `npm install && bower install` from the directory to install all the required node modules and bower packages.

You might need to have run the above commands with admin rights: `sudo npm install` and `sudo bower install` and then type in your password.

When this is done you can start up a local server with livereload and file watching by running `grunt serve`.

To create a production (image optimised, JS minified and concatenated, Sass compiled to CSS, etc.) run `grunt` to output a production-ready build into the /dist directory. This can be uploaded to a server or run from a local server (note: simply double-clicking on `index.html` won't work correctly).

###NOTES

Harnessing the power of the Github API this app serves up all the public repository information from [The Onion's](http://github.com/theonion) development team, sorted by the most recently-updated repos.

This app was built based on a vanilla Yeoman `yo webapp` installation with Backbone added afterwards. i could have used other methods of setting this up (Backbone-based generators, etc.) but I'm familiar with the Yeoman setup already and any Backbone generators I've found were old, outdated, and unmaintained for over a year.

It's worth noting that at this point I have had _very_ little hands-on experience with Backbone or JavaScript MVC programming in general. This, of course, begs the question as to why I built the app this way. To be honest it was a lot more work than expected, and took far longer than building it otherwise should have. I'm confident that, had I built this without using an MVC framework, I could have knocked this out in a couple of hours. However, the resultant app from that tyep of exercise would have been almost completely infelxible and unable to expand/grow to meet future needs and features without a not-insignficant degree of re-engineering.

There's no automated testing built into the app, but what I have put in is a "debug" mode. Running the app with `#debug` appended to the URL will output a number of different pieces of debugging info to the browser console (data retrieved from the server, parameters sent with requests, etc.). As is best practice all ajax requests will display error messages if a request is unsuccessful.

In keeping with the spirit of the assignment ('I need to put something up that my users will actually be using on a daily basis, but I don't have days and days to work on it') here's a (non-exhaustive) list of things that I didn't do but would absolutely consider for a "phase 2" of the project, roughly in order of priority:

* Automated testing with a framework such as Jasmine or Mocha
* Use Require.js to load everything asynchronously and provide a more robust `r.js`-based build script
* Allow the user to configure which organization/account to fetch repository data from
* Selecting a commit would show a list of files changed in that commit
* Allowing the user to change the metric by which repositories are listed (number of forks, most open issues, etc.)