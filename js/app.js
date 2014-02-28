var app = {

    inOnLoad: function (doThis) {

        'use strict';

        IN.Event.on(IN, 'frameworkLoaded', function(){

            doThis();

        });

    },

    checkAuth: function (param1, param2) {

        'use strict';

        this.inOnLoad(function(){

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

    registerPartials: function(){

        this.checkAuth(function(){

            Handlebars.registerPartial('header', $('#headerPartial').html());
            Handlebars.registerPartial('person', $('#personPartial').html());
            Handlebars.registerPartial('newConnection', $('#newConnectionPartial').html());
            Handlebars.registerPartial('sharedUpdate', $('#sharedUpdatePartial').html());

        }, true);

    },

    views: {},

    models: {},

    collections: {},

    events: {}

};

_.extend(app.events, Backbone.Events);

app.registerPartials();

Backbone.Collection.prototype.hasModel = function(modelRef){
    return Boolean(this.get(modelRef));
}

Backbone.Collection.prototype.getAll = function(){
    return this.models;
}

Handlebars.registerHelper('shortHeadline', function(headline){
    var hLength = headline.length;

    if(hLength > 30){
        headline = headline.substr(0, 30).trim() + '...';
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

Handlebars.registerHelper('updateDescription', function(textBlock){

    if(textBlock.length > 100){

        textBlock = textBlock.substr(0, 100).trim() + '...';

    }

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

Handlebars.registerHelper('logger', function(obj){
    console.log(obj);
});

Handlebars.registerHelper('getLength', function(obj){
    return obj.length;
});
