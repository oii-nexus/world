library(igraph)
library(plyr)

graph<-read.graph("immigration.gml",format="gml")
summary(graph)

#Remove isolates. They are uninteresting for any task
graph<-induced_subgraph(graph, which(degree(graph)!=0), impl = "copy_and_delete")

regions<-table(V(graph)$region)
regions

region_graphs<-lapply(names(regions),function(r) {
	induced_subgraph(graph, which(V(graph)$region==r), impl = "copy_and_delete")
})

g<-graph
region_collapse<-sapply(names(regions),function(r) {
	gtmp<-g
	V(gtmp)$label<-ifelse(V(gtmp)$region==r,r,V(gtmp)$label)
	gtmp<-contract(gtmp,as.integer(as.factor(V(gtmp)$label)),vertex.attr.comb="first")
	E(gtmp)$weight<-1
	gtmp<-simplify(gtmp,remove.multiple=TRUE,remove.loops=TRUE,edge.attr.comb="sum")
	gtmp
},USE.NAMES=TRUE,simplify=FALSE)

#     contract(graph, mapping, vertex.attr.comb = igraph_opt("vertex.attr.comb"))


#Adjacency/Degree (geo):
#How many Y-region countries are connected to country X?
#Any country with answer degree in range 3-6
#Highlight the node of interest

#Within region degree
adjacency<-ldply(region_graphs,function(g) {
	d<-degree(g)
	sel<-d>=3 & d<7
	return(data.frame(
		region=V(g)$region[sel],
		country=V(g)$label[sel],
		degree=d[sel]
	))
})
adjacency


#Common Connection (geo)
#Is country X connected to any Y-region country? (Yes/No)
#Which of the following countries has the most connections to region-Y?
#List 4 countries with (X-5,X) connections to region-Y

#Which South American country has links to two European countries?
#Argentina (Spain & Italy)
#Which South American country has a link to an Asian country?
#Brazil (Japan)

#List of all cross-region links
#grid<-expand.grid(names(regions),names(regions))
#grid<-subset(grid,Var1!=Var2)
#grid<-subset(grid,paste0(Var1,Var2)[paste0(Var2,Var1)])
rs<-names(regions)
N<-choose(length(rs),2)
grid<-data.frame(r1=rep(NA,N),r2=rep(NA,N),stringsAsFactors=FALSE)
i<-0
for (r1 in seq(rs)) {
	for (r2 in seq(rs)) {
		if (r1<r2) {
			i<-i+1
			grid[i,]<-c(rs[r1],rs[r2])
		}
	}
}
grid

#Now get edges with in graph where incident verteices are R1 or R2
#     incident(graph, v, mode = c("all", "out", "in", "total"))

#incident			
#incident_edges

#Group-only
#How many regions are connected to Y-region countries?

gCollapsed<-contract(graph,as.integer(as.factor(V(graph)$region)),vertex.attr.comb="first")
gCollapsed<-simplify(gCollapsed,remove.multiple=TRUE,remove.loops=TRUE)
gCollapsed
group_only<-data.frame(region=V(gCollapsed)$region,degree=degree(gCollapsed))
group_only

#Group-Node Tasks
#How many countries are in Y-region?
g2<-read.graph("immigration.gml",format="gml")
group_node<-table(V(g2)$region)
group_node

#Group-Edge Tasks
#(delete)How many connections (edges) involve at least one Y-region country?
#How many connections (edges) are between two Y-region countries?
gCollapsed<-contract(graph,as.integer(as.factor(V(graph)$region)),vertex.attr.comb="first")
E(gCollapsed)$weight<-1
gCollapsed<-simplify(gCollapsed,remove.multiple=TRUE,remove.loops=FALSE,edge.attr.comb="sum")
gCollapsed
V(gCollapsed)$label<-V(gCollapsed)$region
V(gCollapsed)$name<-V(gCollapsed)$region

edges<-as_data_frame(gCollapsed,what="edges")
group_edge<-subset(edges,to==from)
group_edge<-group_edge[,c("to","weight")]
names(group_edge)<-c("region","internal.links")
group_edge

#Group-Network tasks (may overlap with other task types)
#How many links connect X and Y regions?
group_net<-subset(edges,to!=from)
group_net



#####################

#Adjacency/Degree (geo):
#How many Y-region countries are connected to country X?
adjacency

#Group-only
#How many regions are connected to Y-region countries?
group_only

#How many countries are in Y-region?
group_node

#Group-Edge Tasks
#How many connections (edges) are between two Y-region countries?
group_edge

#Group-Network tasks
#How many links connect X and Y regions?
group_net

