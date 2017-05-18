
// Create our own local service pertaining to the application module
// We have namespaced local services with "twitter-stream:"
var twitterAppService = SYMPHONY.services.register("twitter-stream:app");

SYMPHONY.remote.hello().then(function(data) {

    // Set the theme of the app module
    var themeColor = data.themeV2.name;
    var themeSize = data.themeV2.size;
    // You must add the symphony-external-app class to the body element
    document.body.className = "symphony-external-app " + themeColor + " " + themeSize;

    SYMPHONY.application.connect("twitter-stream", ["modules", "applications-nav", "ui", "share"], ["twitter-stream:app"]).then(function(response) {

        // The userReferenceId is an anonymized random string that can be used for uniquely identifying users.
        // The userReferenceId persists until the application is uninstalled by the user.
        // If the application is reinstalled, the userReferenceId will change.
        var userId = response.userReferenceId;

        // Subscribe to Symphony's services
        var modulesService = SYMPHONY.services.subscribe("modules");
        var navService = SYMPHONY.services.subscribe("applications-nav");
        var uiService = SYMPHONY.services.subscribe("ui");
        var shareService = SYMPHONY.services.subscribe("share");

        // UI: Listen for theme change events
        uiService.listen("themeChangeV2", function() {
            SYMPHONY.remote.twitter-stream().then(function(data) {
                themeColor = data.themeV2.name;
                themeSize = data.themeV2.size;
                document.body.className = "symphony-external-app " + themeColor + " " + themeSize;
            });
        });

        // MODULE: Add a menu item to our module
        modulesService.addMenuItem("twitter-stream", "About Twitter Stream App", "twitter-stream-menu-item");
        modulesService.setHandler("twitter-stream", "twitter-stream:app");

        // LEFT NAV: Update the left navigation item's badge count when the "Increment Unread Badge Count" button is clicked using the navService's count method.
        var incrementButton = document.getElementById("increment");
        var count = 0;
        // Bind a click event handler
        incrementButton.addEventListener("click", function(){
            count++;
            navService.count("twitter-stream-nav", count);
        });


        // SHARE: Trigger Symphony's share modal when the "Share" button is clicked
        var shareButton = document.getElementById("share");
        // Convert the datestring (07 June 2016) to Unix timestamp for the share service
        var articleUnixTimestamp = (new Date(document.getElementById("article-date").innerHTML).getTime())/1000;
        var articleOptions = {
            "title": document.getElementById("article-title").innerHTML,
            "subTitle": document.getElementById("article-subtitle").innerHTML,
            "blurb": document.getElementById("article-blurb").innerHTML,
            "date": articleUnixTimestamp,
            "publisher": document.getElementById("article-publisher").innerHTML,
            "author": document.getElementById("article-author").innerHTML,
            "thumbnail": document.getElementById("article-thumbnail").src,
            // In this case, the shared article has an ID, which is used to deeplink back into our application
            "id": document.getElementById("article-id").innerHTML
        };
        shareButton.addEventListener("click", function(){
            shareService.share(
                "article",
                articleOptions
            );
        });

        var shareButton2 = document.getElementById("share-2");
        var articleUnixTimestamp2 = (new Date(document.getElementById("article-date-2").innerHTML).getTime())/1000;
        var articleOptions2 = {
            "title": document.getElementById("article-title-2").innerHTML,
            "subTitle": document.getElementById("article-subtitle-2").innerHTML,
            "blurb": document.getElementById("article-blurb-2").innerHTML,
            "date": articleUnixTimestamp2,
            "publisher": document.getElementById("article-publisher-2").innerHTML,
            "author": document.getElementById("article-author-2").innerHTML,
            "thumbnail": document.getElementById("article-thumbnail-2").src,
            // In this case, the shared article has an href link, which should be opened in a new browser window
            "href": document.getElementById("article-link-2").href
        };
        shareButton2.addEventListener("click", function(){
            shareService.share(
                "article",
                articleOptions2
            );
        });

        // LINKS: Open a link using the openLink() method on the modules service. Links should be opened using this method rather than <a href="..." target="_blank">...</a>.
        var linkButton = document.getElementById("link");
		linkButton.addEventListener("click", function(){
			modulesService.openLink("https://www.google.com");
		});

	}.bind(this))
}.bind(this));
