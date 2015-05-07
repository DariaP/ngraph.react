var renderSvg = require('ngraph.svg'),
    createGraph = require('ngraph.graph'),
    React = require('react'),
    ngraph = require('../../index.js'),
    circularLayout = require('ngraph.circular.fixed');

var Graph = ngraph.Graph,
    NodeView = ngraph.NodeView,
    Rect = ngraph.Rect,
    LinkView = ngraph.LinkView;

var graph = createGraph();

graph.addLink('1', '2');
graph.addLink('2', '3');
graph.addLink('3', '4');
graph.addLink('4', '5');

layout = circularLayout(graph, {
  center: {
    x: 0,
    y: 0
  },
  radius: 50
});

React.render(
  <Graph graph={graph} layout={layout} renderer={renderSvg} >
    <LinkView color='#ff0000' width="4" />
  </Graph>,
  document.getElementById('content')
);

setTimeout(function () {
  graph.addLink('1', '4');
}, 10000)

setTimeout(function () {
  graph.addLink('5', '6');
}, 15000)
