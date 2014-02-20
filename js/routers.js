(function(){

    'use strict';

    var init, PageRouters, redirectLogin, redirectMenu;

    redirectLogin = function () {
        console.log('user is not logged in, redirect');

        app.pageRoute.navigate('//login', { trigger: true });

    }

    redirectMenu = function () {

        app.pageRoute.navigate('//menu', { trigger: true });

    };

    PageRouters = Backbone.Router.extend({

        routes: {
            "login(/)": "login",
            "menu(/)": "menu",
            "profile(/)(:id)": "profile",
            "stream(/)": "stream",
            "*path": "notFound"
        },

        login: function () {

            app.checkAuth(redirectMenu, function(){
                app.views.LoginPage.render();
            });

        },

        menu: function () {

            app.checkAuth(function(){
                app.views.MenuPage.render();
            }, redirectLogin);

        },

        profile: function (id) {

            app.checkAuth(function(){

                if(id !== null){
                    console.log(id + ' profile');
                }else{
                    console.log('current user profile');
                }

                app.views.ProfilePage.render();

            }, redirectLogin);

        },

        stream: function () {

            app.checkAuth(function(){
                app.views.StreamPage.render();
            }, redirectLogin);

        },

        notFound: function () {

            app.checkAuth(redirectMenu, redirectLogin);

        }

    });

    init = function () {

        app.pageRoute = new PageRouters();

        app.inOnLogout(function(){ redirectLogin(); });
        app.inOnLogin(function(){ redirectMenu(); });

        Backbone.history.start({ root : "/MDD" });

    };

    init();

}());