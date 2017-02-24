


L2_Poly = L2.ge.req('polygon.L2','reload');
L2_G = L2.aux.fromJSON(L2.sc.read('data/map/countries.geo.json'));


L2_Outline = L2.tab((L2_Poly._dEnt("fromGeoJSON"))(L2_G,'name'))["unless"]('name','Antarctica');
L2_getCent = function(L2_X) { if (!(L2_X instanceof L2.Ar)) L2_X = new L2.ArJSA([L2_X]);
  if ((L2_X.r>(1))) {
    L2_X = (new L2.ArJSA([L2_X._vEnt((L2_X["map"]((function(L2_A) { if (!(L2_A instanceof L2.Ar)) L2_A = new L2.ArJSA([L2_A]); return L2.tab((L2_Poly._dEnt("area"))(L2_A))}))._map(L2.pf.ew.unbox)["max"]("r",'index')).v[0])])); }
  return L2.tab(L2_Poly._dEnt("eqSpace")((L2.sc.unwrap(L2_X.v[0])),(L2.sc.unwrap(L2_X.v[0]).r)))["mean"]("r"); };
L2_Cent = L2_Outline["group"]((new L2.ArJSA(['name'])),L2_getCent)["unwrap"]("c");


L2_Cent["key:"]("r",'West Bank','Palestine');


L2_Cent._oneDimSetAr("r",(new L2.ArJSA(['Norway'])),(L2.sc.apnd("c",(10),(62))));
L2_Cent._oneDimSetAr("r",(new L2.ArJSA(['Canada'])),(L2.sc.apnd("c",(-(105)),(60))));
L2_Cent._oneDimSetAr("r",(new L2.ArJSA(['Malaysia'])),(L2.sc.apnd("c",(102),(4))));
L2_Cent._oneDimSetAr("r",(new L2.ArJSA(['Israel'])),(L2.sc.apnd("c",(34.9),(30.9))));
L2_Cent._oneDimSetAr("r",(new L2.ArJSA(['Indonesia'])),(L2.sc.apnd("c",(110),((-(7.4))))));


L2_Cent._appendAr((L2.sc.apnd("c",(103.8),(1.2))["key:"]("r",undefined,'Singapore')),"r",false,true)._appendAr((L2.sc.apnd("c",(114.2),(22.2))["key:"]("r",undefined,'Hong Kong')),"r",false,true)._appendAr((L2.sc.apnd("c",(113.2),(22))["key:"]("r",undefined,'Macao')),"r",false,true)._appendAr((L2.sc.apnd("c",(50.4),(26))["key:"]("r",undefined,'Bahrain')),"r",false,true);








L2_OD = L2.sc.loadCSV('data/immigration/UN_total_immigrant_stock_2015.csv','name','miss');
L2_OD = L2_OD["key:"]("r",undefined,(L2_OD._oneDimSc("c",(0),'cut')))["sortKey"]("r")["sortKey"]("c");
if ((!L2.ge.equal(L2_OD["key"]("r"),(L2_OD["key"]("c"))))) {
  L2.ge.error('origin and destination keys not equal');



 }
L2_IC = L2_OD["key"]("r");
L2_Change = L2.sc.pairMult('Bolivia (Plurinational State of)','Bolivia','Brunei Darussalam','Brunei','Timor-Leste','East Timor','Guinea-Bissau','Guinea Bissau','Iran (Islamic Republic of)','Iran','C�te d\'Ivoire','Ivory Coast','Lao People\'s Democratic Republic','Laos','The former Yugoslav Republic of Macedonia','Macedonia','Republic of Moldova','Moldova','Democratic People\'s Republic of Korea','North Korea','Serbia','Republic of Serbia','Congo','Republic of the Congo','Russian Federation','Russia','Republic of Korea','South Korea','Syrian Arab Republic','Syria','Bahamas','The Bahamas','United Kingdom of Great Britain and Northern Ireland','United Kingdom','Venezuela (Bolivarian Republic of)','Venezuela','Viet Nam','Vietnam','China, Hong Kong Special Administrative Region','Hong Kong','China, Macao Special Administrative Region','Macao','State of Palestine','Palestine');






















L2_IC["where:"]((0),(L2_Change["key"]("r")),L2_Change);
L2_OD["key:"]("r",undefined,L2_IC)["key:"]("c",undefined,L2_IC);




L2_nEdge = (200);
L2_OD["_v:"]((L2.symb.as["=="](L2_OD,undefined)["find"]()),(0));
L2_OD = L2.symb.aa.apply("+",(new L2.ArTp(L2_OD)),L2_OD);
L2_i=0; L2_i_limit_=L2_OD.r; for (; L2_i<L2_i_limit_; L2_i++) {
  for (L2_j=L2_i; L2_j<=((L2_OD.c-(1))); L2_j+=1) {
    L2_OD["_e:"](L2_i,L2_j,(0)); } }
L2_TopInd = L2_OD["desc"]('index')["slice"]("r",(0),((L2_nEdge-(1))));
L2_Top = L2_IC._oneDimAr("r",(L2_OD["ind"]("r",L2_TopInd)))._appendAr((L2_IC._oneDimAr("r",(L2_OD["ind"]("c",L2_TopInd)))),"c");
if (L2_Top["in"]((L2_Cent["key"]("r")))["all"]("r")["!"]().v[0]) {
  L2.ge.error('missing centroid'); }
L2_CentUsed = L2_Cent._oneDimAr("r",(L2_Cent["key"]("r")["inter"](L2_Top)));




L2_Ops = L2.sc.pairNone();
L2_Ops._dPush("linePen",(new L2.Box(((new L2.Ar(L2_Outline.r,(0.6)))._appendSc((0),"r")))));
L2_Ops._dPush("pointRadius",(new L2.Box(((new L2.Ar(L2_Outline.r,0))._appendSc((2),"r")))));
L2_Ops._dPush("color",(new L2.Box(((new L2.Ar(L2_Outline.r,'#666'))._appendSc('red',"r")))));
L2_Ops._dPush("put",(1));
L2_Ops._dPush("legend",(0));
L2_Ops._dPush("borderWidth",(0));
L2_Ops._dPush("xTick",(0));
L2_Ops._dPush("yTick",(0));








L2.aux.plot(L2_Outline._oneDimSc("c",(1))._appendSc(((new L2.Box(L2_CentUsed))),"r"),"l",true,L2_Ops);


L2.sc.unwrap(L2_Ops._dEnt("linePen"))._appendAr(((new L2.Ar(L2_nEdge,(0.6)))),"r",false,true);
L2.sc.unwrap(L2_Ops._dEnt("pointRadius"))._appendAr(((new L2.Ar(L2_nEdge,0))),"r",false,true);
L2.sc.unwrap(L2_Ops._dEnt("color"))._appendAr(((new L2.Ar(L2_nEdge,'#0b0'))),"r",false,true);
L2_Ops._dPush("put",(2));
L2.aux.plot(L2_Outline._oneDimSc("c",(1))._appendSc(((new L2.Box(L2_CentUsed))),"r")._appendAr((L2_Top["wrap"]("c")["map"]((function(L2_A) { if (!(L2_A instanceof L2.Ar)) L2_A = new L2.ArJSA([L2_A]); return L2_Cent._oneDimAr("r",((new L2.ArTp(L2_A))))}))),"r"),"l",true,L2_Ops);




