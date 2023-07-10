const Test = () => {
  const tsp_open_bb = (graph, currCity, visited, currCost, lowerBound, path) => {
  if (visited.size === graph.length) {
    // Complete tour is formed
    if (graph[currCity][0] !== Infinity) {
      currCost += graph[currCity][0];
      if (currCost < lowerBound[0]) {
        lowerBound[0] = currCost;
        path[0] = path.slice(1).concat([0]);
      }
    }
    return;
  }

  for (let nextCity = 0; nextCity < graph.length; nextCity++) {
    if (!visited.has(nextCity) && graph[currCity][nextCity] !== Infinity) {
      visited.add(nextCity);
      tsp_open_bb(graph, nextCity, visited, currCost + graph[currCity][nextCity], lowerBound, path.concat([nextCity]));
      visited.delete(nextCity);
    }
  }
};

const solve_tsp_open = (graph) => {
  const numCities = graph.length;
  const visited = new Set();
  const lowerBound = [Infinity];
  const path = [];
  console.log(numCities)
  tsp_open_bb(graph, 0, visited, 0, lowerBound, path);

  return {
    path: path,
    cost: lowerBound[0],//can apply nearest neighbor algorithm to find suboptimal
  };
};

// Example graph representation (distance matrix)
const graph = [
  [0, 10, 15, 20],
  [10, 0, 12, 8],
  [15, 12, 0, 6],
  [20, 8, 6, 0],
];

const result = solve_tsp_open(graph);
console.log('Optimal Path:', result.path); // Optimal path visiting each city
console.log('Total Cost:', result.cost); // Total cost of the optimal path
}

export default Test