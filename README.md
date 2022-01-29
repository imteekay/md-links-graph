# md-links-graph

[![Npm package version](https://badgen.net/npm/v/@imtk/md-links-graph)](https://npmjs.com/package/@imtk/md-links-graph) [![GitHub license](https://badgen.net/github/license/Naereen/Strapdown.js)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

Create a graph data structure based on Markdown content and links.

## Install

With yarn:

```bash
yarn add @imtk/md-links-graph
```

With npm:

```bash
npm add @imtk/md-links-graph
```

## Usage

```ts
import { createGraph } from '@imtk/md-links-graph';

const posts = [
  {
    url: '/post-1',
    title: 'Post 1',
    content: 'Markdown content for post 1'
  },
  {
    url: '/post-2',
    title: 'Post 2',
    content: 'Post 2 linked to [post 1](/post-1)'
  }
];

const graph = createGraph(posts);

graph.nodes;
// [
//   {
//     url: '/post-1',
//     text: 'Post 1',
//     id: 0
//   },
//   {
//     url: '/post-2',
//     text: 'Post 2',
//     id: 1
//   }
// ]

graph.edges;
// [
//   {
//     source: '1',
//     target: '0'
//   }
// ];
```

## Types

### Node

```ts
type Url = string;

type Node = {
  id: number;
  text: string;
  url: Url;
};
```

### Edge

```ts
type Edge = {
  source: string;
  target: string;
};
```

### Post input

```ts
type PostMarkdown = {
  url: string;
  title: string;
  content: string;
};
```

## License

[MIT](./LICENSE) License © 2022 [TK](https://github.com/imteekay)
