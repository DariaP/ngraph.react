var React = require('react');

var LinkView = React.createClass({

  propsCallbacks: {
    color: 'setColor',
    width: 'setWidth'
  },
  attrs:[],

  processProps: function() {
    for (key in this.props) {
      var callback = this.propsCallbacks[key];
      if (this.props.hasOwnProperty(key) && callback) {
        this[callback](this.props[key]);
      }
    }
    this.props.onReady(this.getUiFunc(), this.getPlaceLinkFunc());
  },

  setColor: function(color) {
    this.attrs.push({name: 'stroke', value: color});
  },

  setWidth: function(width) {
    this.attrs.push({name: 'stroke-width', value: width});
  },

  getUiFunc: function() {
    var that = this;
    return function(link) {
      var ui = that.props.renderer.svg('path');
      for (var i = 0 ; i < that.attrs.length ; ++i) {
        var attr = that.attrs[i];
        ui = ui.attr(attr.name, attr.value);
      }
      return ui;
    };
  },

  getPlaceLinkFunc: function() {
    return function(linkUI, fromPos, toPos) {
      var data = 'M' + fromPos.x + ',' + fromPos.y +
                   'L' + toPos.x + ',' + toPos.y;
      linkUI.attr("d", data);
    };
  },

  render: function() {
    this.processProps();
    return (
      <div></div>
    );
  }
});

module.exports = {
  LinkView: LinkView
};
