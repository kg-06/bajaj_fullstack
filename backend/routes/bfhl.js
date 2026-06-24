const express = require("express");
const router = express.Router();

const validateEntries = require("../utils/validator");
const buildGraph = require("../utils/graphBuilder");
const findComponents = require("../utils/findComponents");
const findRoot = require("../utils/findRoot");
const hasCycle = require("../utils/cycleDetector");
const buildTree = require("../utils/treeBuilder");
const calculateDepth = require("../utils/depthCalculator");
const buildSummary = require("../utils/summaryBuilder");

router.post("/", (req, res) => {

  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      error: "data must be an array"
    });
  }

  const validation =
    validateEntries(data);

  const { graph, indegree } =
    buildGraph(validation.validEdges);

  const components =
    findComponents(graph);

  const hierarchies = [];

  for (const component of components) {

    const root =
      findRoot(component, indegree);

    const cycle =
      hasCycle(graph, component);

    if (cycle) {

      hierarchies.push({
        root,
        tree: {},
        has_cycle: true
      });

    } else {

      const tree =
        buildTree(graph, root);

      const depth =
        calculateDepth(tree);

      hierarchies.push({
        root,
        tree,
        depth
      });
    }
  }

  const summary =
    buildSummary(hierarchies);

  return res.json({

    user_id: "KeshavGarg_02112004",

    email_id: "keshav0795.be23@chitkara.edu.in",

    college_roll_number: "2310990795",

    hierarchies,

    invalid_entries:
      validation.invalidEntries,

    duplicate_edges:
      validation.duplicateEdges,

    summary
  });

});

module.exports = router;