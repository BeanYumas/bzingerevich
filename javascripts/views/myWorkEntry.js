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
            "<div class='entry-content'><section id='research'>aaaa</section>" +
            "<section id='nav-model'>bbb</section>" +
            "<section id='wireframes'>cccc</section>" +
            "<section id='prototype'>ddd</section></div></div></div>");

        self.addHeader();

        return self.content;
    },

    addHeader: function() {
        var header = $("<div class='fixed-header'>" +
            "<nav role='navigation' class='scroll-menu'><ul>" +
            "<li class='menu-item'><a href='#research'>Research</a></li>" +
            "<li class='menu-item'><a href='#nav-model'>Navigation Model</a></li>" +
            "<li class='menu-item'><a href='#wireframes'>Wireframes</a></li>" +
            "<li class='menu-item'><a href='#prototype'>Prototype</a></li>" +
        "</ul></nav></div>");

        this.fillDescriptionToHeader(header);

        $('.my-work-entry', this.content).before(header);//add the header
    },

    fillDescriptionToHeader: function(headerToFill) {
        headerToFill.prepend("<div class='entryDetails'><div class='entry-name'>" + this.model.getData().entryName +"</div>" +
            "<div class='entry-description'><div>" + this.model.getData().entryDescription +"</div></div></div>");
    }
});
