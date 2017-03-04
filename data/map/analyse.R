library(igraph)
library(plyr)
library(jsonlite)

graph<-read.graph("immigration.gml",format="gml")
#V(graph)$name<-V(graph)$label
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
	V(gtmp)$name<-ifelse(V(gtmp)$region==r,r,V(gtmp)$label)
	gtmp<-contract(gtmp,as.integer(as.factor(V(gtmp)$name)),vertex.attr.comb="first")
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
common_connection<-ldply(names(regions),function(r) {
	g<-region_collapse[[r]]
	#edges<-incident(g,which(V(g)$label==r))
	edges<-as_data_frame(g,what="edges")
	edges<-subset(edges,to==r | from==r)
	edges
})
common_connection
membership<-as_data_frame(graph,what="vertices")
cc<-common_connection
cc$region1<-ifelse(cc$to%in%names(regions),cc$to,cc$from)
cc$country<-ifelse(cc$to%in%names(regions),cc$from,cc$to)
cc<-cc[,c("region1","country","weight")]
cc$region2<-membership$region[match(cc$country,membership$label)]

#Which Y-region country has the most links to X-region?
cc<-ddply(cc,.(region1,region2),function(df) {
	if (length(which(df$weight==max(df$weight)))==1) {
		return(data.frame(df[which(df$weight==max(df$weight)),]))
	} else {
		return(NULL)
	}
})

#The US is always the country with the most links to any other region
cc[cc$region2=="North America &#38; Caribbean",]
#Drop it
cc<-subset(cc,country!="United States of America")


#cc[,c("country","region2")]
#cc<-subset(common_connection,weight>=2)

#cc<-cc[order(cc$region1,cc$weight),]
#cc<-subset(cc,!duplicated(paste0(cc$region1,cc$region2)))
#Which European country has 2 links to Oceania?
# Oceania                 United Kingdom      2

#Which Asian country has the most links with the Middle East & North Africa
#India Middle East &#38; North Africa      7

#Which MD&NA country has 6 (the most links) with Asia?
#Asia                   Saudi Arabia      6

#Which Asian country has the most links with Europe?
#Europe                         Russia      5

#Which South American country has the most links with Europe?
#Argentina                         Europe      2

#Which European country has the most links with South America?
#South America                          Spain      4

#Asia                      Australia      4
#Asia                         Canada      4
#Asia           United Arab Emirates      4
#Europe                         Turkey      4
#Bangladesh Middle East &#38; North Africa      4
#France Middle East &#38; North Africa      4


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
group_node<-as.data.frame(table(V(g2)$region))
names(group_node)<-c("region","count")
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

#Group-Network tasks
#How many links connect X and Y regions?
group_net<-subset(edges,to!=from)
group_net




ADJ=c(
	"North America & Caribbean"="North American & Caribbean",
	"South America"="South American",
	"Europe"="European",
	"Middle East &#38; North Africa"="Middle Eastern &#38; North African",
	"Sub-Saharan Africa"="Sub-Saharan African",
	"Asia"="Asian",
	"Oceania"="Oceanian"
)


#####################
#adjacency, cc, group_only, gruop_node, group_net

#Adjacency/Degree (geo):
#How many adjacency$region countries are connected to adjacency$country?
x<-data.frame(question=paste0("How many <strong>",ADJ[as.character(adjacency$region)],"</strong> countries are connected to <strong>",adjacency$country,"</strong>?"),target=adjacency$country)
toJSON(x)



#Common connection
#Which ADJ[cc$region2] country has the most links to cc$region1?
cc
cc$from<-ADJ[as.character(cc$region2)]
cc$to<-cc$region1
toJSON(cc[,c("from","to")])


#Group-only
#How many regions are connected to group_only$region countries?
group_only

#x<-data.frame(question=paste0("How many different geographic regions are connected to <strong>",ADJ[as.character(group_only$region)],"</strong> countries?"),target=group_only$region)
#toJSON(x)
toJSON(group_only$region)

#How many countries are in group_node$region?
group_node
#x<-data.frame(question=paste0("How many countries are in <strong>",group_node$region,"</strong>?"),target=group_node$region)
#toJSON(x)
toJSON(group_node$region)

#Group-Edge Tasks
#How many connections are there between countries in group_edge$region?
group_edge
#x<-data.frame(question=paste0("How many connections (edges) are there between countries in <strong>",group_edge$region,"</strong>?"),target=group_edge$region)
#toJSON(x)
toJSON(group_edge$region)

#Group-Network tasks
#How many connections are there between group_net$from and group_net$to countries?
group_net
toJSON(group_net[,c("from","to")])

