import { createGraph } from '..';
import { Graph } from '../Graph';

const excludedPages = [
  '',
  '/',
  '/writings',
  '/support',
  '/rss.xml',
  undefined,
  null
];

function isValidLink(url: string) {
  return (
    !url.startsWith('https') &&
    !url.startsWith('http') &&
    !url.startsWith('www') &&
    !excludedPages.includes(url)
  );
}

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
      content:
        '[Typescript Learnings: Interesting Types](/series/typescript-learnings/test)'
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

    expect(createGraph(posts, isValidLink)).toEqual(expectedGraph);
  });
});
