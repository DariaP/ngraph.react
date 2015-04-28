var React = require('react');

var Graph = React.createClass({
  componentDidMount: function() {
    var renderer = this.props.renderer(this.props.graph, 
      {
        container: document.getElementById('graphContainer'),
        layout: this.props.layout
      });
    renderer.run();
  },

  render: function() {
    return (
      <div id='graphContainer' >
      </div>
    );
  }
});

module.exports = Graph;
