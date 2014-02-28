(function(){

    var ConnectionsView = Backbone.View.extend({

        collection: app.collections.connections,

        el: $('#pageContainer'),

        template: function(data){

            var source, template;

            source = $("#connectionsTemplate").html();
            template = Handlebars.compile(source);

            this.$el.html(template(data));

        },

        render: function () {

            var that = this;

            app.events.on('dataLoaded', function(){

                that.template(that.collection.getAll());
                app.events.off('dataLoaded');

            });

            return that;

        },

        loadData: function(){

            var that = this;

            IN.API.Raw('/people/~/connections').result(function(data){

                that.setData(data.values);

            });

        },

        setData: function(data){
            this.collection.push(data);
            app.events.trigger('dataLoaded');
        }

    });

    app.views.ConnectionsPage = new ConnectionsView();

}());