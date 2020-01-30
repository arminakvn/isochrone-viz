<template>
    <div id="routing-view" class="map">

    </div>
</template>
<script>
import * as mapboxgl from 'mapbox-gl'
import * as d3 from 'd3'
export default {
    name:'RoutingView',
    // props:["items"],
    data: function(){
        return {
            fromPoint:[42.355278,-71.0616],
            toPont:[42.355978,-71.0816],
            fromtoPoints:[]
        }
    },
    computed: {
    map: function(){
      let self = this;
      
      mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtaW5hdm4iLCJhIjoiSTFteE9EOCJ9.iDzgmNaITa0-q-H_jw1lJw';
      let map = new mapboxgl.Map({
                    container: self.$el,
                    style: 'mapbox://styles/arminavn/cjolq7bui0wjm2spp1bfrozbi',//'mapbox://styles/arminavn/cjg2o1xyt08gn2rqocqpyq4k6', //// 'mapbox://styles/arminavn/cjolq7bui0wjm2spp1bfrozbi', //'mapbox://styles/arminavn/cj8xnnjkycd4o2ss9c2rofh9p',
                    center: [-71.068964, 42.347643],
                    zoom: 14
                });
                return map
    }
},
methods: {
    onDragEnd: function() {
                let self = this;
                
                let lngLat1 = self.marker1.getLngLat();
                let lngLat2 = self.marker2.getLngLat();
                // coordinates.style.display = 'block';
                // coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
                
                // self.$parent.props.apoint = lngLat
                // this.currentRoute = this.$route.params.route;
                self.$emit('updateFromTo',[lngLat1, lngLat2])
                self.getGeoJson([lngLat1, lngLat2])
            },
            getGeoJson: function(latlng){
                const self = this;
                
                let files=[]
                let encoderFlg = "bike";
                let num_of_alterntves = 3;
                let lineScale = d3.scalePow()
                                .range([4,15]);
                // let encoderFlg = "racingbike";
                files.push("http://localhost:8989/route?point="+latlng[0]["lat"]+"%2C"+latlng[0]["lng"]+"&point="+latlng[1]["lat"]+"%2C"+latlng[1]["lng"]+"&locale=en-US&vehicle=bike&weighting=fastest&points_encoded=false&elevation=false&algorithm=alternative_route&alternative_route.max_paths=" + num_of_alterntves +"&use_miles=true&details=distance&details=edge_id&details=average_speed&details=weight&details=time&details=street_name&details=surface&details=road_class&details=road_environment")
                
                Promise.all(
                                files.map(
                                        url => d3.json(url)
                                )
                        ).then(function(d) {
                            console.log(d)
                                let dateArr = [];
                                let anchorArr = [];
                                let waypointArr = [];
                                let dataitems = [];
                                let colors = [
                                        ["darkred","red"],

                                        ["darkgreen","lightgreen"],
                                        ["darkblue","blue"],
                                        ["grey","black"],
                                        ["darkgreen","lightgreen"],
                                        ["darkred","lightred"],
                                        ["darkred","red"],
                                        ["darkred","lightred"],
                                        ["darkgreen","lightgreen"], ["darkred","red"],
                                        ["darkred","lightred"],
                                        ["darkgreen","lightgreen"], ["darkred","red"],
                                        ["darkred","lightred"],
                                        ["darkgreen","lightgreen"]
                                ];
                                let weight_range = [];
                        
                        for (let joz = 0; joz < files.length; joz++) {

                                let color = d3.scaleLinear()
                                        .domain([0, files.length])
                                        .range(colors[joz])
                                        .interpolate(d3.interpolateHcl);
                                for (let i = 0; i < d[joz]["paths"].length; i++) {
                                        let temp_inde = 0
                                        
                                        d[joz]["paths"][i]["details"]["weight"].forEach(function(event){
                                                let dist_seg = d[joz]["paths"][i]["details"]["distance"][temp_inde]
                                                console.log("sdiojfsdoifjs",dist_seg, event)
                                                weight_range.push(Math.round(event[2]) / Math.round(dist_seg[2]))
                                                
                                                temp_inde++
                                        }) 
                                        let dataDomain = d3.extent(weight_range);
                                        lineScale.domain(dataDomain);
                                        console.log("extent",dataDomain);
                                        d[joz]["paths"][i]["details"]["weight"].forEach(function(event){
                                                let event_from_id = event[0];
                                                let event_to_id = event[1];
                                                let aver_spd = ""
                                                let distance = ""
                                                let segtime = ""
                                                let stname = ""
                                                let str_surface = ""
                                                let str_road_class = ""
                                                let str_road_environment = ""

                                                // find the average_speed interval and get the value of that
                                                // for each interval pair from the average_speeds details check the events from and to id
                                                d[joz]["paths"][i]["details"]["average_speed"].forEach(function (a_s_event) {
                                                        let from_id = a_s_event[0]
                                                        let to_id = a_s_event[1]
                                                        if (event_from_id >= from_id && event_from_id <= to_id){
                                                                if (event_to_id >=from_id && event_to_id <= to_id){
                                                                        aver_spd = aver_spd + a_s_event[2]
                                                                        // console.log("event_from_id ", event_from_id,"event_to_id", event_to_id,"from_id",from_id,"to_id",to_id)

                                                                }
                                                        }
                                                })

                                                d[joz]["paths"][i]["details"]["time"].forEach(function (a_t_event) {
                                                        let from_id = a_t_event[0]
                                                        let to_id = a_t_event[1]
                                                        if (event_from_id >= from_id && event_from_id <= to_id){
                                                                if (event_to_id >=from_id && event_to_id <= to_id){
                                                                        segtime = segtime + a_t_event[2]
                                                                        // console.log("event_from_id ", event_from_id,"event_to_id", event_to_id,"from_id",from_id,"to_id",to_id)

                                                                }
                                                        }
                                                })

                                                d[joz]["paths"][i]["details"]["street_name"].forEach(function (s_n_event) {
                                                        let from_id = s_n_event[0]
                                                        let to_id = s_n_event[1]
                                                        if (event_from_id >= from_id && event_from_id <= to_id){
                                                                if (event_to_id >=from_id && event_to_id <= to_id){
                                                                        stname = stname + s_n_event[2]
                                                                        // console.log("event_from_id ", event_from_id,"event_to_id", event_to_id,"from_id",from_id,"to_id",to_id)

                                                                }
                                                        }
                                                })


                                                d[joz]["paths"][i]["details"]["distance"].forEach(function (f_s_event) {
                                                        let from_id = f_s_event[0]
                                                        let to_id = f_s_event[1]

                                                        if (event_from_id >= from_id && event_from_id <= to_id){
                                                                if (event_to_id >=from_id && event_to_id <= to_id){
                                                                        distance = distance + f_s_event[2]
                                                                        // console.log("event_from_id ", event_from_id,"event_to_id", event_to_id,"from_id",from_id,"to_id",to_id)

                                                                }
                                                        }
                                                })


                                                d[joz]["paths"][i]["details"]["surface"].forEach(function (s_s_event) {
                                                        let from_id = s_s_event[0]
                                                        let to_id = s_s_event[1]

                                                        if (event_from_id >= from_id && event_from_id <= to_id){
                                                                if (event_to_id >=from_id && event_to_id <= to_id){
                                                                        str_surface = str_surface + s_s_event[2]
                                                                        // console.log("event_from_id ", event_from_id,"event_to_id", event_to_id,"from_id",from_id,"to_id",to_id)

                                                                }
                                                        }
                                                })
                                                

                                                d[joz]["paths"][i]["details"]["road_class"].forEach(function (s_rc_event) {
                                                        let from_id = s_rc_event[0]
                                                        let to_id = s_rc_event[1]

                                                        if (event_from_id >= from_id && event_from_id <= to_id){
                                                                if (event_to_id >=from_id && event_to_id <= to_id){
                                                                        str_road_class = str_road_class + s_rc_event[2]
                                                                        // console.log("event_from_id ", event_from_id,"event_to_id", event_to_id,"from_id",from_id,"to_id",to_id)

                                                                }
                                                        }
                                                })

                                                 d[joz]["paths"][i]["details"]["road_environment"].forEach(function (s_rc_event) {
                                                        let from_id = s_rc_event[0]
                                                        let to_id = s_rc_event[1]

                                                        if (event_from_id >= from_id && event_from_id <= to_id){
                                                                if (event_to_id >=from_id && event_to_id <= to_id){
                                                                        str_road_environment = str_road_environment + s_rc_event[2]
                                                                        // console.log("event_from_id ", event_from_id,"event_to_id", event_to_id,"from_id",from_id,"to_id",to_id)

                                                                }
                                                        }
                                                })


                                                let fromlon = d[joz]["paths"][i]["points"]["coordinates"][event[0]][0]
                                                let fromlat = d[joz]["paths"][i]["points"]["coordinates"][event[0]][1]
                                                let tolon = d[joz]["paths"][i]["points"]["coordinates"][event[1]][0]
                                                let tolat = d[joz]["paths"][i]["points"]["coordinates"][event[1]][1]
                                                let weight_val = event[2]
                                                // if (foevent.split(" | ")[4] == "low") {
                                                //         var c = "green"//"green"
                                                // } else if (foevent.split(" | ")[4] == "high") {
                                                //         var c = "red"//"red"
                                                // } else {
                                                //         var c = "green"
                                                // }
                                                let c = "green"
                                                dateArr.push(
                                                        {
                                                                'type': 'Feature',
                                                                'properties': {
                                                                        'color': c,
                                                                        'width': lineScale(Math.round((weight_val) / Math.round(distance))),
                                                                        'opacity': 0.8- (i * .3),
                                                                        'title': stname+" | weight=" + Math.round(weight_val) + " | average speed="+aver_spd+" | distance="+distance+" | time="+segtime+" | surface="+str_surface+" | road_class="+str_road_class+" | road_environment="+str_road_environment

                                                                },
                                                                'geometry':{
                                                                        'type': 'LineString',
                                                                        'coordinates': [[fromlon,fromlat],[tolon,tolat]]
                                                                }}
                                                                )
                                        })
                                }
                        }

                        let mapLayer1 = self.map.getLayer('lines');
                        let mapLayer2 = self.map.getLayer('symbols');
                          if(typeof mapLayer1 !== 'undefined') {
                          // Remove map layer & source.
                          self.map.removeLayer('lines')
                          self.map.removeSource('lines')
                          }

                         if(typeof mapLayer2 !== 'undefined') {
                          // Remove map layer & source.
                          self.map.removeLayer('symbols')
                          self.map.removeSource('symbols')
                          }


                                let maplayer = {
                                            'id': 'lines',
                                            'type': 'line',
                                            'source': {
                                                'type': 'geojson',
                                                'data': {
                                                    'type': 'FeatureCollection',
                                                    'features': dateArr
                                                }
                                            },
                                            'paint': {
                                                'line-width': ['get', 'width'],

                                                // Use a get expression (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
                                                // to set the line-color to a feature property value.
                                                'line-color': ['get', 'color'],
                                                'line-opacity':['get','opacity'],
                                                // 'line-extrusion-height': ['get', 'height'],
                                                // 'line-extrusion-base': ['get', 'base_height'],

                                            }
                                        }
                        let titlesLayer = {
                        'id': 'symbols',
                        'type': 'symbol',
                        'source': {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                'features': dateArr
                            }
                        },
                        "layout": {
                            "symbol-placement": "line",
                            "text-font": ["Open Sans Regular"],
                            "icon-allow-overlap":true,
                            "text-field": '{title}', // part 2 of this is how to do it
                            "text-size": 12,
                            "text-anchor":  "top",
                        },
                        "paint": {
                "text-color": "#202",
                "text-halo-color": "#fff",
                "text-halo-width": 1
            },
                    }   
                    self.map.addLayer(maplayer);
                    self.map.addLayer(titlesLayer);

                    self.map.on('click', 'lines', function(e) {
                        new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(e.features[0].properties.title)
                        .addTo(self.map);
                        });
                        self.map.on('mouseenter', 'lines', function() {
                        self.map.getCanvas().style.cursor = 'pointer';
                        });
                        
                        // Change it back to a pointer when it leaves.
                        self.map.on('mouseleave', 'lines', function() {
                        self.map.getCanvas().style.cursor = '';
                        });

                        });
            }
},
mounted(){
            let self = this;
           
                self.map.on('style.load', function() {
                  self.markers = []
                  self.marker1 = new mapboxgl.Marker({
                        draggable: true
                    })
                        .setLngLat([self.fromPoint[1],self.fromPoint[0]])
                        .addTo(self.map);
                    self.marker1.on('dragend', self.onDragEnd);


                    self.marker2 = new mapboxgl.Marker({
                        draggable: true,
                        color: "red"
                    })
                        .setLngLat([self.toPont[1],self.toPont[0]])
                        .addTo(self.map);
                    self.marker2.on('dragend', self.onDragEnd);
                  self.markers.push(self.marker2)
                  

                })
                
  }   
  }
</script>
<style scoped>


body {
overflow: hidden;
}
 
body * {
-webkit-touch-callout: none;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
}
 
.map {
position: absolute;
top: 0;
bottom: 0;
width: 100%;
}
.marker {
  transform: translate(-50%, -50%) ;
}
</style>