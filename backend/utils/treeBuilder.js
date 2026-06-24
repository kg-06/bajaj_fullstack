function buildTree(graph, root) {

  function dfs(node) {

    const children = {};

    for (const child of graph[node]) {
      children[child] = dfs(child);
    }

    return children;
  }

  return {
    [root]: dfs(root)
  };
}

module.exports = buildTree;