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

