Project Name: BackLogger

Description: Backlogger is a webapp project to allow people to create/share/track backlogs for their favorite entertainment mediums.

Directory structure:
root
-public
--css
--img
--js
-- etc .html files
-server
-- config
--- database connection.js
-- models
--- current user database model design.js
-- routes
--- different routes for admin/main/user
-.env
-.gitignore
-app.js
-package-lock.json
-package.json
-README.txt

This is the folder structure this is all that is needed for this project.

Folder explinations-----
public: this folder contains all of the front end portions of the project. The css sub folder contains styling guides for the html files. img folder contains refernce img files for the different aspects of the project. the js folder contains the script file for extra functionaility on the front end. The html files are what make up the front end portion that is being seen.
server: This folder contains all current functionaility as modules. The config folder contains the database js file, this handles database connection. Models is the folder that contains the database table structures to follow for uploading data to the mongodb. Routes is how we handle the different post and get methods being used for the current structure of the project.

Loose file explinations----------
.env: this file contains data for the shared project mongodb account. This also contains data for the cookie creation.
.gitignore: this is the ignore file for uploading to git without adding bloat. Please create one and make sure to ignore the node-modules folder.
app.js: this is the main node.js module that handles the whole webapplication.
package-lock.js & package.json : these files contain the meta-data for the node modules and any extra dependenices being used.

Installation Guide:
The following will be a step by step guide on how to setup your development environment for future devs.
Prereq: please make sure to have the latest version of node.js installed on your pc as well as git version control.
1- Please clone the repository and then create your own branch for proper version control.
2- After the repository is cloned, please open the project in your advanced text editor (VS CODE).
3- Once in VSCODE with the project open, please open a terminal within the editor and run "npm install". This will install all the needed dependenices we used from the package.json file.
4- once this is done, you are ready to continue development on this project. If you wish to debug this, you simply need to hit the run/debugger button and select node.js as your runtime.