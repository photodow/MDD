(function(){

    var ProfileView = Backbone.View.extend({

        model: app.models.profile,

        el: $('#pageContainer'),

        template: function(data){

            var source, template;

            source = $("#profileTemplate").html();
            template = Handlebars.compile(source);

            this.$el.html(template(data));

        },

        render: function () {

            var that = this;

            app.events.on('dataLoaded', function(){

                that.template(that.model.attributes);
                app.events.off('dataLoaded');

            });

            return that;

        },

        loadData: function(id){

            var that = this;

            if(id === null){
                id = '~';
            }else{
                id = 'id=' + id;
            }

            IN.API.Raw('/people/' + id + ':(first-name,last-name,headline,location:(name),summary,num-connections,id,picture-url,public-profile-url,primary-twitter-account,current-share,positions,num-connections-capped)').result(function(data){

                if(data.hasOwnProperty('pictureUrl')){
                    IN.API.Raw('/people/' + data.id + '/picture-urls::(original)').result(function(picture){
                        data.pictureUrl = picture.values[0];
                        that.setData(data);
                    });
                }else{
                    data.pictureUrl = '/MDD/img/no-picture.png';
                    that.setData(data);
                };

            });

        },

        setData: function(data){
            this.model.clear();
            this.model.set(data);
            app.events.trigger('dataLoaded');
        }

    });

    app.views.ProfilePage = new ProfileView();

}());