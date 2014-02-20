(function(){

    var ProfileView = Backbone.View.extend({

        el: $('#pageContainer'),

        template: Handlebars.compile($("#profileTemplate").html()),

        events: { },

        initialize: function () { },

        render: function () {

            this.$el.html(this.template(app.models.ProfileData));
            return this;

        }

    });

    app.views.ProfilePage = new ProfileView();

}());