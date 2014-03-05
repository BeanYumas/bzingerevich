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
           bzWebsite.views.lp = $('.lp').contentView();
           $('#blue-btn-welcome').click(function() {
               bzWebsite.views.experience = bzWebsite.createView("experience");
               $('#content-container').append(bzWebsite.views.experience);
               bzWebsite.views.lp.fadeOut( function() {
                   bzWebsite.views.lp.remove();
               });
           });
       },

       createView: function(viewType) {
           var createdView;
           switch (viewType) {
               case "experience":
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

           return createdView;
       }
    }
})(jQuery);
