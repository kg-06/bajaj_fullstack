function buildGraph(validEdges) {
  const graph = {};
  const indegree = {};
  const childParentMap = {};

  for (const { parent, child } of validEdges) {

    // Multi-parent handling
    if (childParentMap[child]) {
      continue;
    }

    childParentMap[child] = parent;

    if (!graph[parent]) {
      graph[parent] = [];
    }

    if (!graph[child]) {
      graph[child] = [];
    }

    graph[parent].push(child);

    indegree[parent] ??= 0;
    indegree[child] ??= 0;

    indegree[child]++;
  }

  return {
    graph,
    indegree
  };
}

module.exports = buildGraph;