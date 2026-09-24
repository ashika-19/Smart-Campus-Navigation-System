/**
 * Graph model + pathfinding for the campus navigation system.
 * Supports Dijkstra (guaranteed shortest path) and A* (Dijkstra + a
 * straight-line-distance heuristic, using node x/y as a stand-in for
 * real-world coordinates until you plug in actual GPS lat/lng).
 */

import { MinPriorityQueue } from "./priorityQueue.js";

export class CampusGraph {
  constructor(nodes, edges) {
    this.nodes = new Map(nodes.map((n) => [n.id, n]));
    this.adjacency = new Map(nodes.map((n) => [n.id, []]));

    for (const edge of edges) {
      this._addEdgeInternal(edge);
    }
  }

  _addEdgeInternal(edge) {
    const { from, to, distance, blocked = false } = edge;
    if (!this.adjacency.has(from) || !this.adjacency.has(to)) {
      throw new Error(`Edge references unknown node: ${from} -> ${to}`);
    }
    // Paths on campus are walkable both ways, so edges are undirected.
    this.adjacency.get(from).push({ to, distance, blocked });
    this.adjacency.get(to).push({ to: from, distance, blocked });
  }

  getNode(id) {
    return this.nodes.get(id);
  }

  listNodes() {
    return Array.from(this.nodes.values());
  }

  _heuristic(aId, bId) {
    const a = this.nodes.get(aId);
    const b = this.nodes.get(bId);
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  /**
   * Shared shortest-path routine. useHeuristic=false -> Dijkstra,
   * useHeuristic=true -> A*.
   */
  _shortestPath(
    startId,
    endId,
    { useHeuristic = false, avoidBlocked = true } = {},
  ) {
    if (!this.nodes.has(startId) || !this.nodes.has(endId)) {
      return { path: [], distance: Infinity, visitedOrder: [] };
    }

    const dist = new Map();
    const prev = new Map();
    const visitedOrder = [];
    for (const id of this.nodes.keys()) dist.set(id, Infinity);
    dist.set(startId, 0);

    const pq = new MinPriorityQueue();
    pq.push(startId, 0);

    const visited = new Set();

    while (!pq.isEmpty()) {
      const { value: currentId } = pq.pop();
      if (visited.has(currentId)) continue;
      visited.add(currentId);
      visitedOrder.push(currentId);

      if (currentId === endId) break;

      for (const edge of this.adjacency.get(currentId)) {
        if (avoidBlocked && edge.blocked) continue;
        const candidate = dist.get(currentId) + edge.distance;
        if (candidate < dist.get(edge.to)) {
          dist.set(edge.to, candidate);
          prev.set(edge.to, currentId);
          const priority = useHeuristic
            ? candidate + this._heuristic(edge.to, endId)
            : candidate;
          pq.push(edge.to, priority);
        }
      }
    }

    if (dist.get(endId) === Infinity) {
      return { path: [], distance: Infinity, visitedOrder };
    }

    // Reconstruct path
    const path = [endId];
    let cur = endId;
    while (cur !== startId) {
      cur = prev.get(cur);
      path.unshift(cur);
    }

    return { path, distance: dist.get(endId), visitedOrder };
  }

  dijkstra(startId, endId, options = {}) {
    return this._shortestPath(startId, endId, {
      ...options,
      useHeuristic: false,
    });
  }

  aStar(startId, endId, options = {}) {
    return this._shortestPath(startId, endId, {
      ...options,
      useHeuristic: true,
    });
  }
  /**
   * BFS shortest path — finds the route with the FEWEST stops/edges,
   * not the shortest physical distance. Good for "fewest turns" style
   * navigation, or as a simple baseline before Dijkstra/A*.
   * Returns the same shape as dijkstra/aStar so it's a drop-in swap.
   */
  bfs(startId, endId, { avoidBlocked = true } = {}) {
    if (!this.nodes.has(startId) || !this.nodes.has(endId)) {
      return { path: [], distance: Infinity, visitedOrder: [] };
    }

    const visited = new Set([startId]);
    const prev = new Map();
    const visitedOrder = [];
    const queue = [startId];

    let found = false;

    while (queue.length > 0) {
      const currentId = queue.shift(); // O(n) shift is fine at campus scale
      visitedOrder.push(currentId);

      if (currentId === endId) {
        found = true;
        break;
      }

      for (const edge of this.adjacency.get(currentId)) {
        if (avoidBlocked && edge.blocked) continue;
        if (!visited.has(edge.to)) {
          visited.add(edge.to);
          prev.set(edge.to, currentId);
          queue.push(edge.to);
        }
      }
    }

    if (!found) {
      return { path: [], distance: Infinity, visitedOrder };
    }

    // Reconstruct path
    const path = [endId];
    let cur = endId;
    while (cur !== startId) {
      cur = prev.get(cur);
      path.unshift(cur);
    }

    // Report both hop-count and the actual summed distance along that path,
    // since "distance" elsewhere in your app means physical distance.
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const edge = this.adjacency
        .get(path[i])
        .find((e) => e.to === path[i + 1]);
      totalDistance += edge.distance;
    }

    return {
      path,
      distance: totalDistance,
      hops: path.length - 1,
      visitedOrder,
    };
  }
  /**
   * Multi-stop routing: given a start and an ordered/unordered list of
   * stops, returns a full route. If `optimize` is true and the stop
   * count is small (<= 7), it brute-forces every permutation to find
   * the shortest total distance (fine for a campus with a handful of
   * stops per trip); otherwise it visits stops in the given order.
   */
  multiStopRoute(startId, stopIds, { optimize = true } = {}) {
    const buildForOrder = (order) => {
      const fullPath = [];
      let total = 0;
      let cursor = startId;
      for (const stop of order) {
        const { path, distance } = this.dijkstra(cursor, stop);
        if (distance === Infinity) return null;
        fullPath.push(...(fullPath.length ? path.slice(1) : path));
        total += distance;
        cursor = stop;
      }
      return { order, path: fullPath, distance: total };
    };

    if (!optimize || stopIds.length > 7) {
      return buildForOrder(stopIds);
    }

    let best = null;
    for (const perm of permutations(stopIds)) {
      const result = buildForOrder(perm);
      if (result && (!best || result.distance < best.distance)) best = result;
    }
    return best;
  }
}

function* permutations(arr) {
  if (arr.length <= 1) {
    yield arr;
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const perm of permutations(rest)) {
      yield [arr[i], ...perm];
    }
  }
}
