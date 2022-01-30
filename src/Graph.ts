import { PostMarkdown } from './PostMarkdown';

type Url = string;

type Node = {
  id: number;
  text: string;
  url: Url;
};

type Source = string;
type Target = string;

type Edge = {
  source: Source;
  target: Target;
};

type UrlToIDMap = {
  [key: Url]: string;
};

type Connections = {
  [key: string]: boolean;
};

export class Graph {
  private _nodes: Node[];
  private _edges: Edge[];
  private urlToIDMap: UrlToIDMap;
  private connections: Connections;

  constructor(postMarkdowns: PostMarkdown[]) {
    this._nodes = [];
    this._edges = [];
    this.urlToIDMap = this.buildUrlToID(postMarkdowns);
    this.connections = {};
  }

  get nodes() {
    return this._nodes;
  }

  get edges() {
    return this._edges;
  }

  addNode({ url, title }: PostMarkdown) {
    this._nodes.push({
      url,
      text: title,
      id: this._nodes.length
    });
  }

  addEdge(sourceUrl: Url, targetUrl: Url) {
    const source = this.urlToIDMap[sourceUrl];
    const target = this.urlToIDMap[targetUrl];

    if (this.hasConnection(source, target)) return;

    this._edges.push({
      source,
      target
    });

    this.updateConnections(source, target);
  }

  private buildUrlToID(postMarkdowns: PostMarkdown[]) {
    return postMarkdowns.reduce(
      (urlToIDMap, { url }, index: number) => ({
        ...urlToIDMap,
        [url]: index.toString()
      }),
      {}
    );
  }

  private updateConnections(source: string, target: string) {
    this.connections[`${source}-${target}`] = true;
  }

  private hasConnection(source: string, target: string) {
    return (
      this.connections[`${source}-${target}`] ||
      this.connections[`${target}-${source}`]
    );
  }
}
