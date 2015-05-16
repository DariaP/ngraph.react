var renderSvg = require('ngraph.svg'),
    React = require('react'),
    ngraph = require('../../index.js'),
    circularLayout = require('ngraph.circular.fixed');

var Graph = ngraph.Graph,
    NodeView = ngraph.NodeView,
    Rect = ngraph.Rect,
    Text = ngraph.Text;

function getGraphFromQueryString(query) {
  var graphGenerators = require('ngraph.generators');
  return graphGenerators.grid(3,3);
}

function getNumber(string, defaultValue) {
  var number = parseFloat(string);
  return (typeof number === 'number') && !isNaN(number) ? number : (defaultValue || 10);
}

var query = require('query-string').parse(window.location.search.substring(1));
var graph = getGraphFromQueryString(query),
    layout = circularLayout(graph, {
      center: {
        x: 0,
        y: 0
      },
      radius: 50
    });

React.render(
  <Graph graph={graph} layout={layout} renderer={renderSvg} >
    <NodeView>
      <Rect color={"#000000"} width={10} height={10} />
      <Text>title</Text>
    </NodeView>
  </Graph>,
  document.getElementById('content')
);