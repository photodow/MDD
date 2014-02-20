(function(){

	var LoginView = Backbone.View.extend({

    	el: $('#pageContainer'),

	    template: Handlebars.compile($("#loginTemplate").html()),

	    events: {
	    	'click #linkedInLogin button': 'login'
	    },

	    initialize: function () { },

	    render: function () {

	        this.$el.html(this.template);
	        return this;

	    },

	    login: function () {
	        app.inOnLoad(function(){
	        	IN.User.authorize();
	        });
	    }

	});

	app.views.LoginPage = new LoginView();

}());