function authStatus(authorized, notAuthorized) {

    'use strict';

    if (IN.User.isAuthorized()) {
        authorized();
    } else {
        notAuthorized();
    }

}

function LinkedIn() {

    'use strict';

    (function () {

        var linkedInLogin;

        linkedInLogin = $('#linkedInLogin');

        function toggleBtn() {

            var loginBtn, loginHTML, logoutHTML;

            loginHTML = 'Sign in with LinkedIn <i class="fa fa-arrow-circle-o-right"></i>';
            logoutHTML = 'Logout of LinkedIn <i class="fa fa-sign-out"></i>';
            loginBtn = linkedInLogin.find('button');

            authStatus(function () {
                loginBtn.html(logoutHTML);
            }, function () {
                loginBtn.html(loginHTML);
            });

        }

        linkedInLogin.on('mousedown', 'button', function () {

            authStatus(function () {
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

    }());

}