import { remark } from 'remark';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import { Graph } from './Graph';
import { PostMarkdown } from './PostMarkdown';

function buildLink(postMarkdown: PostMarkdown, graph: Graph) {
  graph.addNode(postMarkdown.url);

  remark()
    .use(() => (mdast: Root) => {
      visit(mdast, 'link', (node) => {
        graph.addEdge(postMarkdown.url, node.url);
      });
    })
    .process(postMarkdown.markdown);
}

export function main(postMarkdowns: PostMarkdown[]) {
  const graph = new Graph(postMarkdowns);

  for (let postMarkdown of postMarkdowns) {
    buildLink(postMarkdown, graph);
  }

  return graph;
}
