(function(){

    var MenuView = Backbone.View.extend({

        el: $('#pageContainer'),

        template: Handlebars.compile($("#menuTemplate").html()),

        events: { },

        initialize: function () { },

        render: function () {

            this.$el.html(this.template);
            return this;

        }

    });

    app.views.MenuPage = new MenuView();

}());