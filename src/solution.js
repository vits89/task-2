const solution = function(graph, start, finish)  {
    const dists = { [start]: 0 },
        path = [],
        prevs = {},
        queue = new Map();

    for (let vertex in graph) {
        if (vertex != start) {
            dists[vertex] = Infinity;
        }

        queue.set(vertex, dists[vertex]);
    }

    while (queue.size > 0) {
        let [vertex, distMin] = queue.entries().next().value;

        for (let [v, d] of queue) {
            if (d < distMin) {
                distMin = d;
                vertex = v;
            }
        }

        queue.delete(vertex);

        for (let neighbor in graph[vertex]) {
            let dist = dists[vertex] + graph[vertex][neighbor];

            if (dist < dists[neighbor]) {
                dists[neighbor] = dist;
                prevs[neighbor] = vertex;

                queue.set(neighbor, dist);
            }
        }
    }

    if (!(finish in prevs)) {
        return { distance: 0, path };
    }

    let vertex = finish;

    while (vertex != start) {
        path.push(vertex);

        vertex = prevs[vertex];
    }

    path.push(start);

    return {
        distance: dists[finish],
        path: path.reverse()
    };
}
