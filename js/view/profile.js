(function(){

    var ProfileView = Backbone.View.extend({

        el: $('#pageContainer'),

        template: Handlebars.compile($("#profileTemplate").html()),

        events: { },

        initialize: function () { },

        render: function (id) {

            var that = this;

            IN.API.Raw('/people/' + id + ':(first-name,last-name,headline,location:(name),summary,picture-url)').result(function(data){
                that.$el.html(that.template(data));
            });

            return this;

        }

    });

    app.views.ProfilePage = new ProfileView();

}());