import Expression, { NodeExp } from "../modelComponents/Expression";
import Workspace from "../workspace/workspace";
import Graph from "../modelComponents/graph/graph";
import WSEdge from "../workspace/ws_graph/ws_edge";
import WSVertex from "../workspace/ws_graph/ws_vertex";
import Vector from "../modelComponents/vector";
import Vertex from "../modelComponents/graph/vertex";
import Edge from "../modelComponents/graph/edge";

const global = (<any>window);

const workspace = new Workspace(document.querySelector('.workspace'));
workspace.start();

export default function demoCalcExp() {
   global.exp = setExp(new Expression("(3+6)*(((2+8)/(6%7))+8)"));
   global.Expression = Expression;

   global.setExp = ((exp: Expression) => { 
      return global.exp = exp;
   });
}

function setExp(exp: Expression): Expression { 
   workspace.getData().wsGraph.graph = buildEpxGraph(exp);
   return exp;
}

const buildEpxGraph = (function () {
   const start = new Vector(0, -250);
   const step = new Vector(80, 80);

   let tree: Graph<null, NodeExp> = null;
   let builtGraph: Graph<WSEdge, WSVertex>;
   
   return function buildEpxGraph(exp: Expression): Graph<WSEdge, WSVertex> {
      const root = exp.root;

      builtGraph = new Graph<WSEdge, WSVertex>();
      tree = exp.tree;

      builtGraph.addVertex(getNextVertex(root, start));
      return builtGraph;
   }
   
   function getNextVertex(vertex: Vertex<NodeExp>, coords: Vector): Vertex<WSVertex> { 
      const root = new Vertex(new WSVertex(vertex.targ.toString(), coords));
      
      const nexts = tree.getVVertices(vertex);
      if (!nexts.length) return root;

      const v1 = getNextVertex(nexts[0], new Vector(coords.x - step.x, coords.y + step.y));
      const v2 = getNextVertex(nexts[1], new Vector(coords.x + step.x, coords.y + step.y));

      builtGraph.addEdge(new Edge(root, v1, new WSEdge()));
      builtGraph.addEdge(new Edge(root, v2, new WSEdge()));

      return root;
   }

}());