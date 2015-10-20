'use strict';

var PriceView = Backbone.View.extend({
  el: $('#price-detail'),
  template: 'price',
  events: {
    'click .get-ride' : 'getRide'
  },
  getRide : function(event){
    var self = this;
    $.post('/api/get_ride', {
      product_id: this.model.get('product_id'),
      source: this.model.get('source'),
      destination: this.model.get('destination'),
      auth_token: localStorage['auth_token']
    })
    .done(function(response){
      if(response.success){
        // create a new StatusView
        var statusView = new StatusView({ model : new Status(response) } );
        statusView.render();
        // hide the .get-ride button
        self.$el.find('.get-ride').remove();
      }else{
        // open popup window to authorize
        window.open(response.popupUrl, "oauth", "scrollbars=1,resizable=1,height=300,width=450");
      }
    })
    .fail(function(err){
      console.error(err);
    });
  },
  render: function(){
    var self = this;
    TemplateManager.get(this.template, function(template){
      var html = Handlebars.compile(template)(self.model.toJSON());
      self.$el.html(html);
    });
  }
});

var PricesView = Backbone.View.extend({
  el: $('#prices'),
  template: 'prices',
  events: {
    'click li' : 'renderPriceDetail'
  },
  renderPriceDetail : function(event){
    var idx = $(event.currentTarget).data('id');
    var price = this.collection.models[idx];
    var priceView = new PriceView({
      model : price
    });
    priceView.render();
  },
  render: function(){
    var self = this;
    TemplateManager.get(this.template, function(template){
      var html = Handlebars.compile(template)(self.collection.toJSON());
      self.$el.html(html);
    });
  },
  initialize: function(){
    this.collection.on('add', this.render, this);
  }
});
