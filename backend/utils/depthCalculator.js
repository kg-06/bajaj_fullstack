function calculateDepth(tree) {

  function dfs(nodeObj) {

    const children = Object.values(nodeObj);

    if (children.length === 0) {
      return 1;
    }

    let maxDepth = 0;

    for (const child of children) {
      maxDepth = Math.max(maxDepth, dfs(child));
    }

    return maxDepth + 1;
  }

  return dfs(tree) - 1;
}

module.exports = calculateDepth;