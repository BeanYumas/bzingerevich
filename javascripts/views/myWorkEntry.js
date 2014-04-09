/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/10/14
 * Time: 1:35 PM
 * To change this template use File | Settings | File Templates.
 */

var myWorkEntry = View.extend({

    init: function(container, model) {
        this.container = container;
        this.model = model;
    },

    render: function() {
        var self = this;
        self.content = $("<div class='entry-container'><div class='my-work-entry content-view'>" +
            "<div class='entry-content'><section id='research'><div class='subheader business-goals'>What are the Business Goals?</div>" +
            "<div class='subheader personas'>Who are the Users?</div>" +
            "<div class='subheader needs'>What are the User's Needs?</div>" +
            "<div class='subheader conclusions'>Conclusions</div>" +
            "</section>" +
            "<section id='nav-model'><div class='subheader navigation-tree'></div></section>" +
            "<section id='wireframes'></section>" +
            "<section id='prototype'></section></div></div></div>");

        self.addHeader();

        $(window).scroll(function(){
            self.scrolled(self);
        });

        return self.content;
    },

    scrolled: function(self) {
        var sectionHeight = $('.entry-content section').height();
        var sectionNum = Math.floor($(document.body).scrollTop()/sectionHeight);

        if(self.currSection != sectionNum) {
            var allMenuItems = $('.menu-item a').removeClass('selected');
            $(allMenuItems[sectionNum]).addClass('selected');
        }
    },

    addHeader: function() {
        var header = $("<div class='fixed-header'>" +
            "<nav role='navigation' class='scroll-menu'><ul>" +
            "<li class='menu-item'><a class='selected' scrollTo='research'>Research</a></li>" +
            "<li class='menu-item'><a scrollTo='nav-model'>Navigation Model</a></li>" +
            "<li class='menu-item'><a scrollTo='wireframes'>Wireframes</a></li>" +
            "<li class='menu-item'><a scrollTo='prototype'>Prototype</a></li>" +
        "</ul></nav></div>");

        $('.menu-item a', header).click(function() {
            var clickedItem = $(this);
            $('.menu-item a').removeClass('selected');
            clickedItem.addClass('selected');
            $(document.body).animate({
                'scrollTop':   $('#' + clickedItem.attr('scrollTo')).offset().top - $('.fixed-header').height() - 50
            }, 300);
        });

        this.fillDescriptionToHeader(header);

        $('.my-work-entry', this.content).before(header);//add the header
    },



    fillDescriptionToHeader: function(headerToFill) {
        var self = this;
        headerToFill.prepend("<div class='entryDetails'><div class='my-prev-work'><div>< Prev Work</div></div><div class='entry-name'>" + this.model.getData().entryName +"</div>" +
            "<div class='entry-description'><div>" + this.model.getData().entryDescription +"</div></div>" +
            "<div class='my-next-work'><div>Next Work ></div></div></div>");
        if(this.container.showNextWorkBtn()) {//there is a next button
            var nextBtn = $(".my-next-work", headerToFill);
            nextBtn.css('display', 'table-cell');
            nextBtn.click(function() {
                self.container.nextWorkClicked.call(self.container)
            });
        }

        if(this.container.showPrevWorkBtn()) {//there is a next button
            var prevBtn = $(".my-prev-work", headerToFill);
            prevBtn.css('display', 'table-cell');
            $('.entry-name', headerToFill).css('padding-left', '30px')
            prevBtn.click(function() {
                self.container.prevWorkClicked.call(self.container)
            });
        }
    },

    destroy: function() {
        $(window).unbind('scroll');
    }
});
