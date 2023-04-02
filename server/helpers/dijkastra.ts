import { Iedge } from '../models/graph.pair';
import { graph,NumberOfCites} from '../constants/graph';

export function dijkastra(src:number,des:number){
	const st=new Set<Iedge>();
	
	const distance:number[] =new Array(NumberOfCites).fill(1e9);
	distance[src]=0;
	let edge:Iedge={
		weight:0,
		node:src
	}
	st.add(edge);
	while(st.size!==0){
		const tmp:Iedge=st.values().next().value;
		st.delete(tmp);
		const currNode:number=tmp.node;
		for(let i=0;i<NumberOfCites;i++){
			if(distance[i]>distance[currNode]+graph[currNode][i] && graph[currNode][i]!==0){
				if(distance[i]!==1e9){
					let newEdge:Iedge={
						weight:graph[currNode][i],
						node:i
					}
					st.delete(newEdge);
				}
				distance[i]=distance[currNode]+graph[currNode][i];
				let newEdge:Iedge={
					weight:distance[i],
					node:i
				}
				st.add(newEdge);
			}
		}
	}
	return distance[des];	
}

