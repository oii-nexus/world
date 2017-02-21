L2_path = 'C:/Users/install/Documents/work/world/';
L2_Poly = L2.ge.req((L2_path+'polygon.L2'),'reload');
L2_G = L2.aux.fromJSON(L2.sc.read((L2_path+'data/map/countries.geo.json')));


L2_getCent = function(L2_X) { if (!(L2_X instanceof L2.Ar)) L2_X = new L2.ArJSA([L2_X]);
  if ((L2_X.r>(1))) {
    L2_X = (new L2.ArJSA([L2_X._vEnt((L2_X["map"]((function(L2_A) { if (!(L2_A instanceof L2.Ar)) L2_A = new L2.ArJSA([L2_A]); return L2.tab((L2_Poly._dEnt("area"))(L2_A))}))._map(L2.pf.ew.unbox)["max"]("r",'index')).v[0])])); }
  return L2.tab(L2_Poly._dEnt("eqSpace")((L2.sc.unwrap(L2_X.v[0])),(L2.sc.unwrap(L2_X.v[0]).r)))["mean"]("r"); };
L2_Outline = L2.tab((L2_Poly._dEnt("fromGeoJSON"))(L2_G,'name'));
L2_Cent = L2_Outline["group"]((new L2.ArJSA(['name'])),L2_getCent)["unwrap"]("c");


L2_Cent = L2_Cent._oneDimAr("r",(L2_Cent["key"]("r")["diff"](((new L2.ArJSA(['Antarctica','Falkland Islands','French Southern and Antarctic Lands','New Caledonia']))))));



L2_Cent._oneDimSetAr("r",(new L2.ArJSA(['Norway'])),(L2.sc.apnd("c",(10),(62))));
L2_Cent._oneDimSetAr("r",(new L2.ArJSA(['Canada'])),(L2.sc.apnd("c",(-(100)),(60))));


L2_Ops = L2.sc.pairNone();
L2_Ops._dPush("linePen",(new L2.Box(((new L2.Ar(L2_Outline.r,(0.6)))._appendSc((0),"r")))));
L2_Ops._dPush("pointRadius",(new L2.Box(((new L2.Ar(L2_Outline.r,0))._appendSc((2),"r")))));
L2_Ops._dPush("color",(new L2.Box(((new L2.Ar(L2_Outline.r,'#666'))._appendSc('red',"r")))));
L2_Ops._dPush("put",(1));
L2_Ops._dPush("legend",(0));
L2.aux.plot(L2_Outline._oneDimSc("c",(1))._appendSc(((new L2.Box(L2_Cent))),"r"),"l",true,L2_Ops);



























