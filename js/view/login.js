(function(){

	var LoginView = Backbone.View.extend({

    	el: $('#pageContainer'),

	    template: Handlebars.compile($("#loginTemplate").html()),

	    events: {
	    	'click #login': 'login'
	    },

	    initialize: function () { },

	    render: function () {

	        this.$el.html(this.template);
	        return this;

	    },

	    login: function () {
	    	$('#login p').html('<i class="fa fa-spinner fa-spin" style="font-size: 2em;"></i>');
        	IN.User.authorize(function(){
        		app.pageRoute.navigate('//menu', { trigger: true });
        	});
	    }

	});

	app.views.LoginPage = new LoginView();

}());