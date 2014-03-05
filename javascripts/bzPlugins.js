/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/5/14
 * Time: 6:10 PM
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.contentView = function() {
        this.hideLeft = function(callback) {
            var prevLeft = this.position().left;
            this.css({position:"relative"});
            this.animate({left: -1.5*this.width()}, 300, "swing", function() {
                this.hide();
                this.css({left: prevLeft});
                callback();
            });
        };

        this.hideRight = function(callback) {
            var prevLeft = this.position().left;
            this.css({position:"relative"});
            this.animate({left: this.position().left + this.width()*1.5}, 300, "swing", function() {
                this.hide();
                this.css({left: prevLeft});
                callback();
            });
        };

        return this;
    }
})(jQuery);
