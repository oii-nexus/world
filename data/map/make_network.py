import json
import networkx as nx

membership={}
with open("membership.csv","r") as f:
	for line in f:
		country,region=line.strip().split("\t",1)
		membership[country]=region

#http://colorbrewer2.org/#type=qualitative&scheme=Set3&n=7
#7-class accent
#C=['#7fc97f','#beaed4','#fdc086','#ffff99','#386cb0','#f0027f','#bf5b17']
#7-class Set1
#C=['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628']
#7-class Set3
#C=['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69']
#7-class Dark2
C=['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e','#e6ab02','#a6761d']

COLORS={
	"North America & Caribbean":C[0],
	"South America":C[1],
	"Europe":C[2],
	"Middle East & North Africa":C[3],
	"Sub-Saharan Africa":C[4],
	"Asia":C[5],
	"Oceania":C[6]
}

with open("edges.json","r") as f:
	e_tmp=json.load(f)

with open("cent.json","r") as f:
	n_tmp=json.load(f)

g=nx.Graph()
g.add_edges_from(e_tmp)
nodes=g.nodes()
for n in n_tmp:
	n=n["name"]
	if not n in nodes:
		g.add_node(n,{"region":membership[n]})
	else:
		g.node[n]["region"]=membership[n]
fr=nx.spring_layout(g)
#http://networkx.readthedocs.io/en/networkx-1.10/reference/generated/networkx.drawing.layout.spring_layout.html#networkx.drawing.layout.spring_layout
#print(fr)
nx.write_gml(g,"immigration.gml")

nodes=[]
for n in n_tmp:
	name=n["name"]
	nodes.append({
		"id":name,
		"label":name,
		"size":1,
		#"x":0,"y":0,
		"layouts":{
			"geo":{
				"x":n["col_0"],
				"y":-1*n["col_1"]
			},
			"fr":{
				"x":fr[name][0],
				"y":fr[name][1]
			}
		},
		"region":membership[name],
		"color":COLORS[membership[name]]
	})

edges=[]
i=0
for e in e_tmp:
	edge={
		"id":i,
		"source":e[0],
		"target":e[1],
		"size":1
	}
	if membership[e[0]]==membership[e[1]]:
		edge["color"]=COLORS[membership[e[0]]]
	edges.append(edge)
	i+=1

with open("immigration.json","w") as f:
	json.dump({"edges":edges,"nodes":nodes},f,indent=4)


