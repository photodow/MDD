(function(){

    var ProfileView = Backbone.View.extend({

        el: $('#pageContainer'),

        template: _.template($("#profileTemplate").html()),

        events: { },

        initialize: function () { },

        render: function () {

            this.$el.html(this.template);
            return this;

        }

    });

    app.views.ProfilePage = new ProfileView();

}());