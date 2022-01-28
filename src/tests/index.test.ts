import { main } from '..';
import { Graph } from '../Graph';

describe('main', () => {
  it('returns the links graph when receiving a list of posts', () => {
    const post1 = {
      url: '/series/typescript-learnings',
      markdown: `- [Typescript Learnings: Interesting Types](/series/typescript-learnings/interesting-types)
      - [Typescript Learnings: Interesting Types](/series/typescript-learnings/test)`
    };

    const post2 = {
      url: '/series/typescript-learnings/interesting-types',
      markdown:
        '[Typescript Learnings: Interesting Types](/series/typescript-learnings/test)'
    };

    const post3 = {
      url: '/series/typescript-learnings/test',
      markdown: ''
    };

    const posts = [post1, post2, post3];
    const expectedGraph = new Graph(posts);

    posts.forEach(({ url }) => expectedGraph.addNode(url));
    expectedGraph.addEdge(post1.url, post2.url);
    expectedGraph.addEdge(post1.url, post3.url);
    expectedGraph.addEdge(post2.url, post3.url);

    expect(main(posts)).toEqual(expectedGraph);
  });
});
