(function(){

	app.models.Person = Backbone.Model.extend();
	app.models.NetworkUpdate = Backbone.Model.extend();

	app.collections.People = Backbone.Collection.extend({ model: app.models.Person });
	app.collections.NetworkUpdates = Backbone.Collection.extend({ model: app.models.NetworkUpdate });

	app.models.profile = new app.models.Person();
	app.collections.connections = new app.collections.People();
	app.collections.sharedUpdates = new app.collections.NetworkUpdates();
	app.collections.newConnections = new app.collections.NetworkUpdates();

}());