(function(){

    var StreamView = Backbone.View.extend({

        newConnections: app.collections.newConnections,
        sharedUpdates: app.collections.sharedUpdates,

        el: $('#pageContainer'),

        template: function(data){

            var source, template;

            source = $("#streamTemplate").html();
            template = Handlebars.compile(source);

            this.$el.html(template(data));

        },

        render: function () {

            var that = this;

            app.events.on('dataLoaded', function(){

                var data = {
                    newConnections: that.newConnections.getAll(),
                    sharedUpdates: that.sharedUpdates.getAll()
                }

                if(Backbone.history.fragment === 'stream'){
                    that.template(data);
                }

            });

            return that;

        },

        loadData: function(){

            var that = this;

            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday = yesterday.getTime()

            IN.API.Raw('/people/~/network/updates?type=CONN&count=5&start=0&after=' + yesterday).result(function(data){

                that.newConnections.reset();
                that.newConnections.add(data.values);
                app.events.trigger('dataLoaded');

            });

            IN.API.Raw('/people/~/network/updates?type=SHAR&count=150&start=0').result(function(data){

                that.sharedUpdates.push(data.values);
                app.events.trigger('dataLoaded');

            });

            

        }

    });

    app.views.StreamPage = new StreamView();

}());





/*(function(){

    var StreamView = Backbone.View.extend({

        el: $('#pageContainer'),

        template: Handlebars.compile($("#streamTemplate").html()),

        events: { },

        initialize: function () { },

        render: function () {

            var that = this;

            IN.API.Raw('/people/~/network/updates?type=SHAR&count=50&start=0').result(function(data){
                data = data.values;
                that.$el.html(that.template(data));
            });

            return this;

        },

        loadData: function(dataLoaded){

            dataLoaded(data);
            
        }

    });

    app.views.StreamPage = new StreamView();

}());*/