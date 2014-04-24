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
            "<div class='entry-content'><section id='research'><div class='sub-section business-goals'><div class='title'>What are the Business Goals?</div></div>" +
            "<div class='sub-section personas'><div class='title'>Who are the Users?</div></div>" +
            "<div class='sub-section conclusions'><div class='title'>Conclusions</div></div>" +
            "</section>" +
            "<section id='nav-model'><div class='sub-section navigation-tree'><div class='title'>What is the screen flow?</div>" +
            "<div class='screen-flow-details'></div></div></section>" +
            "<section id='wireframes'><div class='sub-section'><div class='title'>Show me some screens!</div></div></section>" +
            "<section id='prototype'><div class='sub-section'><div class='title'>Let me try it!</div></div></section></div></div></div>");

        self.addHeader();

        self.fillContent();

        $(window).scroll(function(){
            self.scrolled(self);
        });

        return self.content;
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
            var row = $("<div class='row conclusion-wireframe'><div class='span4 light-bulb'><p class='conclusion-details'>" + conclusions[index] + "</p></div>" +
                "<div class='span3 arrow'>&RightArrow;</div>" +
                "<div class='span5'><img class='wireframe-image' src='" + content.image + "'></div></div>" +
                "</div>");
            var solution = $('.light-bulb', row);
            switch(index%3) {
                case 0:
                    row.addClass('firstRow');
                    solution.addClass('blue-conclusion');
                    break;
                case 1:
                    solution.addClass('red-conclusion');
                    break;
                case 2:
                    solution.addClass('green-conclusion');
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
        var image = $("<a target='_blank' title='click to open prototype in invision' href='" + prototype.url + "'><img class='proto-image' src='" + prototype.image + "'></a>");

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
    },

    attachFancyBox: function() {
        var navModel = this.model.getData().navModel;
        $('.nav-image').wrap("<a class='fancybox nav-image-link' rel='group' href='" + navModel.image +"'</a>");

        $('.wireframe-image').each(function(index, element) {
            $(element).wrap("<a class='fancybox' rel='group' href='" + element.src +"'</a>");
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

    fillContent: function() {
        //research
        $('.business-goals', this.content).append(this.getBusinessGoals());//businessGoals
        $('.personas', this.content).append(this.getPersonas());//personas
        $('.conclusions', this.content).append(this.getConclusions()); //conclusions

        //nav-model
        $('.screen-flow-details', this.content).append(this.getNavModel());

        //wireframes
        $('#wireframes', this.content).append(this.getWireframes());

        //prototype
        $('#prototype', this.content).append(this.getPrototype());
    },

    scrolled: function(self) {
        var sectionNum = self.findSectionNumber(self)

        if(self.currSection != sectionNum) {
            self.currSection = sectionNum;
            var allMenuItems = $('.menu-item a').removeClass('selected');
            $(allMenuItems[sectionNum]).addClass('selected');
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
        var scroll = $(document.body).scrollTop() + 200;
        for(var i=0; i < self.sectionsDistanceFromTop.length; i++) {
            if(i == self.sectionsDistanceFromTop.length ||
                (scroll >= self.sectionsDistanceFromTop[i] && scroll < self.sectionsDistanceFromTop[i+1])) {
                return i;
            }
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

        this.currSection = 0;

        $('.menu-item a', header).click(function() {
            var clickedItem = $(this);
            $('.menu-item a').removeClass('selected');
            clickedItem.addClass('selected');
            $(document.body).animate({
                'scrollTop':   $('#' + clickedItem.attr('scrollTo')).offset().top - $('.fixed-header').height()
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
            $('.entry-name', headerToFill).css('padding-left', '30px');
            prevBtn.click(function() {
                self.container.prevWorkClicked.call(self.container)
            });
        }
    },

    destroy: function() {
        $(window).unbind('scroll');
    }
});
