"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dijkastra = void 0;
const graph_1 = require("../constants/graph");
function dijkastra(src, des) {
    const st = new Set();
    const distance = new Array(graph_1.NumberOfCites).fill(1e9);
    distance[src] = 0;
    let edge = {
        weight: 0,
        node: src
    };
    st.add(edge);
    while (st.size !== 0) {
        const tmp = st.values().next().value;
        st.delete(tmp);
        const currNode = tmp.node;
        for (let i = 0; i < graph_1.NumberOfCites; i++) {
            if (graph_1.graph[currNode][i] !== 0 && distance[i] > distance[currNode] + graph_1.graph[currNode][i]) {
                if (distance[i] !== 1e9) {
                    let newEdge = {
                        weight: graph_1.graph[currNode][i],
                        node: i
                    };
                    st.delete(newEdge);
                }
                distance[i] = distance[currNode] + graph_1.graph[currNode][i];
                let newEdge = {
                    weight: distance[i],
                    node: i
                };
                st.add(newEdge);
            }
        }
    }
    return distance[des];
}
exports.dijkastra = dijkastra;
