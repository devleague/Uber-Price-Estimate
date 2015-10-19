'use strict';

var PriceView = Backbone.View.extend({
  el: $('#price-detail'),
  template: 'price',
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
