var iconProps;mapboxgl.accessToken="pk.eyJ1Ijoic2Nvb3R0ZWNoIiwiYSI6IlBMTjNqVTgifQ.r8a_cZRmGF_GIOKIKaK1dA";var zone={geometry:{coordinates:[[[2.1068895856509187,41.393482908395924],[2.109761237056915,41.39133195408374],[2.1068532297858553,41.386073630054454],[2.11032044314274,41.383836924851835],[2.1112638929498644,41.38372872656018],[2.117201159468152,41.37885620815436],[2.1175905465117353,41.37605570698142],[2.123192666682968,41.3748978384298],[2.1344262204128484,41.364592677160715],[2.121246390439609,41.35423001573213],[2.1236954509235204,41.35258342905834],[2.1528189969942844,41.37259713359762],[2.1569140854199986,41.370353344982675],[2.176258940293792,41.37295768255635],[2.1840463200804265,41.381287959481455],[2.1863874772039935,41.38175961259114],[2.1889510747013787,41.37598207585762],[2.187380881238056,41.368670242472064],[2.195574680469946,41.38461805304459],[2.1939355054454097,41.38630428013656],[2.2089511125840318,41.39664240102718],[2.221514575140219,41.412011134908624],[2.2051629028465527,41.42258083878886],[2.1941565251927386,41.414888104168654],[2.1837663157166958,41.43176640215225],[2.173590289701366,41.4306301172748],[2.176462149989703,41.42555738549834],[2.169693904585955,41.41628034477125],[2.1605584613812994,41.41301079389456],[2.1483261601353263,41.40547739606242],[2.139949467484314,41.40443103094458],[2.1336737028149457,41.41437626019305],[2.118364595155981,41.404428346268446],[2.1239514806934494,41.40126241730573],[2.1150756311266434,41.39731745222795],[2.1121936965562327,41.3934316512898],[2.1068895856509187,41.393482908395924]]],type:"Polygon"},type:"Feature",properties:{}},map=new mapboxgl.Map({container:"map",style:"mapbox://styles/scoottech/cjg8bcsro04nm2ro9ye8xmgxe",center:[2.1734,41.3851],zoom:10,bearing:-44.7});iconProps=1;var zoomer=$("#zoom");map.on("load",function(){map.on("zoomend",function(){console.log(map.getZoom())}),map.on("zoom",function(){zoomer.text(map.getZoom().toFixed(2))}),map.loadImage("../mb/scoot.png",function(o,e){if(o)throw o;map.addImage("bike",e)}),map.loadImage("../mb/bike.png",function(o,e){if(o)throw o;map.addImage("scoot",e)}),map.loadImage("../mb/dot.png",function(o,e){if(o)throw o;map.addImage("dot",e)}),setTimeout(function(){makeRandFeatures(1600)},1500);var o=turf.point([2.1734,41.3851]),e=turf.buffer(o,1350,{units:"feet"}),a=turf.buffer(o,2700,{units:"feet"});map.addLayer({id:"route",type:"line",source:{type:"geojson",data:e},paint:{"line-width":1}}),map.addLayer({id:"route10",type:"line",source:{type:"geojson",data:a},paint:{"line-width":1}})});var iconImageProps={property:"icon",stops:[[{zoom:0,value:0},"dot"],[{zoom:0,value:1},"dot"],[{zoom:12,value:0},"bike"],[{zoom:12,value:1},"scoot"]]},makeRandFeatures=function(o){console.log("ok");for(var e=turf.bbox(zone),a=turf.randomPoint(o,{bbox:e}),t=[],n=0;n<o;n++){var i=a.features[n];turf.booleanWithin(i,zone)&&(a.features[n].properties.icon=n%2==0?0:1,t.push(a.features[n]))}var r=turf.featureCollection(t);console.log(JSON.stringify(r)),map.addLayer({id:"icons",type:"symbol",source:{type:"geojson",data:r},layout:{"icon-allow-overlap":{stops:[[0,!1],[12,!0]]},"icon-offset":[0,7],"icon-anchor":"bottom","icon-image":iconImageProps,"icon-size":iconProps}})},changeLayout=function(o,e){"icon-size-min"===o?iconProps=e:"icon-size-full"===o&&(iconProps=e),map.setLayoutProperty("icons","icon-size",iconProps)};$(function(){$(".slider-element").each(function(){console.log("each");var o=$(this),e=parseFloat(o.attr("max")),a=parseFloat(o.attr("min")),t=e-a,n;n=t<2?.05:.25,$(this).parent().find("label span").text(e),console.log(e,a,n),o.slider({value:e,min:a,max:e,step:n})}),$(".slider-element").slider({slide:function(o,e){console.log(e);var a=$(this).attr("val");$(this).parent().find("label span").text(e.value),console.log(a),changeLayout(a,e.value)}}),$(".slider-element-2").slider({value:10,min:10,max:16,step:.5}),$(".slider-element-2").slider({slide:function(o,e){console.log(e);var a=$(this).attr("val");$(this).parent().find("label span").text(e.value),iconImageProps.stops[2][0].zoom=e.value,iconImageProps.stops[3][0].zoom=e.value,map.setLayoutProperty("icons","icon-image",iconImageProps)}})});