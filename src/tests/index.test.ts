import { createGraph } from '..';
import { Graph } from '../Graph';

describe('createGraph', () => {
  it('returns the links graph when receiving a list of posts', () => {
    const post1 = {
      url: '/series/typescript-learnings',
      title: 'TypeScript Learnings',
      content: `- [Typescript Learnings: Interesting Types](/series/typescript-learnings/interesting-types)
      - [Typescript Learnings: Interesting Types](/series/typescript-learnings/test)`
    };

    const post2 = {
      url: '/series/typescript-learnings/interesting-types',
      title: 'Interesting types',
      content: `- [Typescript Learnings: Interesting Types](/series/typescript-learnings/test)
      - [Typescript Learnings Series](/series/typescript-learnings)`
    };

    const post3 = {
      url: '/series/typescript-learnings/test',
      title: 'Test',
      content: ''
    };

    const posts = [post1, post2, post3];
    const expectedGraph = new Graph(posts);

    posts.forEach((post) => expectedGraph.addNode(post));
    expectedGraph.addEdge(post1.url, post2.url);
    expectedGraph.addEdge(post1.url, post3.url);
    expectedGraph.addEdge(post2.url, post3.url);

    const graph = createGraph(posts);

    expect(graph.nodes).toEqual(expectedGraph.nodes);
    expect(graph.edges).toEqual(expectedGraph.edges);
    expect(graph.nodes.length).toEqual(3);
    expect(graph.edges.length).toEqual(3);
  });
});
