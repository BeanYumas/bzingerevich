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
            entryDescription: "MusicMob is where everyone is a DJ.<br>When music is playing via MusicMob, you can add songs to the playlist, or upvote songs that others have added.",
            entryImage: "./images/MusicMob_preview.png",
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
                        image: "./images/MusicMob/Personas/courtney.png",
                        needs: "Be cool<br>Beautiful<br>Get Social"
                    },
                    {
                        name: "Geneysha",
                        age: "24",
                        profession: "The Out Loud Girl",
                        image: "./images/MusicMob/Personas/geneysha.png",
                        needs: "Ease of use<br>Get Social<br>Be In Control"
                    },
                    {
                        name: "Roy",
                        age: "32",
                        profession: "The Film Student",
                        image: "./images/MusicMob/Personas/roy.png",
                        needs: "Be Innovative<br>Get Social"
                    },
                    {
                        name: "Jake",
                        age: "34",
                        profession: "The Music Blogger",
                        image: "./images/MusicMob/Personas/jake.png",
                        needs: "Be Innovative<br>Be Well Deisgned<br>Be In Control"
                    },
                    {
                        name: "Jeff",
                        age: "42",
                        profession: "The BBQ Guy",
                        image: "./images/MusicMob/Personas/Jeff.png",
                        needs: "Be Simple<br>Feel Secured"
                    }
                ],

                conclusions: [
                    'Show the social element during the party',
                    "Give control to the party owner when creating",
                    "Give the user a reason to come back - history & favorites"
                ]
            },
            navModel: {
                image: "./images/MusicMob/nav-tree.png"
            },
            wireframes: {
                content:
                    [
                        {
                            image: "./images/MusicMob/wireframes/party.png"
                        },
                        {
                            image: "./images/MusicMob/wireframes/create.png"
                        },
                        {
                            image: "./images/MusicMob/wireframes/favorites.png"
                        }
                    ]
            },

            prototype: {
                image: "./images/MusicMob/wireframes/homepage.png",
                url: "https://projects.invisionapp.com/share/RJPVFDBG#/screens"
            }
        }
    }
});
