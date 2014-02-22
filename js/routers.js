(function(){

    'use strict';

    var init, PageRouters, redirectLogin, redirectMenu;

    redirectLogin = function () {

        app.pageRoute.navigate('//login', { trigger: true });

    }

    redirectMenu = function () {

        app.pageRoute.navigate('//menu', { trigger: true });

    };

    PageRouters = Backbone.Router.extend({

        routes: {
            "login(/)": "login",
            "logout(/)": "logout",
            "menu(/)": "menu",
            "profile(/)(:id)": "profile",
            "stream(/)": "stream",
            "connections(/)": "connections",
            "*path": "notFound"
        },

        login: function () {

            app.checkAuth(redirectMenu, function(){
                app.views.LoginPage.render();
            });

        },

        logout: function() {

            app.checkAuth(function(){
                IN.User.logout();
            }, redirectLogin);

        },

        menu: function () {

            app.checkAuth(function(){
                app.views.MenuPage.render();
            }, redirectLogin);

        },

        profile: function (id) {

            app.checkAuth(function(){

                if(id === null){
                    id = '~';
                }else{
                    id = 'id=' + id;
                }

                app.views.ProfilePage.render(id);

            }, redirectLogin);

        },

        stream: function () {

            app.checkAuth(function(){
                app.views.StreamPage.render();
            }, redirectLogin);

        },

        connections: function () {

            app.checkAuth(function(){
                app.views.ConnectionsPage.render();
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
        app.pageRoute.on('route', function(){ window.scrollTo(0,0); });

        Backbone.history.start({ root : "/MDD/" });

    };

    init();

}());