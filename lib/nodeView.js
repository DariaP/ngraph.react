var React = require('react');

var nodeViewElements = [
  'Rect'
];

nodeViewElements.contains = function(name) {
    for (var i = 0; i < nodeViewElements.length; i++) {
        if (nodeViewElements[i] === name) {
            return true;
        }
    }
    return false;
};

var NodeView = React.createClass({

  params: [],

  onReady: function(ui, offset) {
    this.params.push({getUi: ui, offset: offset});
    if(this.params.length === this.nChildren) {
      this.props.onReady(this.getUiFunct(), this.getPlaceNodeFunc());
    }
  },

  getNumberOfValidChildren: function() {
    var n = 0;
    React.Children.forEach(this.props.children, function (child) {
      if (nodeViewElements.contains(child.type.displayName))
        n = n + 1;
    }.bind(this)) 
    return n;
  },

  renderChildren: function () {
    this.nChildren = this.getNumberOfValidChildren();
    if (this.nChildren == 0) {
      this.props.onReady();
    } else {
      return React.Children.map(this.props.children, function (child) {
        if (nodeViewElements.contains(child.type.displayName)) {
          return React.cloneElement(child, {
            onReady: this.onReady,
            renderer: this.props.renderer
          });
        } else {
          return child;      
        }
      }.bind(this))      
    }
  },

  getUiFunct: function() {
    var that = this;
    return function() {
      var ui = that.props.renderer.svg("g");
      for(var i = 0 ; i < that.params.length ; ++i) {
        ui.append(that.params[i].getUi());        
      }
      return ui;
    };
  },

  getPlaceNodeFunc: function() {
    var that = this;
    return function(nodeUI, pos) {
      var offset = that.params[0].offset;
                nodeUI.attr('transform',
                            'translate(' +
                                  (pos.x + offset.x) + ',' + (pos.y + offset.y) +
                            ')');
    };
  },

  render: function() {
    return (
      <div>
        {this.renderChildren()}
      </div>
    );
  }
});

var Rect = React.createClass({

  render: function() {
    var that = this;

    var getUi = function() {
      return that.props.renderer.svg("rect", {
                  width: that.props.width,
                  height: that.props.height,
                  fill: that.props.color
                });
    }

    var offset = {x: -1 * that.props.width / 2, y: -1 * that.props.height / 2};

    this.props.onReady(getUi, offset);

    return (
      <div>
      </div>
    );
  }
});

module.exports = {
  NodeView: NodeView,
  Rect: Rect
};
