var app = {

    root: '/MDD/#',

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

    }

};





app.inOnLoad(function(){

    'use strict';

    var linkedInLogin;

    linkedInLogin = $('#linkedInLogin');

    function toggleBtn() {

        var loginBtn, loginHTML, logoutHTML;

        loginHTML = 'Sign in with LinkedIn <i class="fa fa-arrow-circle-o-right"></i>';
        logoutHTML = 'Logout of LinkedIn <i class="fa fa-sign-out"></i>';
        loginBtn = linkedInLogin.find('button');

        app.checkAuth(function () {
            loginBtn.html(logoutHTML);
        }, function () {
            loginBtn.html(loginHTML);
        });

    }

    linkedInLogin.on('mousedown', 'button', function () {

        app.checkAuth(function () {
            IN.User.logout(function () {
                toggleBtn();
            });
        }, function () {
            IN.User.authorize(function () {
                toggleBtn();
            });
        });

        return false;
    });

    toggleBtn();

});