'use strict';

var PricesView = Backbone.View.extend({
  el: $('#prices'),
  template: 'prices',
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
