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
      console.log(" self.$el",  self.$el)
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
                console.log(lngLat1.lng.toString(),lngLat1.lat.toString())
                console.log(lngLat2.lng.toString(),lngLat2.lat.toString())
                // self.$parent.props.apoint = lngLat
                // this.currentRoute = this.$route.params.route;
                self.$emit('updateFromTo',[lngLat1, lngLat2])
                self.getGeoJson([lngLat1, lngLat2])
            },
            getGeoJson: function(latlng){
                const self = this;
                console.log(self.$attrs["fromToPoints"])
                let files=[]
                let encoderFlg = "mapcrider2";
                let num_of_alterntves = 3;
                let lineScale = d3.scalePow()
                                .range([2,15]);
                // let encoderFlg = "racingbike";
                files.push("http://10.10.10.249:8000/route?point="+latlng[0]["lat"]+"%2C"+latlng[0]["lng"]+"&point="+latlng[1]["lat"]+"%2C"+latlng[1]["lng"]+"&locale=en-US&ch.disable=true&vehicle=mapcrider2&weighting=fastest&points_encoded=false&elevation=true&algorithm=alternative_route&alternative_route.max_paths=" + num_of_alterntves +"&use_miles=true$details=distance&details=edge_id&details=average_speed&details=facilities_overal&details=weight_value&details=time&details=street_name")
                console.log("files: ", files)
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
                        //         for (let jo = 0; jo < files.length; jo++) {
                        //         for (let j = 0; j < num_of_alterntves; j++) {
                        //             console.log(d[jo]["paths"][j]) 
                        //                 dataitems.push(d[jo]["paths"][j]) 

                        //                 let total_weight =d[jo]["paths"][j]["weight"];
                        //                 let total_distance =d[jo]["paths"][j]["distance"];
                        //                 let starts_from_lon = d[jo]["paths"][j]["points"]["coordinates"][0][0]
                        //                 let starts_from_lat = d[jo]["paths"][j]["points"]["coordinates"][0][1]
                        //                 //anchorArr[joz]
                        //                 waypointArr.push(

                        //                         {
                        //                                 'type': 'Feature',
                        //                                 'properties': {
                        //                                         // 'total_weight': "total weight: " + Math.round(total_weight),
                        //                                         // 'total_distance':total_distance,
                        //                                         // // 'color': color(i),
                        //                                         // // 'width': lineScale(weight_val),
                        //                                         'opacity': 0.7 - (j * .2),
                        //                                         // 'title': aver_spd

                        //                                 },
                        //                                 'geometry': d[jo]["paths"][j]["snapped_waypoints"]
                        //                         }
                        //                 )
                        //                 anchorArr.push(
                        //                         {
                        //                                 'type': 'Feature',
                        //                                 'properties': {
                        //                                         'total_weight': "" + Math.round(total_weight),
                        //                                         'total_distance':total_distance,
                        //                                         // 'color': color(i),
                        //                                         // 'width': lineScale(weight_val),
                        //                                         'opacity': 0.7 - (j * .2),
                        //                                         // 'title': aver_spd

                        //                                 },
                        //                                 'geometry': d[jo]["paths"][j]["points"]
                        //                         }



                        //                 )
                        //                 let temp_inde = 0
                        //                 d[jo]["paths"][j]["details"]["weight_value"].forEach(function (event) {
                        //                          let dist_seg = d[jo]["paths"][j]["details"]["facilities_overal"][temp_inde]
                        //                         weight_range.push(event[2] / Math.round(dist_seg[2].split(" | ")[3]))
                        //                         console.log(event[2] / Math.round(dist_seg[2].split(" | ")[3]))
                        //                         temp_inde++
                        //                 })
                        //         }
                        // }
                        // self.items = dataitems;
                        // let dataDomain = d3.extent(weight_range);
                        // lineScale.domain(dataDomain);
                        // console.log("extent",dataDomain);
                        // for (let joz = 0; joz < files.length; joz++) {

                        //         let color = d3.scaleLinear()
                        //                 .domain([0, files.length])
                        //                 .range(colors[joz])
                        //                 .interpolate(d3.interpolateHcl);
                        //         for (let i = 0; i < num_of_alterntves; i++) {
                        //                 let temp_inde = 0
                        //                 d[joz]["paths"][i]["details"]["weight_value"].forEach(function(event){
                        //                         let dist_seg = d[joz]["paths"][i]["details"]["facilities_overal"][temp_inde]
                        //                         weight_range.push(event[2] / Math.round(dist_seg[2].split(" | ")[3]))
                        //                         console.log(event[2] / Math.round(dist_seg[2].split(" | ")[3]))
                        //                         temp_inde++
                        //                 })
                        //                 console.log(d[joz]["paths"][i]["details"]["average_speed"]);
                        //                 console.log(d[joz]["paths"][i]["details"]["weight_value"]);
                        //                 d[joz]["paths"][i]["details"]["weight_value"].forEach(function(event){
                        //                         let event_from_id = event[0];
                        //                         let event_to_id = event[1];
                        //                         let aver_spd = "sp="
                        //                         let foevent = "f="
                                                

                        //                         // find the average_speed interval and get the value of that
                        //                         // for each interval pair from the average_speeds details check the events from and to id
                        //                         d[joz]["paths"][i]["details"]["average_speed"].forEach(function (a_s_event) {
                        //                                 let from_id = a_s_event[0]
                        //                                 let to_id = a_s_event[1]
                        //                                 if (event_from_id >= from_id && event_from_id <= to_id){
                        //                                         if (event_to_id >=from_id && event_to_id <= to_id){
                        //                                                 aver_spd = aver_spd + a_s_event[2]
                        //                                                 // console.log("event_from_id ", event_from_id,"event_to_id", event_to_id,"from_id",from_id,"to_id",to_id)

                        //                                         }
                        //                                 }
                        //                         })


                        //                         d[joz]["paths"][i]["details"]["facilities_overal"].forEach(function (f_s_event) {
                        //                                 let from_id = f_s_event[0]
                        //                                 let to_id = f_s_event[1]

                        //                                 if (event_from_id >= from_id && event_from_id <= to_id){
                        //                                         if (event_to_id >=from_id && event_to_id <= to_id){
                        //                                                 foevent = foevent + f_s_event[2]
                        //                                                 // console.log("event_from_id ", event_from_id,"event_to_id", event_to_id,"from_id",from_id,"to_id",to_id)

                        //                                         }
                        //                                 }
                        //                         })

                        //                         let fromlon = d[joz]["paths"][i]["points"]["coordinates"][event[0]][0]
                        //                         let fromlat = d[joz]["paths"][i]["points"]["coordinates"][event[0]][1]
                        //                         let tolon = d[joz]["paths"][i]["points"]["coordinates"][event[1]][0]
                        //                         let tolat = d[joz]["paths"][i]["points"]["coordinates"][event[1]][1]
                        //                         let weight_val = event[2]
                        //                         // ancG["geometry"]["coordinates"].push([[fromlon,fromlat],[tolon,tolat]])
                        //                         console.log(Math.round(foevent.split(" | ")[3]))
                        //                         console.log((weight_val / Math.round(foevent.split(" | ")[3])))
                        //                         if (foevent.split(" | ")[4] == "low") {
                        //                                 var c = "green"//"green"
                        //                         } else if (foevent.split(" | ")[4] == "high") {
                        //                                 var c = "red"//"red"
                        //                         } else {
                        //                                 var c = "green"
                        //                         }
                        //                         dateArr.push(
                        //                                 {
                        //                                         'type': 'Feature',
                        //                                         'properties': {
                        //                                                 'color': c,
                        //                                                 'width': lineScale(weight_val / Math.round(foevent.split(" | ")[3])),
                        //                                                 'opacity': 0.8- (i * .8),
                        //                                                 'title': "w=" + Math.round(weight_val)+aver_spd+foevent

                        //                                         },
                        //                                         'geometry':{
                        //                                                 'type': 'LineString',
                        //                                                 'coordinates': [[fromlon,fromlat],[tolon,tolat]]
                        //                                         }}
                        //                                         )
                        //                 })
                        //         }
                        // }
                        for (let joz = 0; joz < files.length; joz++) {

                                let color = d3.scaleLinear()
                                        .domain([0, files.length])
                                        .range(colors[joz])
                                        .interpolate(d3.interpolateHcl);
                                for (let i = 0; i < d[joz]["paths"].length; i++) {
                                        let temp_inde = 0
                                        console.log(d)
                                        d[joz]["paths"][i]["details"]["weight_value"].forEach(function(event){
                                                let dist_seg = d[joz]["paths"][i]["details"]["facilities_overal"][temp_inde]
                                                weight_range.push(event[2] / Math.round(dist_seg[2].split(" | ")[3]))
                                                console.log(event[2] / Math.round(dist_seg[2].split(" | ")[3]))
                                                temp_inde++
                                        })
                                        console.log(d[joz]["paths"][i]["details"]["average_speed"]);
                                        console.log(d[joz]["paths"][i]["details"]["weight_value"]);
                                        d[joz]["paths"][i]["details"]["weight_value"].forEach(function(event){
                                                let event_from_id = event[0];
                                                let event_to_id = event[1];
                                                let aver_spd = ""
                                                let foevent = ""
                                                let segtime = ""
                                                let stname = ""
                                                

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


                                                d[joz]["paths"][i]["details"]["facilities_overal"].forEach(function (f_s_event) {
                                                        let from_id = f_s_event[0]
                                                        let to_id = f_s_event[1]

                                                        if (event_from_id >= from_id && event_from_id <= to_id){
                                                                if (event_to_id >=from_id && event_to_id <= to_id){
                                                                        foevent = foevent + f_s_event[2]
                                                                        // console.log("event_from_id ", event_from_id,"event_to_id", event_to_id,"from_id",from_id,"to_id",to_id)

                                                                }
                                                        }
                                                })

                                                let fromlon = d[joz]["paths"][i]["points"]["coordinates"][event[0]][0]
                                                let fromlat = d[joz]["paths"][i]["points"]["coordinates"][event[0]][1]
                                                let tolon = d[joz]["paths"][i]["points"]["coordinates"][event[1]][0]
                                                let tolat = d[joz]["paths"][i]["points"]["coordinates"][event[1]][1]
                                                let weight_val = event[2]
                                                // ancG["geometry"]["coordinates"].push([[fromlon,fromlat],[tolon,tolat]])
                                                // console.log(Math.round(foevent.split(" | ")[3]))
                                                // console.log((weight_val / Math.round(foevent.split(" | ")[3])))
                                                if (foevent.split(" | ")[4] == "low") {
                                                        var c = "green"//"green"
                                                } else if (foevent.split(" | ")[4] == "high") {
                                                        var c = "red"//"red"
                                                } else {
                                                        var c = "green"
                                                }
                                                dateArr.push(
                                                        {
                                                                'type': 'Feature',
                                                                'properties': {
                                                                        'color': c,
                                                                        'width': lineScale(weight_val / Math.round(foevent.split(" | ")[3])),
                                                                        'opacity': 0.8- (i * .3),
                                                                        'title': stname+"|weight=" + Math.round(weight_val)+"|time="+Math.round(segtime/1000)+"s"+"|average_speed="+aver_spd+"km/hr|surface="+foevent.split(" | ")[0]+"|class="+foevent.split(" | ")[1]+"|reverse_speed="+foevent.split(" | ")[2]+"|distance="+foevent.split(" | ")[3]+"m|"+foevent.split(" | ")[4]+" stress"

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


                     
                                // self.items = dateArr;
                                // self.dataitems = dataitems;
                                // self.anchors = anchorArr;
                                // self.waypoints = waypointArr
                                let maplayer = {
                                            'id': 'lines',
                                            'type': 'line',
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
                        });
            }
},
mounted(){
            let self = this;
            let files = [];
            console.log("self.$el", self.$el)
            console.log(self)
            // files.push("")
            // this.$nextTick(() => {
                
                // self.map = new mapboxgl.Map({
                //     container: self.$el,
                //     style: 'mapbox://styles/arminavn/cjg2o1xyt08gn2rqocqpyq4k6', //// 'mapbox://styles/arminavn/cjolq7bui0wjm2spp1bfrozbi', //'mapbox://styles/arminavn/cj8xnnjkycd4o2ss9c2rofh9p',
                //     center: [-71.068964, 42.347643],
                //     zoom: 14
                // });
                // self.getGeoJson()

                self.map.on('style.load', function() {
                  console.log("sefl",self)
                  self.markers = []
                  self.marker1 = new mapboxgl.Marker({
                        draggable: true
                    })
                        .setLngLat([self.fromPoint[1],self.fromPoint[0]])
                        .addTo(self.map);
                    self.marker1.on('dragend', self.onDragEnd);


                    self.marker2 = new mapboxgl.Marker({
                        draggable: true
                    })
                        .setLngLat([self.toPont[1],self.toPont[0]])
                        .addTo(self.map);
                    self.marker2.on('dragend', self.onDragEnd);
                  self.markers.push(self.marker2)
                  

                })
                // self.$emit('updateRouting',self.map)
                
  }   
  }
</script>
<style scoped>
/* body { margin:0; padding:0; }
#map { position:absolute; top:0; bottom:0; width:100%; } */

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