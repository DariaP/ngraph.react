var React = require('react');

var LinkView = React.createClass({

  propsCallbacks: {
    color: 'setColor',
  },

  processProps: function() {
    this.props.onReady(this.getUiFunc(), this.getPlaceLinkFunc());
  },

  getUiFunc: function() {
    var that = this;

    return function(link){
      return that.props.renderer.svg('path')
                           .attr('stroke', 'red')
                           .attr('stroke-dasharray', '5, 5');
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
