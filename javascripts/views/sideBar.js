/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/8/14
 * Time: 9:00 PM
 * To change this template use File | Settings | File Templates.
 */

var sideBar = View.extend({
   init: function(controller) {
       this.controller = controller;
       this.template = '<div id="sidebar"><div class="line"></div><div class="myName">Benny Zingerevich<p>UX Designer</p></div><div class="menu"></div></div>';
   },

    render: function(element) {
        var self = this;
        this.sidebarMenu = new sideBarMenu({
            whoAmI: {
                click: function() {
                    self.controller.replaceContentView("whoAmI");
                },
                text: "Who Am I"
            },
            myWork: {
                click: function() {
                    self.controller.replaceContentView("myWork");
                },
                text: "My Work"
            },
            contact: {
                click: function() {
                    self.controller.replaceContentView("contact");
                },
                text: "Contact"
            }
        });

        this.content = $(self.template);
        $('.menu', this.content).append(this.sidebarMenu.render());
        $(element).append(this.content);

        $('.myName', this.content).click(function() {
            self.controller.replaceContentView("welcomeView");
            self.hideMenu();
        });
    },

    hideMenu: function () {
      $('.menu', this.content).fadeOut(0);
    },

    showMenu: function (selectedView) {
        var self = this;

        if($('.menu').is(":hidden")){
            $('.menu', this.content).fadeIn();
        }

        if(selectedView) {
            self.setSelectedMenu(selectedView);
        }
    },

    setSelectedMenu: function(menuItemName){
        this.sidebarMenu.setSelected(menuItemName)
    },

    minimize: function() {

    },

    minimizedClicked: function() {

    }
});
