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
        self.content = $("<div class='entry-container'></div>").append(self.createContent());

        self.addHeader();

        self.fillContent(self.content);

        $(window).scroll(function(){
            self.scrolled(self);
        });

        return self.content;
    },

    createContent: function() {
        return $("<div class='my-work-entry content-view'>" +
            "<div class='entry-content'><section id='research'><div class='sub-section business-goals'><div class='title'>What are the Business Goals?</div></div>" +
            "<div class='sub-section personas'><div class='title'>Who are the Users?</div></div>" +
            "<div class='sub-section conclusions'><div class='title'>Conclusions</div></div>" +
            "</section>" +
            "<section id='nav-model'><div class='sub-section navigation-tree'><div class='title'>What is the screen flow?</div>" +
            "<div class='screen-flow-details'></div></div></section>" +
            "<section id='wireframes'><div class='sub-section'><div class='title'>Show me some screens!</div></div></section>" +
            "<section id='prototype'></div></div>");
    },
    ///////////////  research part //////////////////////////

    getBusinessGoals: function() {
        var research = this.model.getData().research;
        var businessGoals = $("<div class='goals-content content'></div>");
        $.each(research.businessGoals, function(index, goal) {
            businessGoals.append("<p>" + (index+1) + ". " + goal + "</p>");
        });
        return businessGoals;
    },

    getPersonas: function() {
        var research = this.model.getData().research;
        var personas = $("<ul class='persona-slider'></ul>");
        $.each(research.personas, function(index, persona) {
            personas.append("<li><div class='persona-container'><p class='persona-details'>"
                + persona.name + ", " + persona.age + "</p><p class='persona-profession'>" + persona.profession + "</p><div class='persona-image' style='background-image:url(\"" + persona.image + "\")';></div>" +
                "<div class='needs'>Needs</div><p class='persona-needs'>" + persona.needs + "</p></div></li>");
        });
        return personas;
    },

    getConclusions: function() {
        var research = this.model.getData().research;
        var conclusions = $("<ul class='conclusions-slider'></ul>");
        $.each(research.conclusions, function(index, conclusion) {
            var conclusionsContainer = $("<li><div class='conclusion-container'><div class='light-bulb'><p class='conclusion-details'>"
                + conclusion + "</p></div></div></li>");
            var innerContainer = $('.light-bulb', conclusionsContainer);
            switch(index%3) {
                case 0:
                    innerContainer.addClass('blue-conclusion');
                    break;
                case 1:
                    innerContainer.addClass('red-conclusion');
                    break;
                case 2:
                    innerContainer.addClass('green-conclusion');
                    break;
            }

            conclusions.append(conclusionsContainer.html())

        });
        return conclusions;
    },

    ////////////////////////////////////////////////////////


    ///////////////  Nav Model part //////////////////////////

    getNavModel: function() {
        var navModel = this.model.getData().navModel;
        var contents = $("<img class='nav-image' src='" + navModel.image + "';>");
        return contents;
    },

    ////////////////////////////////////////////////////////


    ///////////////  wireframes part //////////////////////////
    getWireframes: function() {
        var conclusions = this.model.getData().research.conclusions;
        var wireFrames = this.model.getData().wireframes;
        var contents = $("<div class='container-fluid'></div>");
        $.each(wireFrames.content, function(index, content) {
            var row = $("<div class='row-fluid conclusion-wireframe'><div class='span5 conclusion'><p class='conclusion-details'>" + conclusions[index] + "</p>" +
                "<img class='solution'></div>" +
                "<div class='span1 arrow'>&RightArrow;</div>" +
                "<div class='span6 wire-container'><img class='wireframe-image' src='" + content.image + "'></div></div>" +
                "</div>");
            var solution = $('.solution', row);
            index === 0? row.addClass('firstRow'): null;
            switch(index%3) {
                case 0:
                    solution.attr("src", './images/blue_light_bulb.svg');
                    break;
                case 1:
                    solution.attr("src", './images/red_light_bulb.svg');
                    break;
                case 2:
                    solution.attr("src", './images/green_light_bulb.svg');
                    break;
            }
            contents.append(row)
        });
       return contents;
    },
    ////////////////////////////////////////////////////////

    ///////////////  prototype part //////////////////////////

    getPrototype: function() {
        var prototype = this.model.getData().prototype;
        var image = $("<div class='sub-section'>" +
            "<a target='_blank' title='click to open prototype in invision' href='" + prototype.url + "'><div class='title prototype-title'>Open Live Prototype</div><img class='proto-image' src='" + prototype.image + "'></a>" +
            "</div><div class='next-work-preview'><div class='next-work-header'>View Next Work ></div>" +
            "<div class='row-fluid'><div class='span4 next-work-preview-img'></div><div class='span8 next-work-preview-text'>" +
            "<div class='entry-name'></div></div>" +
            "</div></div></section>");

        return image;
    },

    ////////////////////////////////////////////////////////

    afterShowView: function() {
        var personas = $('.persona-slider');
        personas.bxSlider({
            slideWidth: 300,
            minSlides: 1,
            moveSlides: 1,
            maxSlides: 4,
            slideMargin: 50,
            infiniteLoop: false,
            hideControlOnEnd: true,
            pager: false
        });

        var conclusion = $('.conclusions-slider');
        conclusion.bxSlider({
            slideWidth: 300,
            minSlides: 1,
            moveSlides: 1,
            maxSlides: 4,
            slideMargin: 50,
            infiniteLoop: false,
            hideControlOnEnd: true,
            pager: false
        });


        this.attachFancyBox();

        this.calculateSections();

        this.currSection = 0;
        this.scrolled(this);
    },

    attachFancyBox: function() {
        var navModel = this.model.getData().navModel;
        $('.nav-image').wrap("<a class='fancybox nav-image-link' rel='group' href='" + navModel.image +"'</a>");

        $('.wireframe-image').each(function(index, element) {
            $(element).wrap("<a class='fancybox' rel='group' href='" + element.src +"'></a>");
        });

        $(".fancybox").fancybox(
            {
                helpers: {
                    overlay: {
                        locked: false
                    }
                },
                arrows: false
            }
        );
    },

    fillContent: function(elementToFill) {
        //research
        $('.business-goals', elementToFill).append(this.getBusinessGoals());//businessGoals
        $('.personas', elementToFill).append(this.getPersonas());//personas
        $('.conclusions', elementToFill).append(this.getConclusions()); //conclusions

        //nav-model
        $('.screen-flow-details', elementToFill).append(this.getNavModel());

        //wireframes
        $('#wireframes', elementToFill).append(this.getWireframes());

        //prototype
        $('#prototype', elementToFill).append(this.getPrototype());
    },

    showNextWorkPrev: function() {
        var self = this;
        var nextWorkData = self.container.getNextWorkData();
        if(nextWorkData) {
            self.fillNextWorkPreview(nextWorkData);
            var nextWorkPrev = $(".next-work-preview");
            nextWorkPrev.css('left', $('body').width() - nextWorkPrev.width());
            nextWorkPrev.off("click");
            nextWorkPrev.click(function () {
                self.container.nextWorkClicked.call(self.container)
            });
            nextWorkPrev.fadeIn(300);
        }
    },

    hideNextWorkPrev: function() {
        var nextWorkPrev = $(".next-work-preview");
        nextWorkPrev.off("click");
        nextWorkPrev.fadeOut(100);
    },

    fillNextWorkPreview: function(nextWorkData) {
        var nextWorkPrev = $(".next-work-preview");
        var nextModelData = nextWorkData.getData();
        $('.entry-name', nextWorkPrev).html(nextModelData.displayName);
        $('.next-work-preview-img', nextWorkPrev).css('background-image', "url('" + nextModelData.entryImage + "')");
    },

    scrolled: function(self) {
        var sectionNum = self.findSectionNumber(self);

        if(self.currSection != sectionNum) {
            self.currSection = sectionNum;
            var allMenuItems = $('.menu-item a').removeClass('selected');
            $(allMenuItems[sectionNum]).addClass('selected');

            if(sectionNum == allMenuItems.length -1) {//moving toward the end = show the next work
                self.showNextWorkPrev();
            }
            else {
                self.hideNextWorkPrev();
            }
        }
    },

    calculateSections: function() {
        var self = this;
        var sections = $('.entry-content section');
        self.sectionsDistanceFromTop = [];
        var distanceFromTop = 0;
        self.sectionsDistanceFromTop.push(distanceFromTop);
        $.each(sections, function(index, section) {
            self.sectionsDistanceFromTop.push(distanceFromTop + $(section).height());
            distanceFromTop = distanceFromTop + $(section).height();
        });
    },

    findSectionNumber: function(self) {
        var scroll = $(window).scrollTop() + 200;
        for(var i=0; i < self.sectionsDistanceFromTop.length; i++) {
            if(i == self.sectionsDistanceFromTop.length ||
                (scroll >= self.sectionsDistanceFromTop[i] && scroll < self.sectionsDistanceFromTop[i+1])) {
                return i;
            }
        }
    },

    addHeader: function() {
        var header = $("<div class='fixed-header'>" +
            "<div class='row-fluid scroll-menu'>" +
            "<div class='span3 menu-item'><a class='selected' scrollTo='research'>Research</a></div>" +
            "<div class='span3 menu-item'><a scrollTo='nav-model'>Navigation Model</a></div>" +
            "<div class='span3 menu-item'><a scrollTo='wireframes'>Wireframes</a></div>" +
            "<div class='span3 menu-item'><a scrollTo='prototype'>Prototype</a></div>" +
        "</ul></nav></div>");

        this.currSection = 0;

        $('.menu-item a', header).click(function() {
            var clickedItem = $(this);
            $('.menu-item a').removeClass('selected');
            clickedItem.addClass('selected');
            $('body,html').animate({
                'scrollTop':   $('#' + clickedItem.attr('scrollTo')).offset().top - $('.fixed-header').height()
            }, 300);
        });

        this.fillDescriptionToHeader(header);

        $('.my-work-entry', this.content).before(header);//add the header
    },


    toggleHeaderBtns: function (headerToFill) {
        var self = this;
        var nextBtn = $(".my-next-work", headerToFill);
        if(nextBtn) {
            if (this.container.showNextWorkBtn()) {//there is a next button
                nextBtn.css('display', 'inline-block');
                nextBtn.off("click");
                nextBtn.click(function () {
                    self.container.nextWorkClicked.call(self.container)
                });
            }
            else {
                nextBtn.css('display', 'none');
            }
        }

        var prevBtn = $(".my-prev-work", headerToFill);

        if(prevBtn)
        {
            if (this.container.showPrevWorkBtn()) {//there is a next button
                prevBtn.css('display', 'inline-block');
                prevBtn.off("click");
                prevBtn.click(function () {
                    self.container.prevWorkClicked.call(self.container)
                });
            }
            else {
                prevBtn.css('display', 'none');
            }
        }
    },

    fillDescriptionToHeader: function(headerToFill) {
        var self = this;
        headerToFill.prepend("<div class='entryDetails'><div class='my-prev-work'><div>< Prev Work</div></div><div class='entry-name'>" + this.model.getData().entryName +"</div>" +
            "<div class='entry-description'><div>" + this.model.getData().entryDescription +"</div></div>" +
            "<div class='my-next-work'><div>Next Work ></div></div></div>");

        self.toggleHeaderBtns(headerToFill, self);
    },

    replaceHeaderContent: function(headerToFill) {
        var self = this;
       $('.entry-name, .entry-description').fadeOut( function() {
           $('.entry-name').html(self.model.getData().entryName);
           $('.entry-description div').html(self.model.getData().entryDescription);
           $('.entry-name, .entry-description').fadeIn();
           self.toggleHeaderBtns(headerToFill);
       });
    },

    replaceEntryContent: function(model, direction) {
        var self = this;
        self.model = model;
        var newContent =  self.createContent();
        self.fillContent(newContent);

        var container = $('.entry-container');
        container.css({"overflow-x" : "hidden"});
        var contentViewWidth = container.width();
        var oldContent = $('.my-work-entry');

        switch(direction) {
            case "left":
                newContent.hide().css({left: contentViewWidth});
                container.append(newContent);
                oldContent.animate({left: -contentViewWidth}, 200, "linear", function() {
                    oldContent.remove();
                });


                newContent.show(function() {
                    self.afterShowView();
                });
                self.replaceHeaderContent($('.fixed-header'));

                newContent.animate({left: 0}, 200, "linear", function () {
                    container.css({"overflow-x" : "visible"});
                });
                break;
            case "right":
                newContent.hide().css({left: -contentViewWidth});
                container.append(newContent);
                oldContent.animate({left: contentViewWidth}, 200, "linear", function() {
                    oldContent.remove();
                });


                newContent.show(function() {
                    self.afterShowView();
                });
                self.replaceHeaderContent($('.fixed-header'));

                newContent.animate({left: 0}, 200, "linear", function () {
                    container.css({"overflow-x" : "visible"});
                });
                break;
        }
    },

    destroy: function() {
        $(window).unbind('scroll');
    }
});
