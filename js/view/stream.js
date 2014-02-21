(function(){

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
                console.log(data);
            });

            return this;

        }

    });

    app.views.StreamPage = new StreamView();

}());