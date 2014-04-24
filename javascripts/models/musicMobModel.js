/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 4/25/14
 * Time: 1:57 AM
 * To change this template use File | Settings | File Templates.
 */

var musicMobModel = baseModel.extend({

    init: function() {
        this.data = {
            entryName:   "MusicMob",
            displayName: "MusicMob",
            entryDescription: "MusicMob is where everyone is a DJ. When music is playing via MusicMob, you can add songs to the playlist, or upvote songs that others have added",
            entryImage: "./images/myOnlineCv_preview.png",
            research: {
                businessGoals: [
                    "Get new users",
                    "Be unique in the music app market",
                    "Earn money using vendor partnership",
                    "Conserve users - give them a reason to come back to the app"
                ],
                personas: [
                    {
                        name: "Courtney",
                        age: "22",
                        profession: "The Barbie Girl",
                        image: "./images/MyOnlineCV/Personas/Ofri.png",
                        needs: "Be cool<br>Beautiful<br>Get Social"
                    },
                    {
                        name: "Geneysha",
                        age: "24",
                        profession: "The Out Loud Girl",
                        image: "./images/MyOnlineCV/Personas/Oren.png",
                        needs: "Ease of use<br>Be Social<br>Be In Control"
                    },
                    {
                        name: "Roy",
                        age: "32",
                        profession: "Copywriter",
                        image: "./images/MyOnlineCV/Personas/Mosh.png",
                        needs: "Be cool<br>beautiful"
                    },
                    {
                        name: "Muhamad",
                        age: "28",
                        profession: "Front-end Developer",
                        image: "./images/MyOnlineCV/Personas/Muhamad.png",
                        needs: "Be cool<br>beautiful<br>Give me power"
                    }
                ],

                conclusions: [
                    'Make the "resume creation process" fun & creative',
                    "Give power to advanced users",
                    "Give templates to less creative people"
                ]
            },
            navModel: {
                image: "./images/MyOnlineCV/nav-tree.png"
            },
            wireframes: {
                content:
                    [
                        {
                            image: "./images/MyOnlineCV/wireframes/pick_an_animal.png"
                        },
                        {
                            image: "./images/MyOnlineCV/wireframes/dashboard_advanced.png"
                        },
                        {
                            image: "./images/MyOnlineCV/wireframes/job_exp.png"
                        }
                    ]
            },

            prototype: {
                image: "./images/MyOnlineCV/wireframes/homepage.png",
                url: "http://invis.io/PZSI2RHK"
            }
        }
    }
});
