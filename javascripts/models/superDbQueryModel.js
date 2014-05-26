/**
 * Created by Benny on 5/25/14.
 */

var superDbQueryModel = baseModel.extend({

    init: function() {
        this.data = {
            entryName:   "DbQuery",
            displayName: "DbQuery",
            entryDescription: "DbQuery is a tool for Support Managers, that allows them to search users by various filters and perform several actions on the results",
            entryImage: "./images/superDbOverview.png",
            research: {
                businessGoals: [
                    "Be easy to use",
                    "Mobile first - there will be a mobile app as well",
                    "Be fun - support managing isn't fun"
                ],
                personas: [
                    {
                        name: "Shlomit",
                        age: "28",
                        profession: "The girl that loves her work",
                        image: "./images/SuperDbQuery/Personas/Shlomit.png",
                        needs: "Prove herself<br>Be cool"
                    },
                    {
                        name: "Chaim",
                        age: "43",
                        profession: "The dedicated dad",
                        image: "./images/SuperDbQuery/Personas/chaim.png",
                        needs: "Don't work hard<br>Get home quickly<br>Work from home"
                    },
                    {
                        name: "Ilan",
                        age: "36",
                        profession: "The arrogant guy",
                        image: "./images/SuperDbQuery/Personas/Ilan.png",
                        needs: "Feel smart<br>Get the job done quickly"
                    }
                ],

                conclusions: [
                    'Save time & effort - make a dashboard for saved queries',
                    "Queries are complicated - make them as simple as a sentence",
                    "Make it a bit fun",
                    "Save time & effort - allow to edit a query while results are shown"
                ]
            },
            navModel: {
                image: "./images/SuperDbQuery/nav-tree.png"
            },
            wireframes: {
                content:
                    [
                        {
                            image: "./images/SuperDbQuery/wireframes/dashboard_advanced.png"
                        },
                        {
                            image: "./images/SuperDbQuery/wireframes/sentence_query.png"
                        },
                        {
                            image: "./images/SuperDbQuery/wireframes/fun.png"
                        },
                        {
                            image: "./images/SuperDbQuery/wireframes/edit_query.png"
                        }
                    ]
            },

            prototype: {
                image: "./images/superDbOverview.png",
                url: "http://invis.io/DEV178SH"
            }
        }
    }
});

