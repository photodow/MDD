(function(){

    var MenuView = Backbone.View.extend({

        el: $('#pageContainer'),

        template: _.template($("#menuTemplate").html()),

        events: { },

        initialize: function () { },

        render: function () {

            this.$el.html(this.template);
            return this;

        }

    });

    app.views.MenuPage = new MenuView();

}());