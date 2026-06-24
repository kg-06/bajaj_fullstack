function findComponents(graph) {
  const visited = new Set();
  const components = [];

  const nodes = Object.keys(graph);

  for (const node of nodes) {
    if (visited.has(node)) continue;

    const component = [];
    const stack = [node];

    while (stack.length) {
      const current = stack.pop();

      if (visited.has(current)) continue;

      visited.add(current);
      component.push(current);

      for (const neighbor of graph[current]) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }

      // reverse edges check
      for (const other of nodes) {
        if (graph[other].includes(current) && !visited.has(other)) {
          stack.push(other);
        }
      }
    }

    components.push(component);
  }

  return components;
}

module.exports = findComponents;