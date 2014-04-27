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
            entryImage: "./images/csi_preview.png",
            research: {
                businessGoals: [
                    "Don't get in the way - make the work easier",
                    "Use the SmartPhone abilities",
                    "Be Innovative"
                ],
                    personas: [
                    {
                        name: "Joe",
                        age: "46",
                        profession: "The Veteran",
                        image: "./images/CSIMobileApp/Personas/Joe.png",
                        needs: "Feel he's the boss<br>Simplicity"
                    },
                    {
                        name: "Allan",
                        age: "30",
                        profession: "The Lab Rat",
                        image: "./images/CSIMobileApp/Personas/Allan.png",
                        needs: "Feel sophisticated"
                    },
                    {
                        name: "Rachel",
                        age: "34",
                        profession: "The Mother",
                        image: "./images/CSIMobileApp/Personas/Rachel.png",
                        needs: "Get access from home<br>Connect with colleagues"
                    },
                    {
                        name: "Omar",
                        age: "24",
                        profession: "The Youngster",
                        image: "./images/CSIMobileApp/Personas/Omar.png",
                        needs: "Prove himself<br>Get Feedback<br>Connect with colleagues"
                    }
                ],

                    conclusions: [
                    'Less typing, more taps & photos',
                    "Allow access to old investigations by location",
                    "Adding multiple images in one action is important"
                ]
            },
            navModel: {
                image: "./images/CSIMobileApp/nav-tree.png"
            },
            wireframes: {
                content:
                    [
                        {
                            image: "./images/CSIMobileApp/wireframes/added_evidence.png"
                        },
                        {
                            image: "./images/CSIMobileApp/wireframes/crime_scene_list.png"
                        },
                        {
                            image: "./images/CSIMobileApp/wireframes/add_photo.png"
                        }
                    ]
            },

            prototype: {
                image: "./images/CSIMobileApp/wireframes/hello.png",
                    url: "http://invis.io/WVSMG1Z9"
            }
        }
    }
});