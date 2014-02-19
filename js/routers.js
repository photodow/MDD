function Routers () {

    'use strict';

    var init, PageRouters, page, redirectLogin, redirectMenu;

    redirectLogin = function () {

        page.navigate('//login', { trigger: true });

    }

    redirectMenu = function () {

        page.navigate('//menu', { trigger: true });

    };

    PageRouters = Backbone.Router.extend({

        routes: {
            "login(/)": "login",
            "menu(/)": "menu",
            "profile(/:id)": "profile",
            "stream(/)": "stream",
            "*path": "notFound"
        },

        login: function () {

            app.checkAuth(redirectMenu, true);

        },

        menu: function () {

            app.checkAuth(redirectLogin, false);

        },

        profile: function (id) {

            app.checkAuth(function(){

                if(id !== null){
                    console.log(id + ' profile');
                }else{
                    console.log('current user profile');
                }

            }, redirectLogin);

        },

        stream: function () {

            app.checkAuth(redirectLogin, false);

        },

        notFound: function () {

            app.checkAuth(redirectMenu, redirectLogin);

        }

    });

    init = function () {

        page = new PageRouters();

        app.inOnLogout(function(){ redirectLogin(); });
        app.inOnLogin(function(){ redirectMenu(); });

        Backbone.history.start();

    };

    init();

}

Routers();