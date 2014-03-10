/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/10/14
 * Time: 1:35 PM
 * To change this template use File | Settings | File Templates.
 */

var myWorkEntry = View.extend({

    init: function(container, data) {
        this.container = container;
        this.data = data;
    },

    render: function() {
        var self = this;
        self.content = $("<div class='my-work-entry content-view'>aaaaa</div>");

        return self.content;
    }
});
