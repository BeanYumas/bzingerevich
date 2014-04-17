/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 4/9/14
 * Time: 12:27 AM
 * To change this template use File | Settings | File Templates.
 */

var onlineCVModel = baseModel.extend({

    init: function() {
        this.data = {
            entryName:   "MyOnlineCV",
            displayName: "MyOnlineCV",
            entryDescription: "MyOnlineCV is a platform that helps job candidates from the fields of Creative & HiTech, easily create cool & innovative " +
                "resumes.",
            entryImage: "./images/myOnlineCv_preview.png",
            research: {
                businessGoals: [
                    "Let the user Create Cool and innovative resumes",
                    "Make the process of resume creation easy",
                    "Give the user an advantage in the job searching market",
                    "Brand MyOnlineCv as the place to create resumes for creative candidates"
                    ],
                personas: [
                    {
                        name: "Ofri",
                        age: "24",
                        profession: "Newly graduated designer",
                        image: "./images/MyOnlineCV/Personas/Ofri.png",
                        needs: "Be cool<br>beautiful<br>quick to use"
                    },
                    {
                        name: "Oren",
                        age: "38",
                        profession: "algorithm engineer",
                        image: "./images/MyOnlineCV/Personas/Oren.png",
                        needs: "Ease of use<br>prettify my work"
                    },
                    {
                        name: "Mosh",
                        age: "32",
                        profession: "Copywriter",
                        image: "./images/MyOnlineCV/Personas/Mosh.png",
                        needs: "Be cool<br>beautiful"
                    },
                    {
                        name: "Muhamad",
                        age: "27",
                        profession: "Front-end Developer",
                        image: "./images/MyOnlineCV/Personas/Muhamad.png",
                        needs: "Be cool<br>beautiful<br>Give me power"
                    }
                ],

                conclusions: [
                    "Catch attention with cool and creative stuff",
                    "Give power to advanced users",
                    'Make the "resume creation process" fun',
                    "Give templates to less creative people",
                    "Show progress in the resume creation process"
                ]
            }
        }
    }

});