(function(){

    var ConnectionsView = Backbone.View.extend({

        el: $('#pageContainer'),

        template: Handlebars.compile($("#connectionsTemplate").html()),

        events: { },

        initialize: function () { },

        render: function () {

            var that = this;

            IN.API.Raw('/people/~/connections:(first-name,last-name,headline,id,pictureUrl,location:(name))').result(function(data){
                Handlebars.registerPartial('header', $('#headerTemplate').html());
                data = data.values;
                that.$el.html(that.template(data));
            });

            return this;

        }

    });

    app.views.ConnectionsPage = new ConnectionsView();

}());