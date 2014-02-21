var app = {

    inOnLoad: function (doThis) {

        'use strict';

        IN.Event.on(IN, 'frameworkLoaded', function(){

            doThis();

        });

    },

    checkAuth: function (param1, param2) {

        'use strict';

        app.inOnLoad(function(){

            if (typeof param1 === 'function') {

                var authStatus, authTrue, authFalse;

                authStatus = IN.User.isAuthorized();
                authTrue = param1;

                if (typeof param2 === 'function') {

                    authFalse = param2;

                    if (authStatus) {

                        authTrue();

                    } else {

                        authFalse();

                    }

                } else if (String(param2) === 'false') {

                    authFalse = param1;

                    if (!authStatus) {

                        authFalse();

                    }

                } else {

                    if (authStatus) {

                        authTrue();

                    }

                }

            }

        });

    },

    inOnLogin: function (doThis) {

        IN.Event.on(IN, 'auth', function(){

            doThis();

        });

    },

    inOnLogout: function (doThis) {

        IN.Event.on(IN, 'logout', function(){

            doThis();

        });

    },

    views: {},

    models: {},

    events: {}

};

_.extend(app.events, Backbone.Events);

