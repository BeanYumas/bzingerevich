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
            bzWebsite.views.contentView.replaceContent(toView);
        },

        contentViewReplaced: function(newView) {
            bzWebsite.views.sideBar.showMenu(newView);
        }

    }

    $(document).ready(function(){

        var arrayOfImages = [
            "./images/MusicMob_preview.png",
            "./images/myOnlineCv_preview.png",
            "./images/csi_preview.png",
            "./images/benny.png",
            "./images/MusicMob/Personas/courtney.png",
            "./images/MusicMob/Personas/geneysha.png",
            "./images/MusicMob/Personas/roy.png",
            "./images/MusicMob/Personas/jake.png",
            "./images/MusicMob/Personas/jeff.png",
           "./images/MyOnlineCV/Personas/Ofri.png",
           "./images/MyOnlineCV/Personas/Oren.png",
            "./images/MyOnlineCV/Personas/Mosh.png",
            "./images/MyOnlineCV/Personas/Muhamad.png",
            "./images/CSIMobileApp/Personas/Joe.png",
            "./images/CSIMobileApp/Personas/Allan.png",
            "./images/CSIMobileApp/Personas/Rachel.png",
            "./images/CSIMobileApp/Personas/Omar.png"
        ];
        $(arrayOfImages).each(function(){
                $('<img/>')[0].src = this;
        })
    });

})(jQuery);
