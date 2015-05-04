var React = require('react'),
    NodeView = require('./nodeView.js');


var Graph = React.createClass({

  params: {},
  paramsNum: 0,
  callbacks: {},

  setCallbacks: function() {
    this.callbacks = {
    'NodeView' : {
      onReady: this.onNodeUiReady,
      process: this.processNodeUi
    }};
  },

  processParams: function(renderer) {
    this.processNodeUi(renderer);
  },

  onNodeUiReady: function(ui, placeNode) {
    this.params.nodeView = {ui: ui, placeNode: placeNode};
    this.paramsNum = this.paramsNum + 1;
  },

  processNodeUi: function(renderer) {
    renderer.node(this.params.nodeView.ui).
             placeNode(this.params.nodeView.placeNode);
  },

  componentDidMount: function() {
    this.componentMount = true;
    this.checkAndRun();
  },

  checkAndRun: function() {
    if(this.paramsNum === this.nChildren && this.componentMount) {
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

  renderChildren: function () {
    var that = this;

    this.nChildren = this.getNumberOfValidChildren();
    
    if (this.nChildren == 0) {
      return this.props.children;
    } else {
      return React.Children.map(this.props.children, function (child) {
        if (this.callbacks[child.type.displayName]) {
          return React.cloneElement(child, {
            onReady: function() {
              that.callbacks[child.type.displayName].onReady.apply(
                that, arguments);
              that.checkAndRun();
            },
            renderer: this.props.renderer
          });
        } else {
          return child;      
        }
      }.bind(this))
    }
  },

  render: function() {
    this.setCallbacks();

    return (
      <div>
        <div id='graphContainer' ></div>
        {this.renderChildren()}
      </div>
    );
  }
});

module.exports = Graph;
