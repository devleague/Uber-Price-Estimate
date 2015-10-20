'use strict';

var StatusView = Backbone.View.extend({
  el: $('#ride-status'),
  template: 'status',
  render: function(){
    var self = this;
    TemplateManager.get(this.template, function(template){
      var html = Handlebars.compile(template)(self.model.toJSON());
      self.$el.html(html);
    });
  }
});
