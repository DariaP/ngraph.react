var React = require('react'),
    NodeView = require('./nodeView.js');


var Graph = React.createClass({

  params: [],
  callbacks: {
      'NodeView': 'onNodeUiReady',
      'LinkView': 'onLinkUiReady',
  },

  processParams: function(renderer) {
    for (var i = 0 ; i < this.params.length ; ++i) {
      var next = this.params[i];
      this[next.process].apply(this, [renderer, next.params]);
    }
  },

  onNodeUiReady: function(ui, placeNode) {
    this.params.push({params: {ui: ui, placeNode: placeNode}, process: 'processNodeUi'});
  },

  processNodeUi: function(renderer, params) {
    renderer.node(params.ui).
             placeNode(params.placeNode);
  },

  onLinkUiReady: function(ui, placeLink) {
    this.params.push({params: {ui: ui, placeLink: placeLink}, process: 'processLinkUi'});
  },

  processLinkUi: function(renderer, params) {
    renderer.link(params.ui).
             placeLink(params.placeLink);
  },

  componentDidMount: function() {
    this.componentMount = true;
    this.checkAndRun();
  },

  checkAndRun: function() {
    if(this.params.length === this.nChildren && this.componentMount) {
      this.run();
    }
  },

  run: function() {
    var renderer = this.props.renderer(this.props.graph, 
      {
        container: document.getElementById('graphContainer'),
        layout: this.props.layout
      }
    );
    this.processParams(renderer);
    renderer.run();
  },

  getNumberOfValidChildren: function() {
    var n = 0;
    React.Children.forEach(this.props.children, function (child) {
      if (this.callbacks[child.type.displayName])
        n = n + 1;
    }.bind(this)) 
    return n;
  },

  addCallback: function(child) {
    var that = this;

    var callback = this.callbacks[child.type.displayName];

    if (callback) {
      return React.cloneElement(child, {
        onReady: function() {
          that[callback].apply(
            that, arguments);
          that.checkAndRun();
        },
        renderer: this.props.renderer
      });
    } else {
      return child;      
    }
  },

  renderChildren: function () {
    this.nChildren = this.getNumberOfValidChildren();

    if (this.nChildren == 0) {
      return this.props.children;
    } else {
      return React.Children.map(this.props.children, function (child) {
        return this.addCallback(child);
      }.bind(this))
    }
  },

  render: function() {
    return (
      <div>
        <div id='graphContainer' ></div>
        {this.renderChildren()}
      </div>
    );
  }
});

module.exports = Graph;
