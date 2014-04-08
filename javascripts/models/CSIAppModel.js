/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 4/8/14
 * Time: 12:50 PM
 * To change this template use File | Settings | File Templates.
 */

var csiAppModel = baseModel.extend({

    init: function() {
        this.data = {
            entryName: "CSI",
            displayName: "CSI iPhone App",
            entryDescription: "With the CSI iPhone App, the investigator's life is much easier." +
                "She can manage her crime scenes, collect evidence and photos in an organized manner, and all on her iPhone.",
            entryImage: "./images/csi_preview.png"
        }
    }

});