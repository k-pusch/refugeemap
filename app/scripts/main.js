

/* jshint devel:true */
/*jshint camelcase: false */
/*global L,cartodb,wt */
(function(){
  'use strict';
  if (document.location.search === '?withfb' && (window.matchMedia('(max-width: 540px)').matches)) {
    $('html').addClass('mobdevice');
  } else {


window.onload = function() {
var filter='Übersicht';
  var map = new L.Map('map', {
    center: [50.5,10.24],
    zoom: 6,
    minZoom:6,
    //zoomControl:false
    maxBounds: [[55.64039896,4.73847656],[46.83013364,17.75390625]]
  });
function getSQL(category) {
  if(category === 'Übersicht') {
    return 'SELECT * FROM gewalt_gegen_asylbewerber_flle_ab_jan_14';
  }
  if(category === 'Demonstration') {
    return 'SELECT * FROM gewalt_gegen_asylbewerber_flle_ab_jan_14 where kategorie=\'Demonstration\' or kategorie=\'Hetze\'';
  } else {
    return 'SELECT * FROM gewalt_gegen_asylbewerber_flle_ab_jan_14 where kategorie=\''+category+'\'';
  }

}

var base;
var intensity;
  function addBase() {
     cartodb.createLayer(map,{
  user_name: 'welt',
  type: 'cartodb',
  sublayers: [{
    sql: 'SELECT * FROM asylbewerber_pro_einwohner',
    cartocss: $('#asyl').text(),
  }]
}).addTo(map)
.done(function(layer) {
  base = layer;
  addIntensity();
  });

}

function addIntensity() {
     cartodb.createLayer(map,{
    user_name: 'welt',
    type: 'cartodb',
    opacity:1,
    sublayers: [{
      sql: 'SELECT * FROM gewalt_gegen_asylbewerber_flle_ab_jan_14',
      cartocss: $('#intensity').text(),
      interactivity:'cartodb_id, ort, datum,text'
    }]
  })
  .addTo(map,1)
  .done(function(layer) {
    intensity = layer;
    layer.getSubLayer(0).setInteraction(true);
    //cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['datum','category','ort','text'],{
      //cdb.Vis.addOverlay({type:'zoom'});
    layer.getSubLayer(0).infowindow.set('template', $('#popup').html());
    layer.getSubLayer(0).on('featureClick', function(e, pos, latlng, data) {
    intensity.setCartoCSS($('#simple').text()+' #gewalt_gegen_asylbewerber_flle_ab_jan_14[cartodb_id='+data.cartodb_id+']{ marker-fill: #000000; }');
        getEntriesForLatLong(data.cartodb_id);
      });

  var $catswitch = $('#catswitch');
    $catswitch.children().on('click',function() {
      $catswitch.children().removeClass('active');
      $(this).addClass('active');
     // map.setZoom(6);
     // map.panTo([50.5,10.24]);
      toggleLayer($(this).data('category'));
    });
     function toggleLayer(category) {
      filter=category;
      if(category==='Übersicht') {
       getEntriesForLatLong(508);
        setSQL(category);

      } else {
        var id=508;
      if(category==='Brandanschlag') {
             id=397;
      }
       if(category==='Sachbeschädigung') {
             id=491;
      }
       if(category==='Körperverletzung') {
             id=244;
      }
       if(category==='Demonstration') {
             id=506;
      }
        getEntriesForLatLong(id);
        setSQL(category);
        intensity.setCartoCSS($('#simple').text()+' #gewalt_gegen_asylbewerber_flle_ab_jan_14[cartodb_id='+id+']{ marker-fill: #000000; }');
      }
    }
    function setSQL(category) {
         intensity.getSubLayer(0).setSQL(getSQL(category));
    }

  getEntriesForLatLong(508);
  });
}

function showTooltip(data) {


  $('#tooltip').children().remove();
  $('#tooltip').append('<span class="location">'+data.rows[0].ort+'</span>');

  $('#tooltip').append('<ul></ul>');
  var $tooltipUL = $('#tooltip ul');
  for (var i=0;i<data.rows.length;i++) {
    $tooltipUL.append('<li></li>');
    var $li = $tooltipUL.children('li').eq(i);

    $li.append('<span class="date">'+data.rows[i].datum+'<span>');
   $li.append('<span class="category">'+data.rows[i].kategorie+'</span>');
    $li.append('<p class="text">'+data.rows[i].text+'</p>');
  }
}

//function addHeatmap() {
 /* cartodb.createLayer(map,{
  type: 'torque', // Required

  options: {
    query: 'SELECT * FROM gewalt_gegen_asylbewerber_merge9',   // Required if table_name is not given
    //table_name: "table_name",   // Required if query is not given
    user_name: 'welt', // Required
    cartocss: $('#heatmap').text()
  }*/

/*cartodb.createLayer(map,{
  user_name: 'welt',
  type: 'cartodb',
  opacity:0,
  sublayers: [{

    sql: 'SELECT * FROM gewalt_gegen_asylbewerber_flle_ab_jan_14',
    cartocss: $('#simple').text(),

    //cartocss: $('#heatmap').text()
    //interactivity:'cartodb_id, ort, datum'
  }]


})
.addTo(map,1) // add the layer to our map which already contains 1 sublayer
.done(function(layer) {

  */

          //cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['cartodb_id']);

  /*layer.createSubLayer({
      sql: "SELECT * FROM deutschland",
      cartocss: '#untitled_table_2{'+
                'polygon-opacity: 0;'+
                'line-color: #000000;'+
                'line-width: 1;'+
                'line-opacity: 1;'+
                '}'
  });
*/
  // create and add a new sublayer
  /*layer.createSubLayer({
    sql: "SELECT * FROM masern_impfung_1_abdeckung_international limit 5",
    cartocss: '#masern_impfung_1_abdeckung_international{polygon-fill: #f00;polygon-opacity: 0.8;line-color: #FFF;line-width: 1;line-opacity: 1;}'
  });
*/
  // change the query for the first layer
  //layer.getSub#Layer(1).setSQL("SELECT * FROM masern_impfung_1_abdeckung_international limit 10");
 // console.log(layer);

  //var slayer = layer.getSubLayer(0);

  //slayer.hide();
  //slayer.infowindow.set('template', $('#infowindow_template').html());


  //slayer.setInteraction(true);


  //  sublayer.infowindow.set('template', $('#infowindow_template').html());
  //slayer.on('featureClick', function(e, pos, latlng, data) {
    //  console.log("Hey! You clicked " + data.name);

  //});

//});
//}
if (window.matchMedia('(max-width: 540px)').matches) {
  $('#legend').appendTo('p.intro');
}
addBase();

function getEntriesForLatLong(id) {

  var sql = new cartodb.SQL({ user: 'welt' });
  var sqlq;
if (filter !== 'Übersicht') {
  if(filter === 'Demonstration') {
      sqlq = 'with o as (SELECT the_geom from gewalt_gegen_asylbewerber_flle_ab_jan_14 where cartodb_id = \''+id+'\') SELECT gewalt_gegen_asylbewerber_flle_ab_jan_14.the_geom,ort,text,kategorie,cartodb_id,datum FROM o, gewalt_gegen_asylbewerber_flle_ab_jan_14 WHERE gewalt_gegen_asylbewerber_flle_ab_jan_14.the_geom=o.the_geom and (gewalt_gegen_asylbewerber_flle_ab_jan_14.kategorie=\'Demonstration\' or gewalt_gegen_asylbewerber_flle_ab_jan_14.kategorie=\'Hetze\')';
    } else {
        sqlq = 'with o as (SELECT the_geom from gewalt_gegen_asylbewerber_flle_ab_jan_14 where cartodb_id = \''+id+'\') SELECT gewalt_gegen_asylbewerber_flle_ab_jan_14.the_geom,ort,text,kategorie,cartodb_id,datum FROM o, gewalt_gegen_asylbewerber_flle_ab_jan_14 WHERE gewalt_gegen_asylbewerber_flle_ab_jan_14.the_geom=o.the_geom and gewalt_gegen_asylbewerber_flle_ab_jan_14.kategorie=\''+filter+'\' order by gewalt_gegen_asylbewerber_flle_ab_jan_14.datum';
      }
} else {

    intensity.setCartoCSS($('#intensity').text()+' #gewalt_gegen_asylbewerber_flle_ab_jan_14[cartodb_id='+id+']{ first/marker-fill:#000;first/marker-line-color: #000;}'+' #gewalt_gegen_asylbewerber_flle_ab_jan_14[cartodb_id='+id+']{ marker-fill:#000;marker-line-color: #000;}');
  sqlq = 'with o as (SELECT the_geom from gewalt_gegen_asylbewerber_flle_ab_jan_14 where cartodb_id = \''+id+'\') SELECT gewalt_gegen_asylbewerber_flle_ab_jan_14.the_geom,ort,text,kategorie,cartodb_id,datum FROM o, gewalt_gegen_asylbewerber_flle_ab_jan_14 WHERE gewalt_gegen_asylbewerber_flle_ab_jan_14.the_geom=o.the_geom';
}
sql.execute(sqlq)
 .done(function(data) {
    showTooltip(data);
  })
  .error(function(errors) {
    console.log('errors:' + errors);
  });
}

};
}
})();

