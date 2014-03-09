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
            'WhoAmI'      : new whoAmIView(this)
//            'myWork'      : new myWorkView(this)
        };
        this.currView = this.allViews.welcomeView;
    },

    render: function() {
        $('#content-container').append(this.currView.render());
    },

    replaceContent: function(toView) {
        var self = this;
        self.controller.replaceContentView(toView);
        var currViewRendered = $('#content-container').children();
        currViewRendered.fadeOut(400, function() {
            self.currView = self.allViews[toView];
            var newViewRendered = self.currView.render();
            newViewRendered.fadeOut();
            $('#content-container').append(newViewRendered);
            newViewRendered.fadeIn(400);
            currViewRendered.remove();
        });
    },

    hideLeft: function(callback) {
        var prevLeft = this.position().left;
        this.css({position:"relative"});
        this.animate({left: -1.5*this.width()}, 300, "swing", function() {
            this.hide();
            this.css({left: prevLeft});
            callback();
        })
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
