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
            self.containerView.replaceContent("myWork");
        });
        return self.content;
    }
});
