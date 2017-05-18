/**
* Licensed to the Symphony Software Foundation (SSF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The SSF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
**/

// Create our own local controller service.
// We have namespaced local services with "twitter-stream:"
var twitterControllerService = SYMPHONY.services.register("twitter-stream:controller");

// All Symphony services are namespaced with SYMPHONY
SYMPHONY.remote.hello().then(function(data) {

    // Register our application with the Symphony client:
    // Subscribe the application to remote (i.e. Symphony's) services
    // Register our own local services
    SYMPHONY.application.register("twitter-stream", ["modules", "applications-nav", "ui", "share"], ["twitter-stream:controller"]).then(function(response) {

        // The userReferenceId is an anonymized random string that can be used for uniquely identifying users.
        // The userReferenceId persists until the application is uninstalled by the user.
        // If the application is reinstalled, the userReferenceId will change.
        var userId = response.userReferenceId;

        // Subscribe to Symphony's services
        var modulesService = SYMPHONY.services.subscribe("modules");
        var navService = SYMPHONY.services.subscribe("applications-nav");
        var uiService = SYMPHONY.services.subscribe("ui");
        var shareService = SYMPHONY.services.subscribe("share");

        // LEFT NAV: Add an entry to the left navigation for our application
        navService.add("twitter-stream-nav", "Twitter Stream App", "twitter-stream:controller");

        // LEFT NAV: Add an extra left navigation item that can be removed by clicking on the "Remove Left Nav Item Button"
        navService.add("twitter-stream-nav-remove", "Removable Left Nav Item", "twitter-stream:controller");

        // UI: Add elements to the Symphony user interface:
        // buttons on IMs/MIMs/rooms, links on cashtag/hashtag hover cards and settings
        uiService.registerExtension("single-user-im", "twitter-stream-im", "twitter-stream:controller", {label: "IM Button", data: {"datetime": Date()}});
        uiService.registerExtension("multi-user-im", "twitter-stream-mim", "twitter-stream:controller", {label: "MIM Button"});
        uiService.registerExtension("room", "twitter-stream-room", "twitter-stream:controller", {label: "Room Button"});
        uiService.registerExtension("profile", "twitter-stream-profile", "twitter-stream:controller", {label: "Profile Button"});
        uiService.registerExtension("hashtag", "twitter-stream-hashtag", "twitter-stream:controller", {label: "Hashtag Link"});
        uiService.registerExtension("cashtag", "twitter-stream-cashtag", "twitter-stream:controller", {label: "Cashtag Link"});
        uiService.registerExtension("settings", "twitter-stream-settings", "twitter-stream:controller", {label: "Settings Link"});

        // SHARE: Set the controller that implements the "link" method invoked when shared articles are clicked on.
        shareService.handleLink("article", "twitter-stream:controller");

        // Implement some methods on our local service. These will be invoked by user actions.
        twitterControllerService.implement({

            // LEFT NAV & MODULE: When the left navigation item is clicked on, invoke Symphony's module service to show our application in the grid
            select: function(id) {
                if (id == "twitter-stream-nav") {
                   // Focus the left navigation item when clicked
                    navService.focus("twitter-stream-nav");
                }

                modulesService.show("twitter-stream", {title: "Twitter Stream App"}, "twitter-stream:controller", "https://localhost:8080/app", {
                    // You must specify canFloat in the module options so that the module can be pinned
                    "canFloat": true,
                });
                // Focus the module after it is shown
                modulesService.focus("twitter-stream");
            },

            // UI: Execute the following when UI extensions are clicked.
            trigger: function(uiClass, id, payload, data) {
                if (uiClass == "single-user-im") {
                    console.log('IM button was clicked on ' + data.datetime + '.');
                } else if (uiClass == "multi-user-im") {
                    console.log('MIM button was clicked.');
                } else if (uiClass == "room") {
                    console.log('Room button was clicked.');
                } else if (uiClass == "profile") {
                    console.log('Profile button was clicked.');
                } else if (uiClass == "hashtag") {
                    console.log('Hashtag link was clicked.');
                } else if (uiClass == "cashtag") {
                    // Open our app in the context of the cashtag:
                    // Put the cashtag in the module title.
                    // Include the cashtag in the URL parameters.
                    var cashtag = payload.entity.name;
                    var moduleTitle = "Twitter Stream App: " + cashtag;
                    modulesService.show("twitter-stream-cashtag", {title: moduleTitle}, "twitter-stream:controller", "https://localhost:8080/app?cashtag=" + cashtag, {
                        "canFloat": true,
                        // Use parentModuleId to open a new module without closing the original module ("twitter-stream")
                        "parentModuleId": "twitter-stream"
                    });
                    modulesService.focus("twitter-stream-cashtag");
                } else if (uiClass == "settings") {
                    console.log('Settings link was clicked.')
                }
                console.dir(payload);
            },

            // SHARE: Open our app in the context of an article:
            // Put the article in the moudle title.
            // Include the article in the URL parameters.
            link: function(type, articleId) {
                if(type == "article") {
                    var moduleTitle = "Twitter Stream App: " + articleId;
                    modulesService.show("twitter-stream-article", {title: moduleTitle}, "twitter-stream:controller", "https://localhost:8080/app?article=" + articleId, {
                        "canFloat": true,
                        // Use parentModuleId to open a new module without closing the original module ("twitter-stream")
                        "parentModuleId": "twitter-stream"
                    });
                    modulesService.focus("twitter-stream-article");
                }
            }

        });
    }.bind(this))
}.bind(this));
