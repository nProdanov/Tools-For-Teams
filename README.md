Team League of the Three
=========

----------

##Team Tools##


###Team members usernames:###
-   Warez
-   nProdanov
-   vaspet


###Project desctiption:###
Team Tools is an application which gives you functionality to manage teams:

-  **Project organization and task managment** - Team Tools gives you the chance to create new projects, manage tasks and see your project progress.
-  **Project communication for the team** - You can easily communicate about every project with you teammates.


###Public (accessible without authentication) dynamic web pages:###

- **/home** - home page
- **/about** - shows more info about Team Tools
- **/register** - Registration form
- **/login** - LogIn form

###Private (authenticated) dynamic web pages:###

- **GET**
- **/profile** - get profile of authenticated user with option for edit
- **/profile/:username** - get profile of some user without option for edit
- **/my-projects** - get paged list of all projects where authenticated user is assigned for
- **/project-details/:projectId** - get detailed info for current project - adding editting deleting tasks,adding and listing colaborating users, message board, notifications 
- **/my-toolbox** - some tools for monitoring of projects
- **/charts/:projectName** - get chart for time and cost for current project and some additional tasks info
- **/notes/:projectName** - sticky notes for current project

###Server API:###
- **GET**
- **/api/users** - get all users
- **/api/users/:id** - get user by id
- **/api/projects** - get all projects
- **/api/projects/:id** - get project by id
- **/api/messages/:projectName** - get messages for specific project
- **/api/notifications/:username** - get notifications for specific user

- **POST**
- **/api/notifications** - create new notification
- **/api/tasks** - create new task
- **/api/projects** - create new project
- **/api/messages** - create new message
- **/api/users** - create new user

- **PUT**
- **/api/notifications/:id** - update specific notification
- **/api/projects/:id** - update specific project
- **/api/users/:id** - update specific user
- **/api/tasks/:id** - update specific task
- **/api/task/:id/delete** - delete(just update field) specific task

###Additional functionality:###

- Sign in with Google
- Update personal profile information
- Error handling and data validation
- Git source code link
- Watch project youTube video link