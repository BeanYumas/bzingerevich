/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/8/14
 * Time: 8:53 PM
 * To change this template use File | Settings | File Templates.
 */
var View = Class.extend({

    init: function(template) {
        this.template = template;
    },

    replaceTemplateStub: function(stub, content) {
        return this.template.replace(stub, content);
    },

    afterShowView: function() {

    }
});/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 4/27/14
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */

var contactView = View.extend({
    init: function(containerView) {
        this.containerView = containerView;
    },

    render: function() {
        var self = this;
        self.content = $('<div class="contact content-view"><div class="contact-me">You can contact me via mail in <a class="my-email" target="_blank" href="mailto:benny@beeziko.com">benny@beeziko.com</a>' +
            '</div><div class="movies-header"><p>It will take me at least 6 seconds to respond.<br>So here is another 6 seconds worth spending:</p></div>' +
            '<iframe width="420" height="315" src="https://www.youtube.com/embed/rfh4Mhp-a6U" frameborder="0" allowfullscreen></iframe>' +
            '</div>');

        return self.content;
    }
});

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
            new musicMobModel(),
            new csiAppModel(),
            new onlineCVModel()
        ];

        this.allViews = {
            'welcomeView' : new welcomeView(this),
            'contact' : new contactView(),
            'whoAmI'      : new whoAmIView(this),
            'myWork'      : new myWorkList(this, this.myWorkModels),
            'myWorkEntry'      : new myWorkEntry(this, this.getMyWorkData(0))
        };

        this.currMyWorkItem = 0;

        this.currView = this.allViews.welcomeView;
    },

    render: function() {
        $('#content-container').append(this.currView.render());
    },

    replaceContent: function(toView, animation) {
        var self = this;

        if(toView == "myWorkEntry") {
            delete self.allViews["myWorkEntry"];
            self.allViews["myWorkEntry"] = new myWorkEntry(this, this.getMyWorkData(0));
            self.currMyWorkItem = 0;
        }

        var currViewRendered = $('#content-container').children();
        var oldView = self.currView;
        self.currView = self.allViews[toView];
        var newViewRendered = self.currView.render();

        var destroy = function() {
            if(oldView.destroy) {
                oldView.destroy();
            }
        }

        switch(animation) {
            case 'fadeOut' :
               self.fadeReplacement(currViewRendered, newViewRendered, destroy);
               break;
            case 'hideLeft':
                self.hideLeft(currViewRendered, newViewRendered, destroy);
                break;
            default:
                self.fadeReplacement(currViewRendered, newViewRendered, destroy);
                break;
        }

        var replacemebtView = (toView == "myWorkEntry")? "myWork" : toView;
        self.controller.contentViewReplaced(replacemebtView);

        ga('send', 'event', 'viewReplaced', 'nextWorkClicked', toView);
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

    replaceWorkItem: function(workItemIndex, direction) {
        var self = this;
        var workData = this.getMyWorkData(workItemIndex);
        ga('send', 'event', 'viewReplaced', 'nextWorkClicked', workData.getData().entryName);
        self.allViews["myWorkEntry"].replaceEntryContent(workData, direction);
        self.currMyWorkItem = workItemIndex;
    },

    prevWorkClicked: function() {
        if(this.currMyWorkItem > 0)
        {
            this.replaceWorkItem(this.currMyWorkItem - 1, "right");
        }
    },

    getNextWorkData: function() {
        var data = null;
        if(this.currMyWorkItem < this.myWorkModels.length-1) {
            var self = this;
            data = self.getMyWorkData(self.currMyWorkItem + 1);
        }
        return data;
    },


    nextWorkClicked: function() {
        if(this.currMyWorkItem < this.myWorkModels.length-1)
        {
            this.replaceWorkItem(this.currMyWorkItem + 1, "left");
        }
    },

    showNextWorkBtn: function() {
        return (this.currView instanceof myWorkEntry) && this.currMyWorkItem < this.myWorkModels.length-1;
    },

    fadeReplacement: function(currView, nextView, cb) {
        var self = this;
        nextView.css("display", "none");
        currView.fadeOut(300, function() {
            $('#content-container').children().remove();
            $('#content-container').append(nextView);

            $(document.body).scrollTop(0);
            nextView.fadeIn(300, function() {
                cb();
            });
            if(self.currView.afterShowView)
            {
                self.currView.afterShowView();
            }
        });
    },

    hideLeft: function(currView, nextView, cb) {
        var self = this;
        var container = $('#content-container');
        container.css({"overflow-x" : "hidden"});
        var contentViewWidth = container.width();
        nextView.hide().css({left: contentViewWidth});
        container.append(nextView);
        currView.animate({left: -contentViewWidth}, 300, "linear", function() {
            currView.remove();
            cb();
            container.css({"overflow-x" : "visible"});
        });


        nextView.show(function() {
        });
        nextView.animate({left: 0}, 300, "linear", function () {
            if(self.currView.afterShowView)
            {
                self.currView.afterShowView();
            }
        });
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
                nextBtn.css('display', 'table-cell');
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
                prevBtn.css('display', 'table-cell');
                $('.entry-name', headerToFill).css('padding-left', '30px');
                prevBtn.off("click");
                prevBtn.click(function () {
                    self.container.prevWorkClicked.call(self.container)
                });
            }
            else {
                prevBtn.css('display', 'none');
                $('.entry-name', headerToFill).css('padding-left', '5%');
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
/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/10/14
 * Time: 10:38 AM
 * To change this template use File | Settings | File Templates.
 */

var myWorkList = View.extend({
    init: function(container, myWorkModels) {
        this.container = container;
        this.myWorkModels =  myWorkModels;
    },

    render: function() {
        var self = this;
        self.content = $("<div class='my-work-list content-view'></div>");
        $.each(self.myWorkModels, function(index, modelValue) {
           var row = $("<div class='row work-entry'><div class='span3'><div class='my-work-preview-img'><img src='" + modelValue.getData().entryImage +
               "'></div></div><div class='span9'><div class='entry-header'>" + modelValue.getData().displayName +
               "</div><div class='my-work-preview-text'>" + modelValue.getData().entryDescription + "</div></div></div>");
            row.click(function() {
               self.container.myWorkItemClicked(index);
            });
            self.content.append(row);
        });

        return self.content;
    }
});
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
                    self.controller.replaceContentView("myWorkEntry");
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
/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/8/14
 * Time: 9:14 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/8/14
 * Time: 9:00 PM
 * To change this template use File | Settings | File Templates.
 */

var sideBarMenu = View.extend({
    init: function(menuItems) {
        this.menuItems = menuItems;
    },

    render: function() {
        var self = this;
        var menus = $("<div></div>");
        var mItem;
        for (var item in self.menuItems) {
            mItem = $("<div class='mItem'>" + self.menuItems[item].text + "<div class='selectionbar'></div></div>");
            mItem.attr("id", item);
            mItem.click(function(){
                $('.mItem').removeClass('selected');
                $(this).addClass('selected');
                self.menuItems[$(this).attr('id')].click();
            });
            menus.append(mItem);
        }
        $('.mItem', menus).first().addClass('selected');
        return menus;
    },

    setSelected: function(menuItemName) {
        var menuItem = $('#' + menuItemName);
        if(menuItem && this.menuItems[menuItemName]) {
            $('.mItem').removeClass('selected');
            menuItem.addClass('selected');
        }
    }
});

/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/8/14
 * Time: 10:34 PM
 * To change this template use File | Settings | File Templates.
 */

var welcomeView = View.extend({
    init: function(containerView) {
        this.containerView = containerView;
    },

    render: function() {
        var self = this;
        self.content = $('<div class="lp content-view"><div class="opening-quote">&quot;Everything that is beautiful and noble is the product of reason and calculation.&quot;</div>' +
        '<div class="source">Charles Baudelaire</div><div class="buttons-container"><div class="btnContainer left">' +
        '<div id="blue-btn-welcome" class="inline-btn blue-btn">Who Am I</div></div><div class="btnContainer">' +
        '<div id="red-btn-welcome" class="inline-btn red-btn">My Work</div></div></div></div>');

        $('.blue-btn', self.content).click(function () {
            self.containerView.replaceContent("whoAmI");
        });

        $('.red-btn', self.content).click(function () {
            self.containerView.myWorkItemClicked(0);
        });
        return self.content;
    }
});
/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/5/14
 * Time: 8:15 PM
 * To change this template use File | Settings | File Templates.
 */

var whoAmIView = View.extend({

    myResume:
    {
        experience: {
            header: "Experience",
            entryContent: "<p>I am a UX Designer and a web developer.</p><p>I have been UXing for the past 5 years, and coding " +
                    'for the past 7.</p><p>I was a co-founder and Chief product officer of beeziko LTD (an Ed Tech startup).</p>' +
                    "<p>I worked as a front-end web developer @ Pluralis LTD. and as a front-end Developer @ CheckPoint Software Technologies.</p>"
        },

        skills: {
            header: "Skills",
            entryContent: "<div class='skill'><div class='skill-name'>UX Design</div><div>&#10029;&#10029;&#10029;&#10029;&#10029;</div></div>" +
                "<div class='skill'><div class='skill-name'>Code</div><div>&#10029;&#10029;&#10029;&#10029;&#10029;</div></div>" +
                "<div class='skill'><div class='skill-name'>Graphic Design</div><div>&#10029;&#10029;&#10025;&#10025;&#10025;</div></div>"
        },

        education: {
            header: "Education",
            entryContent: "<p>UXV Certification course by Tal Florentin</p>" +
                "<p>Ben Gurion University : B.Sc Computer Science</p>" +
                "<p>Ben Gurion University : B.Sc Chemistry</p>"
        }
    },

    init: function(container) {
        this.container = container;
    },

    render: function() {
        var self = this;
        self.content =  $("<div class='my-resume content-view'><div class='myProfile'><div class='myImage'></div><div class='links'>" +
            "<a href='http://il.linkedin.com/pub/benny-zingerevich/38/102/164/' target='_blank'>LinkedIn Profile</a>" +
            "<a href='./files/benny_cv.pdf' download='benny_cv.pdf'>Download Print Version</a></div></div></div>");
        $.each(self.myResume, function(entryName, entryValue) {
            var entry = $("<div class='resumeEntry'><div class='header'> " +
                entryValue.header + "</div><div class='content'>" +
                entryValue.entryContent + "</div></div>");

            self.content.append(entry);
        });
        return self.content;
    }
});
