(function(){

    var ConnectionsView = Backbone.View.extend({

        el: $('#pageContainer'),

        template: Handlebars.compile($("#connectionsTemplate").html()),

        events: { },

        initialize: function () { },

        render: function () {

            var that = this;

            IN.API.Raw('/people/~/connections').result(function(data){
                data = data.values;
                that.$el.html(that.template(data));
            });

            return this;

        }

    });

    app.views.ConnectionsPage = new ConnectionsView();

}());