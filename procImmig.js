L2_path = 'C:/Users/install/Documents/work/world/';


L2_X = L2.sc.loadCSV((L2_path+'data/immigration/UN_total_immigrant_stock_2015.csv'),'name','miss');



L2_X["key:"]("r",undefined,(L2_X._oneDimSc("c",(0),'cut')));
L2_X = L2.aux.prt((new L2.ArTp(L2_X["sortKey"]("r")["sortKey"]("c"))));