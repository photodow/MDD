(function(){

    var ProfileView = Backbone.View.extend({

        el: $('#pageContainer'),

        template: Handlebars.compile($("#profileTemplate").html()),

        events: { },

        initialize: function () { },

        render: function (id) {

            var that = this;

            IN.API.Raw('/people/' + id + ':(first-name,last-name,headline,location:(name),summary,num-connections,id,picture-url,public-profile-url,primary-twitter-account,current-share,positions)').result(function(data){
                var profileData = data;

                if(profileData.hasOwnProperty('pictureUrl')){
                    IN.API.Raw('/people/' + profileData.id + '/picture-urls::(original)').result(function(data){
                        renderView(data.values[0]);
                    });
                }else{
                    renderView('/MDD/img/no-picture.png');
                };

                function renderView(getPicture){
                    profileData.pictureUrl = getPicture;
                    Handlebars.registerPartial('header', $('#headerTemplate').html());
                    that.$el.html(that.template(profileData));
                }
            });

            return this;

        }

    });

    app.views.ProfilePage = new ProfileView();

}());