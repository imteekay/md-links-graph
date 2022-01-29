# md-links-graph

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
