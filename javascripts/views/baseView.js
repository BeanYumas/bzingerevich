/**
 * Created with JetBrains WebStorm.
 * User: admin
 * Date: 3/8/14
 * Time: 8:53 PM
 * To change this template use File | Settings | File Templates.
 */
var View = Class.extend({

    init: function(template) {
        this.template = template;
    },

    replaceTemplateStub: function(stub, content) {
        return this.template.replace(stub, content);
    }
});