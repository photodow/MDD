(function(){

    var StreamView = Backbone.View.extend({

        el: $('#pageContainer'),

        template: Handlebars.compile($("#streamTemplate").html()),

        events: { },

        initialize: function () { },

        render: function () {

            this.$el.html(this.template(app.models.StreamData));
            return this;

        }

    });

    app.views.StreamPage = new StreamView();

}());