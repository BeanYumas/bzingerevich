/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/5/14
 * Time: 6:47 PM
 * To change this template use File | Settings | File Templates.
 */
(function($){
    window.bzWebsite = {
       views: {},


       init: function() {
           bzWebsite.views.sideBar = new sideBar(this);
           bzWebsite.views.sideBar.render("#sidebar-container");
           bzWebsite.views.sideBar.hideMenu();

           bzWebsite.views.contentView = new contentView(this);
           bzWebsite.views.contentView.render();
       },

        replaceContentView: function(toView) {
            bzWebsite.views.sideBar.showMenu();
            switch (toView) {
                case "WhoAmI":
                    createdView = $("<div class='experience'>" +
                        "<div class='header'>{experience}</div><div class='content'>{experienceContent}</div>" +
                        "<div class='header'>{skills}</div><div class='content'>{skillsContent}</div>" +
                        "<div class='header'>{education}</div><div class='content'>{educationContent}</div>" +
                        "</div>");
                    break;
                case "portfolioList":
                    break;
                case "portfolioEntry":
                    break;
            }
        }
    }
})(jQuery);
