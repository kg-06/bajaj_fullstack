function findRoot(component, indegree) {

  const roots = component.filter(
    node => indegree[node] === 0
  );

  if (roots.length > 0) {
    return roots.sort()[0];
  }

  // Pure cycle
  return [...component].sort()[0];
}

module.exports = findRoot;