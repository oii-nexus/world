(function() { var L2_Poly = L2.sc.pairNone();



  var L2_area = function(L2_P) { if (!(L2_P instanceof L2.Ar)) L2_P = new L2.ArJSA([L2_P]);
    var L2_X = L2_P._oneDimSc("c",(0));
    var L2_Y = L2_P._oneDimSc("c",(1));
    return L2.symb.as["/"](L2.symb.aa.apply("-",L2.symb.aa.apply("*",L2_X["slice"]("r",(0),(-2)),(L2_Y["slice"]("r",(1),(-1)))),(L2.symb.aa.apply("*",L2_X["slice"]("r",(1),(-1)),(L2_Y["slice"]("r",(0),(-2))))))["sum"]("r"),(2))._map(L2.pf.ew.abs);
 };
  L2_Poly._dPush("area",L2_area);




  var L2_arcLen = (function(L2_P) { if (!(L2_P instanceof L2.Ar)) L2_P = new L2.ArJSA([L2_P]); return (L2.symb.aa.apply("-",L2_P["slice"]("r",(1),(-1)),(L2_P["slice"]("r",(0),(-2))))._map_1_as(L2.pf.math["^"],(2))["sum"]("c"))._appendSc((0),"r",true)._map(L2.pf.ew.sqrt)["cuSum"]("r")});
  L2_Poly._dPush("arcLen",L2_arcLen);







  var L2_eqSpace = function(L2_P,L2_k) { if (!(L2_P instanceof L2.Ar)) L2_P = new L2.ArJSA([L2_P]); if (L2_k instanceof L2.Ar) L2_k = L2_k.v[0];
    if (((L2_P.r<(2)) || ((L2_k<(2))))) {
      L2.ge.error('original and resampled polygon must have more than 2 points'); }
    var L2_ArcP = L2.tab(L2_arcLen(L2_P));
    var L2_DiffP = (L2.symb.aa.apply("-",L2_ArcP["slice"]("r",(1),(-1)),(L2_ArcP["slice"]("r",(0),(-2)))))._appendSc((0),"r",true);
    var L2_step = (L2_ArcP._vEnt((-1))/L2_k);
    var L2_ArcK = L2.sc.range((0),(L2_ArcP._vEnt((-1))),L2_step)["slice"]("r",(0),((L2_k-(1))));
    var L2_NewP = (new L2.ArSh((new L2.ArJSA([L2_k,(2)]))));
    var L2_next = (1);
    for (var L2_i=(0); L2_i<=((L2_k-(1))); L2_i+=1) {
      while ((1)) {
        if ((L2_ArcK._vEnt(L2_i)<=(L2_ArcP._vEnt(L2_next)))) {
          var L2_interp = ((L2_ArcK._vEnt(L2_i)-(L2_ArcP._vEnt(((L2_next-(1))))))/(L2_DiffP._vEnt(L2_next)));
          L2_NewP._oneDimSetAr("r",(new L2.ArJSA([L2_i])),(L2.symb.aa.apply("+",L2.symb.as["*"](L2_P._oneDimSc("r",((L2_next-(1)))),(((1)-L2_interp))),(L2.symb.as["*"](L2_P._oneDimSc("r",L2_next),L2_interp)))));
          break; }
        L2_next = (L2_next+(1)); } }
    return L2_NewP; };
  L2_Poly._dPush("eqSpace",L2_eqSpace);








  var L2_isIn = function(L2_TestXY,L2_VertXY) { if (!(L2_TestXY instanceof L2.Ar)) L2_TestXY = new L2.ArJSA([L2_TestXY]); if (!(L2_VertXY instanceof L2.Ar)) L2_VertXY = new L2.ArJSA([L2_VertXY]);

    var T, V, nT, nV, In, i, j, k, x, y, xi, yi, xj, yj, inside;
    T = L2.linAlg.matrix(L2_TestXY)[0];
    V = L2.linAlg.matrix(L2_VertXY)[0];
    nT = T.length;
    nV = V.length;
    In = new Array(nT);
    for (k=0; k<nT; k++) {
      x = T[k][0];
      y = T[k][1];
      inside = false;
      j = nV - 1;
      for (i=0; i<nV; i++) {
        xi = V[i][0];
        yi = V[i][1];
        xj = V[j][0];
        yj = V[j][1];
        if (((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi) / (yj - yi) + xi))) inside = !inside;
        j = i }
      In[k] = inside }
    return new L2.ArJSA(In);

    undefined; };
  L2_Poly._dPush("isIn",L2_isIn);









  var L2_fromGeoJSON = function(L2_X,L2_name) { if (!(L2_X instanceof L2.Ar)) L2_X = new L2.ArJSA([L2_X]); if (L2_name instanceof L2.Ar) L2_name = L2_name.v[0]; var L2_Tmp = new L2.ArJSA([undefined]);
    L2_X = L2.sc.unwrap(L2_X._dEnt("features"));
    var L2_R = (new L2.ArSh((new L2.ArJSA([(0),(2)]))))["key:"]("c",undefined,((new L2.ArJSA(['name','polygon']))));
    var L2_ent_index_=0; var L2_ent_limit_=L2_X.v.length; var L2_ent=L2_X.v[0]; for (;L2_ent_index_<L2_ent_limit_; L2_ent=L2_X.v[++L2_ent_index_]) {
      var L2_rg = L2.aux.openIfBox(L2.sc._dEnt(L2_ent,"properties"))._vEnt(L2_name);
      if ((L2.sc._dEnt(L2.sc._dEnt(L2_ent,"geometry"),"type")==='Polygon')) {
        L2_R._appendAr((L2.sc.apnd("c",L2_rg,((new L2.Box(L2.sc.unwrap(L2.sc.unwrap(L2.sc._dEnt(L2.sc._dEnt(L2_ent,"geometry"),"coordinates")).v[0])["map"]((function(L2_A) { if (!(L2_A instanceof L2.Ar)) L2_A = new L2.ArJSA([L2_A]); return (new L2.ArTp(L2_A))}))["unwrap"]("c")))))),"r",false,true); }
      else if ((L2.sc._dEnt(L2.sc._dEnt(L2_ent,"geometry"),"type")==='MultiPolygon')) {
        L2_Tmp = L2.sc.unwrap(L2.sc._dEnt(L2.sc._dEnt(L2_ent,"geometry"),"coordinates"))["map"]((function(L2_A) { if (!(L2_A instanceof L2.Ar)) L2_A = new L2.ArJSA([L2_A]); return L2.sc.unwrap(L2_A.v[0])["map"]((function(L2_B) { if (!(L2_B instanceof L2.Ar)) L2_B = new L2.ArJSA([L2_B]); return (new L2.ArTp(L2_B))}))["unwrap"]("c")}));
        L2_R._appendAr(((new L2.ArJSA([L2_rg]))["rep"]("r",(L2_Tmp.r))._appendAr(L2_Tmp,"c")),"r",false,true); }
      else {
        'geometry type must be Polygon or MuliPolygon'; } }
    return L2_R["order"]((new L2.ArJSA([(0)]))); };
  L2_Poly._dPush("fromGeoJSON",L2_fromGeoJSON);




	(function() {
		if (L2.runningIn === 'wp') {
			var tags = document.getElementsByTagName('script');
			L2.modules.loaded[tags[tags.length-1].getAttribute('src')] = L2_Poly }
		else if (typeof module === 'object' && module.exports) module.exports = L2_Poly }()) }())