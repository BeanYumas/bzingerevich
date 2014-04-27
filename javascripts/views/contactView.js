/**
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

