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
           "./images/MyOnlineCV/Personas/Ofri.png",
           "./images/MyOnlineCV/Personas/Oren.png",
            "./images/MyOnlineCV/Personas/Mosh.png",
            "./images/MyOnlineCV/Personas/Muhamad.png",
            "./images/myOnlineCv_preview.png",
            "./images/MyOnlineCV/nav-tree.png",
            "./images/MyOnlineCV/wireframes/pick_an_animal.png",
            "./images/MyOnlineCV/wireframes/dashboard_advanced.png",
            "./images/MyOnlineCV/wireframes/job_exp.png",
            "./images/MyOnlineCV/wireframes/homepage.png",
            "./images/CSIMobileApp/Personas/Joe.png",
            "./images/CSIMobileApp/Personas/Allan.png",
            "./images/CSIMobileApp/Personas/Rachel.png",
            "./images/CSIMobileApp/Personas/Omar.png",
            "./images/csi_preview.png",
            "./images/CSIMobileApp/nav-tree.png",
            "./images/CSIMobileApp/wireframes/added_evidence.png",
            "./images/CSIMobileApp/wireframes/crime_scene_list.png",
            "./images/CSIMobileApp/wireframes/add_photo.png",
            "./images/CSIMobileApp/wireframes/hello.png"
        ];
        $(arrayOfImages).each(function(){
                $('<img/>')[0].src = this;
        })
    });

})(jQuery);
