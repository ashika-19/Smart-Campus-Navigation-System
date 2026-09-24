import { CampusGraph } from "../graph.js";
import { nodes, edges } from "../data/campusData.js";

const graph = new CampusGraph(nodes, edges);

export function listLocations(req, res) {
  const { q } = req.query;
  let results = graph.listNodes();
  if (q) {
    const query = q.toLowerCase();
    results = results.filter((n) => n.name.toLowerCase().includes(query));
  }
  res.json(results);
}

export function getRoute(req, res) {
  const { from, to, algorithm = "bfs" } = req.query;
  if (!from || !to) {
    return res
      .status(400)
      .json({ error: "Both 'from' and 'to' node ids are required." });
  }
  if (!graph.getNode(from) || !graph.getNode(to)) {
    return res
      .status(404)
      .json({ error: "Unknown node id in 'from' or 'to'." });
  }

  let result;
  if (algorithm === "dijkstra") result = graph.dijkstra(from, to);
  else if (algorithm === "astar") result = graph.aStar(from, to);
  else result = graph.bfs(from, to); // default

  if (result.distance === Infinity) {
    return res
      .status(404)
      .json({ error: "No path found between the given nodes." });
  }

  res.json({
    algorithm,
    from,
    to,
    distance: result.distance,
    hops: result.hops,
    path: result.path.map((id) => graph.getNode(id)),
  });
}

export function getMultiStopRoute(req, res) {
  const { from, stops } = req.body;
  if (!from || !Array.isArray(stops) || stops.length === 0) {
    return res
      .status(400)
      .json({ error: "'from' and a non-empty 'stops' array are required." });
  }

  const result = graph.multiStopRoute(from, stops);
  if (!result) {
    return res
      .status(404)
      .json({ error: "No valid route through the given stops." });
  }

  res.json({
    from,
    order: result.order,
    distance: result.distance,
    path: result.path.map((id) => graph.getNode(id)),
  });
}
