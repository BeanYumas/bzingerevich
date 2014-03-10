/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/5/14
 * Time: 8:15 PM
 * To change this template use File | Settings | File Templates.
 */

var whoAmIView = View.extend({

    myResume:
    {
        experience: {
            header: "Experience",
            entryContent: "<p>I am a UX Designer and a web developer.</p><p>I have been UXing (yeah, that's a new verb) for the past 5 years, and coding " +
                    'for the past 7.</p><p>I was a co-founder and Chief product officer of beeziko LTD (an Ed Tech startup).</p>' +
                    "<p>I worked as a front-end web developer @ Pluralis LTD. and as a front-end (back then it was GUI) Developer @ CheckPoint Software Technologies.</p>"
        },

        skills: {
            header: "Skills",
            entryContent: "<div class='skill'><div class='skill-name'>UX Design</div><div>&#10029;&#10029;&#10029;&#10029;&#10029;</div></div>" +
                "<div class='skill'><div class='skill-name'>Code</div><div>&#10029;&#10029;&#10029;&#10029;&#10029;</div></div>" +
                "<div class='skill'><div class='skill-name'>Graphic Design</div><div>&#10029;&#10029;&#10025;&#10025;&#10025;</div></div>"
        },

        education: {
            header: "Education",
            entryContent: "<p>UXV Certification course by Tal Florentin</p>" +
                "<p>Ben Gurion University : B.Sc Computer Science</p>" +
                "<p>Ben Gurion University : B.Sc Chemistry</p>"
        }
    },

    init: function(container) {
        this.container = container;
    },

    render: function() {
        var self = this;
        self.content =  $("<div class='my-resume content-view'><div class='myProfile'><div class='myImage'></div><div class='links'>" +
            "<a href='http://il.linkedin.com/pub/benny-zingerevich/38/102/164/' target='_blank'>LinkedIn Profile</a>" +
            "<a href='./files/benny_cv.pdf' download='benny_cv.pdf'>Download Print Version</a></div></div></div>");
        $.each(self.myResume, function(entryName, entryValue) {
            var entry = $("<div class='resumeEntry'><div class='header'> " +
                entryValue.header + "</div><div class='content'>" +
                entryValue.entryContent + "</div></div>");

            self.content.append(entry);
        });
        return self.content;
    }
});
