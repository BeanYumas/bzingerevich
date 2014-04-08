/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/10/14
 * Time: 10:38 AM
 * To change this template use File | Settings | File Templates.
 */

var myWorkList = View.extend({
   listItems: {
      Slender : {
          workName: "Slender",
          imageSrc: "./images/slender_preview.png",
          workContent: "Slender lets students take notes, collect their classmates' notes and any other study materials (PDFs, PPTs, etc.)." +
              "The best, most relevant study material, pops up in Slender automatically, so adding it is as easy as swiping your finger."
      },

       MyOnlineCV : {
           workName: "MyOnlineCV",
           imageSrc: "./images/myOnlineCv_preview.png",
           workContent: "MyOnlineCV is a platform that helps job candidates from the area of HiTech and Creative, easily create cool & innovative " +
               "resumes."
       },

       CSI : {
           workName: "CSI iPhone App",
           imageSrc: "./images/csi_preview.png",
           workContent: "With the CSI iPhone App, the investigator's life is much easier." +
               "She can manage her crime scenes, collect evidence and photos in an organized manner, and all on her iPhone."
       }
   },

    init: function(container) {
        this.container = container;
    },

    render: function() {
        var self = this;
        self.content = $("<div class='my-work-list content-view'></div>");
        $.each(self.listItems, function(itemName, itemValue) {
           var row = $("<div class='row work-entry'><div class='span3'><div class='my-work-preview-img'><img src='" + itemValue.imageSrc +
               "'></div></div><div class='span9'><div class='entry-header'>" + itemValue.workName +
               "</div><div class='my-work-preview-text'>" + itemValue.workContent + "</div></div></div>");
            row.click(function() {
               self.container.myWorkItemClicked(itemName);
            });
            self.content.append(row);
        });

        return self.content;
    }
});
