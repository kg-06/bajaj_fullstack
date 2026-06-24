function buildSummary(hierarchies) {

  let totalTrees = 0;
  let totalCycles = 0;

  let largestDepth = -1;
  let largestTreeRoot = "";

  for (const hierarchy of hierarchies) {

    if (hierarchy.has_cycle) {
      totalCycles++;
      continue;
    }

    totalTrees++;

    if (
      hierarchy.depth > largestDepth ||
      (
        hierarchy.depth === largestDepth &&
        hierarchy.root < largestTreeRoot
      )
    ) {
      largestDepth = hierarchy.depth;
      largestTreeRoot = hierarchy.root;
    }
  }

  return {
    total_trees: totalTrees,
    total_cycles: totalCycles,
    largest_tree_root: largestTreeRoot
  };
}

module.exports = buildSummary;