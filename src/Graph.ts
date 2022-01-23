import { PostMarkdown } from './PostMarkdown';

type Url = string;

type Node = {
  id: number;
  url: Url;
};

type Edge = {
  source: number;
  target: number;
};

type UrlToIDMap = {
  [key: Url]: number;
};

export class Graph {
  private nodes: Node[];
  private edges: Edge[];
  private urlToIDMap: UrlToIDMap;

  constructor(postMarkdowns: PostMarkdown[]) {
    this.nodes = [];
    this.edges = [];
    this.urlToIDMap = this.buildUrlToID(postMarkdowns);
  }

  addNode(url: Url) {
    this.nodes.push({ url, id: this.nodes.length });
  }

  addEdge(source: Url, target: Url) {
    this.edges.push({
      source: this.urlToIDMap[source],
      target: this.urlToIDMap[target],
    });
  }

  private buildUrlToID(postMarkdowns: PostMarkdown[]) {
    return postMarkdowns.reduce(
      (urlToIDMap, { url }, index: number) => ({ ...urlToIDMap, [url]: index }),
      {}
    );
  }
}
