var Router = Backbone.Router.extend({

  routes: {
    'store-auth-token/:access_token': "storeAuthToken"  // #store-auth-token/XXXXX
  },

  storeAuthToken: function(access_token) {
    // store access token in local storage
    localStorage['auth_token'] = access_token;

    // redirect back
    this.navigate('');
  }

});
