/**
 * Created by Benny on 5/20/14.
 */
/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 4/8/14
 * Time: 12:50 PM
 * To change this template use File | Settings | File Templates.
 */

var antiProjWebsiteModel = baseModel.extend({

    init: function() {
        this.data = {
            entryName: "AntiProject Website",
            displayName: "AntiProject PR Website",
            entryDescription: "The AntiProject is an initiative to prevent women trafficking (slavery) by giving them a web based tool " +
                "to asses their abroad job offer when they get one.",
            entryImage: "./images/anti_project_preview.png",
            research: {
                businessGoals: [
                    "Stand out from other NGOs",
                    "Get donations from large donors and global organization",
                    "Convince volunteers to join"
                ],
                personas: [
                    {
                        name: "Suzanne",
                        age: "46",
                        profession: "The Influencer",
                        image: "./images/AntiProjectPR/Personas/Suzanne.png",
                        needs: "Help People<br>Be Effective"
                    },
                    {
                        name: "Gina",
                        age: "22",
                        profession: "The Save The World Girl",
                        image: "./images/AntiProjectPR/Personas/Gina.png",
                        needs: "Help People<br>Be Appreciated"
                    },
                    {
                        name: "Jacob",
                        age: "34",
                        profession: "The NGO Researcher",
                        image: "./images/AntiProjectPR/Personas/Jacob.png",
                        needs: "Get me data<br>Be Innovative"
                    }
                ],

                conclusions: [
                    'Shock. Get attention.',
                    "Be short in the tool's description",
                    "This is a hard sell, so tell a story"
                ]
            },
            navModel: {
                image: "./images/AntiProjectPR/nav-tree.png"
            },
            wireframes: {
                content:
                    [
                        {
                            image: "./images/AntiProjectPR/wireframes/marina_product.png"
                        },
                        {
                            image: "./images/AntiProjectPR/wireframes/migrationTool.png"
                        },
                        {
                            image: "./images/AntiProjectPR/wireframes/donate.png"
                        }
                    ]
            },

            prototype: {
                image: "./images/AntiProjectPR/wireframes/lp.png",
                url: "http://www.theantiproject.org/"
            }
        }
    }
});
