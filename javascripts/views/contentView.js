/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/8/14
 * Time: 10:25 PM
 * To change this template use File | Settings | File Templates.
 */

var contentView = View.extend({
    init: function(controller) {
        this.controller = controller;
        this.allViews = {
            'welcomeView' : new welcomeView(this),
            'whoAmI'      : new whoAmIView(this),
            'myWork'      : new myWorkList(this)
        };
        this.currView = this.allViews.welcomeView;
    },

    render: function() {
        $('#content-container').append(this.currView.render());
    },

    replaceContent: function(toView, animation) {
        var self = this;
        var currViewRendered = $('#content-container').children();
        self.currView = self.allViews[toView];
        var newViewRendered = self.currView.render();

        switch(animation) {
            case 'fadeOut' :
               self.fadeReplacement(currViewRendered, newViewRendered);
               break;
            case 'hideLeft':
                self.hideLeft(currViewRendered, newViewRendered);
                break;
            default:
                self.fadeReplacement(currViewRendered, newViewRendered);
                break;
        }

        self.controller.contentViewReplaced(toView);
    },

    myWorkItemClicked: function(itemName) {
        var self = this;
        switch (itemName) {
            case "Slender":
                delete self.allViews["myWorkEntry"];
                var newView = new myWorkEntry(this, "");
                self.allViews["myWorkEntry"] = newView;
                self.replaceContent("myWorkEntry", "hideLeft");
                break;
        }
    },

    fadeReplacement: function(currView, nextView) {
        nextView.css("display", "none");
        currView.fadeOut(300, function() {
            $('#content-container').append(nextView);
            nextView.fadeIn(300);
            currView.remove();
        });
    },

    hideLeft: function(currView, nextView) {
        var container = $('#content-container')
        var contentViewWidth = container.width();
        nextView.hide().css({left: contentViewWidth});
        container.append(nextView);
        currView.animate({left: -contentViewWidth}, 300, "linear", function() {
            currView.remove();
        });

        nextView.show();
        nextView.animate({left: 0}, 300, "linear");
    },

    hideRight: function(callback) {
        var prevLeft = this.position().left;
        this.css({position:"relative"});
        this.animate({left: this.position().left + this.width()*1.5}, 300, "swing", function() {
            this.hide();
            this.css({left: prevLeft});
            callback();
        })
    }
});
