function validateEntries(data) {
  const invalidEntries = [];
  const duplicateEdges = [];

  const validEdges = [];

  const seenEdges = new Set();
  const duplicateTracker = new Set();

  for (let entry of data) {
    entry = entry.trim();

    if (!/^[A-Z]->[A-Z]$/.test(entry)) {
      invalidEntries.push(entry);
      continue;
    }

    const [parent, child] = entry.split("->");

    if (parent === child) {
      invalidEntries.push(entry);
      continue;
    }

    if (seenEdges.has(entry)) {

      if (!duplicateTracker.has(entry)) {
        duplicateEdges.push(entry);
        duplicateTracker.add(entry);
      }

      continue;
    }

    seenEdges.add(entry);
    validEdges.push({
      parent,
      child
    });
  }

  return {
    validEdges,
    invalidEntries,
    duplicateEdges
  };
}

module.exports = validateEntries;