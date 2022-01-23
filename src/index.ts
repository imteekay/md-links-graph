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

function main(postMarkdowns: PostMarkdown[]) {
  const graph = new Graph(postMarkdowns);

  for (let postMarkdown of postMarkdowns) {
    buildLink(postMarkdown, graph);
  }

  console.log('graph', graph);
}

main([
  {
    url: '/series/typescript-learnings',
    markdown: `- [Typescript Learnings: Interesting Types](/series/typescript-learnings/interesting-types)
      - [Typescript Learnings: Interesting Types](/series/typescript-learnings/test)`
  },
  {
    url: '/series/typescript-learnings/interesting-types',
    markdown:
      '[Typescript Learnings: Interesting Types](/series/typescript-learnings/test)'
  },
  {
    url: '/series/typescript-learnings/test',
    markdown: ''
  }
]);
