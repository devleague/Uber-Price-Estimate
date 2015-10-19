TemplateManager = {
  templates: {},
  get: function(name, callback){
    var template = this.templates[name];
    if (template) {
      // return cached template
      callback(template);
    } else {
      // cache and return template
      var self = this;
      $.get("/templates/" + name + ".hbs", function(template){
        self.templates[name] = template;
        callback(template);
      });
    }
  }
}
