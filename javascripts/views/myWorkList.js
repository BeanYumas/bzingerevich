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
        $.each(self.myWorkModels, function(modelName, modelValue) {
           var row = $("<div class='row work-entry'><div class='span3'><div class='my-work-preview-img'><img src='" + modelValue.getData().entryImage +
               "'></div></div><div class='span9'><div class='entry-header'>" + modelValue.getData().displayName +
               "</div><div class='my-work-preview-text'>" + modelValue.getData().entryDescription + "</div></div></div>");
            row.click(function() {
               self.container.myWorkItemClicked(modelValue.getData().entryName);
            });
            self.content.append(row);
        });

        return self.content;
    }
});
