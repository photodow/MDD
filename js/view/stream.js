(function(){

    var StreamView = Backbone.View.extend({

        el: $('#pageContainer'),

        template: _.template($("#streamTemplate").html()),

        events: { },

        initialize: function () { },

        render: function () {

            this.$el.html(this.template);
            return this;

        }

    });

    app.views.StreamPage = new StreamView();

}());