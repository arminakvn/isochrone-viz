 <template>
<div id="map"></div>
<nav>
  <input type='checkbox' id='scrollZoom' checked='checked'>
<label for='scrollZoom'>Scroll zoom</label>
</nav>

</template>

<script>
  import * as mapboxgl from 'mapbox-gl'
  // require('mapbox-gl/dist/mapbox-gl.css')
  import * as d3 from 'd3'

export default {
  name: 'MapView',
  
  data: function(){
    return {
      baseurl:"http://10.10.10.249:8000/isochrone?point=",
      apoint:[42.355278,-71.0616],
      urlopts:"&vehicle=mapcrider2&buckets=4&distance_limit=4000" //  
    }
  },
  methods: {
    onDragEnd: function() {
                let self = this;
                let lngLat = self.marker.getLngLat();
                // coordinates.style.display = 'block';
                // coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
                console.log(lngLat.lng.toString(),lngLat.lat.toString())
                
                // self.$parent.props.apoint = lngLat
                // this.currentRoute = this.$route.params.route;
                self.$emit('updatePoint',lngLat)
                self.getGeoJson()
            },
    getGeoJson: function(){
      const self = this;
      // let features = self.map.queryRenderedFeatures({layers:['bucket1']});
      // this.map.eachLayer(function (layer) {
      //     this.map.removeLayer(layer);
      // });
      let mapLayer1 = self.map.getLayer('bucket1');
      if(typeof mapLayer1 !== 'undefined') {
      // Remove map layer & source.
      self.map.removeLayer('bucket1')
      self.map.removeSource('bucket1')
      }

      let mapLayer2 = self.map.getLayer('bucket2');
      if(typeof mapLayer2 !== 'undefined') {
      // Remove map layer & source.
      self.map.removeLayer('bucket2')
      self.map.removeSource('bucket2')
      }

      let mapLayer3 = self.map.getLayer('bucket3');
      if(typeof mapLayer3 !== 'undefined') {
      // Remove map layer & source.
      self.map.removeLayer('bucket3')
      self.map.removeSource('bucket3')
      }

      let mapLayer4 = self.map.getLayer('bucket4');
      if(typeof mapLayer4 !== 'undefined') {
      // Remove map layer & source.
      self.map.removeLayer('bucket4')
      self.map.removeSource('bucket4')
      }
      // let mapLayer5 = self.map.getLayer('bucket5');
      // if(typeof mapLayer5 !== 'undefined') {
      // // Remove map layer & source.
      // self.map.removeLayer('bucket5')
      // self.map.removeSource('bucket5')
      // }
      

      // console.log(features)
      let urls = []
      console.log(self)
      urls.push(self.baseurl + this.$parent.pointCoord.lat + "," +  this.$parent.pointCoord.lng + self.urlopts)
      Promise.all(
                        urls.map(
                                url => d3.json(url)
                        )
                ).then(function(d) {
                  console.log(d)
                  
                  self.map.addLayer({
                    'id': 'bucket1',
                    'type': 'fill',
                    'source': {
                    'type': 'geojson',
                    'data': d[0].polygons[0]
                    },
                    'layout': {},
                    'paint': {
                    'fill-color': '#b5b5b5',
                    'fill-outline-color': '#fcd402',
                    'fill-opacity': 0.25
                    }
                    
                  })

                  self.map.addLayer({
                    'id': 'bucket2',
                    'type': 'fill',
                    'source': {
                    'type': 'geojson',
                    'data': d[0].polygons[1]
                    },
                    'layout': {},
                    'paint': {
                    'fill-color': '#919496',
                    'fill-outline-color': '#f9d931',
                    'fill-opacity': 0.25
                    }
                    
                  })


                  self.map.addLayer({
                    'id': 'bucket3',
                    'type': 'fill',
                    'source': {
                    'type': 'geojson',
                    'data': d[0].polygons[2]
                    },
                    'layout': {},
                    'paint': {
                      // 'fill-outline-color': 'black',
                    'fill-color': '#515151',
                    'fill-outline-color': '#ffe663',
                    'fill-opacity': 0.35
                    }
                    
                  })

                  self.map.addLayer({
                    'id': 'bucket4',
                    'type': 'fill',
                    'source': {
                    'type': 'geojson',
                    'data': d[0].polygons[3]
                    },
                    'layout': {},
                    'paint': {
                    'fill-color': '#424242',
                      'fill-outline-color': '#ddd4a6',
                    // 'fill-outline-opacity':  0.5,
                    'fill-opacity': 0.35
                    }
                    
                  })


                  // self.map.addLayer({
                  //   'id': 'bucket5',
                  //   'type': 'fill',
                  //   'source': {
                  //   'type': 'geojson',
                  //   'data': d[0].polygons[4]
                  //   },
                  //   'layout': {},
                  //   'paint': {
                  //   'fill-color': '#424242',
                  //     'fill-outline-color': '#515151',
                  //   // 'fill-outline-opacity':  0.5,
                  //   'fill-opacity': 0.3
                  //   }
                    
                  // })


                })


      console.log("this data", self)

    }
  },
  mounted(){
            let self = this;
            let files = [];
            files.push("")
            // this.$nextTick(() => {
                mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtaW5hdm4iLCJhIjoiSTFteE9EOCJ9.iDzgmNaITa0-q-H_jw1lJw';
                self.map = new mapboxgl.Map({
                    container: self.$el,
                    style: 'mapbox://styles/arminavn/cjg2o1xyt08gn2rqocqpyq4k6', //// 'mapbox://styles/arminavn/cjolq7bui0wjm2spp1bfrozbi', //'mapbox://styles/arminavn/cj8xnnjkycd4o2ss9c2rofh9p',
                    center: [-71.068964, 42.347643],
                    zoom: 14
                });
                // self.getGeoJson()

                self.map.on('load', function() {

                  self.marker = new mapboxgl.Marker({
                        draggable: true
                    })
                        .setLngLat([self.apoint[1],self.apoint[0]])
                        .addTo(self.map);
                    self.marker.on('dragend', self.onDragEnd);

                })
  }   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
