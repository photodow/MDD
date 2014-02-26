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

Handlebars.registerHelper('shortHeadline', function(headline){
    var hLength = headline.length;

    if(hLength > 35){
        headline = headline.substr(0, 35).trim() + '...';
    }

    if(headline === '.' || headline === '--' || headline === '-'){
        headline = false;
    }

    return headline;
});

Handlebars.registerHelper('handlePrivate', function(person, options){

    if(person.firstName === 'private'){
        person = false;
    }

    return options.fn(person);

});

Handlebars.registerHelper('formatParagraph', function(textBlock){

    textBlock = "<p>" + textBlock + "</p>";
    textBlock = textBlock.replace(/\r\n\r\n/g, "</p><p>").replace(/\n\n/g, "</p><p>");
    //result = result.replace(/\r\n/g, "<br />").replace(/\n/g, "<br />");
    return textBlock;

});

Handlebars.registerHelper('monthToText', function(numMonth, doWhat){

    var months, textMonth;

    months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    numMonth = numMonth - 1;

    if(doWhat === 'full'){
        textMonth = months[numMonth];
    }else{
        textMonth = months[numMonth].substr(0, 3);
    }

    return textMonth;

});

