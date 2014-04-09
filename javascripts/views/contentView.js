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

        this.myWorkModels = [
            new slenderModel(),
            new onlineCVModel(),
            new csiAppModel()
        ];

        this.allViews = {
            'welcomeView' : new welcomeView(this),
            'whoAmI'      : new whoAmIView(this),
            'myWork'      : new myWorkList(this, this.myWorkModels)
        };

        this.currView = this.allViews.welcomeView;
    },

    render: function() {
        $('#content-container').append(this.currView.render());
    },

    replaceContent: function(toView, animation) {
        var self = this;
        var currViewRendered = $('#content-container').children();
        if(self.currView.destroy) {
            self.currView.destroy();
        }
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

    myWorkItemClicked: function(workIndex) {
        var self = this;
        delete self.allViews["myWorkEntry"];
        self.allViews["myWorkEntry"] = new myWorkEntry(this, this.getMyWorkData(workIndex));
        self.currMyWorkItem = workIndex;
        self.replaceContent("myWorkEntry");
    },

    showPrevWorkBtn: function() {
       return (this.currView instanceof myWorkEntry) && this.currMyWorkItem > 0;
    },

    prevWorkClicked: function() {
        if(this.currMyWorkItem > 0)
        {
            this.myWorkItemClicked(this.currMyWorkItem - 1);
        }
    },

    nextWorkClicked: function() {
        if(this.currMyWorkItem < this.myWorkModels.length-1)
        {
            this.myWorkItemClicked(this.currMyWorkItem + 1);
        }
    },

    showNextWorkBtn: function() {
        return (this.currView instanceof myWorkEntry) && this.currMyWorkItem < this.myWorkModels.length-1;
    },

    fadeReplacement: function(currView, nextView) {
        nextView.css("display", "none");
        currView.fadeOut(300, function() {
            $(document.body).scrollTop(0);
            $('#content-container').append(nextView);
            nextView.fadeIn(300);
            currView.remove();
        });
    },

    hideLeft: function(currView, nextView) {
        var container = $('#content-container');
        container.css({"overflow-x" : "hidden"});
        var contentViewWidth = container.width();
        nextView.hide().css({left: contentViewWidth});
        container.append(nextView);
        currView.animate({left: -contentViewWidth}, 300, "linear", function() {
            currView.remove();
            container.css({"overflow-x" : "visible"});
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
    },

    getMyWorkData: function(modelIndex) {
        return this.myWorkModels[modelIndex];
    }
});
