"use strict";
var factions_list_page_1 = require('./factions-list/factions-list.page');
var superheroes_list_page_1 = require('./superheroes-list/superheroes-list.page');
var profile_page_1 = require('./profile/profile.page');
var new_project_page_1 = require('./new-project/new-project.page');
var login_page_1 = require('./login/login.page');
exports.pages = {
    superheroes: superheroes_list_page_1.SuperheroesListPage,
    factions: factions_list_page_1.FactionsListPage,
    profile: profile_page_1.ProfilePage,
    newProject: new_project_page_1.NewProjectPage,
    login: login_page_1.LoginPage
};
//# sourceMappingURL=index.js.map