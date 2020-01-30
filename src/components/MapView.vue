 <template>

  <div id="map">
  <!-- <div id="mapholder"></div> -->
<!-- <nav>
  <input type='checkbox' id='scrollZoom' checked='checked'>
<label for='scrollZoom'>Scroll zoom</label>
</nav> -->
    
  </div>

</template>

<script>
  import * as mapboxgl from 'mapbox-gl'
  // import MapController from './MapController.vue'
  // require('mapbox-gl/dist/mapbox-gl.css')
  import * as d3 from 'd3'

export default {
  name: 'MapView',
  
  data: function(){
    return {
      // markers: [],
      mode:"isochrone",
      baseurl:"http://localhost:8989/isochrone?point=",
      apoint:[42.355278,-71.0616],
      secpoint:[42.355978,-71.0816],
      urlopts:"&vehicle=oppositebike2&buckets=4&time_limit=600" //  distance_limit=4000
    }
  },
  computed: {
    map: function(){
      let self = this;
      mapboxgl.accessToken = 'pk.eyJ1IjoiYXJtaW5hdm4iLCJhIjoiSTFteE9EOCJ9.iDzgmNaITa0-q-H_jw1lJw';
      let map = new mapboxgl.Map({
                    container: self.$el,
                    style: 'mapbox://styles/arminavn/cjg2o1xyt08gn2rqocqpyq4k6', //// 'mapbox://styles/arminavn/cjolq7bui0wjm2spp1bfrozbi', //'mapbox://styles/arminavn/cj8xnnjkycd4o2ss9c2rofh9p',
                    center: [-71.068964, 42.347643],
                    zoom: 14
                });
                return map
    },
    mapMarker: function(){
      
    }
  },

  methods: {
    onModeChange: function(){
      
      
      let self = this;
       if (self.$attrs.mode == "isochrone"){{
         
         
        //  self.markers.forEach(mrkr => {
        //   //  self.map.removeLayer(mrkr)
        //  });
       }
       self.markers = self.mapMarker
}
    },
    onDragEnd: function() {
                let self = this;
                
                let lngLat = self.marker.getLngLat();
                // coordinates.style.display = 'block';
                // coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
                
                
                // self.$parent.props.apoint = lngLat
                // this.currentRoute = this.$route.params.route;
                self.$emit('updatePoint',lngLat)
                self.getGeoJson()
            },
    getGeoJson: function(){
      const self = this;
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
      

      // console.log(features)
      let urls = []
      
      urls.push(self.baseurl + this.$parent.pointCoord.lat + "," +  this.$parent.pointCoord.lng + self.urlopts)
      Promise.all(
                        urls.map(
                                url => d3.json(url)
                        )
                ).then(function(d) {
                  
                  
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
                })


      

    }
  },
  mounted(){
            let self = this;
            
            

                self.map.on('style.load', function() {
                  
                  self.markers = []
                  if (self.$attrs.mode == "isochrone"){
                        self.marker = new mapboxgl.Marker({
                        draggable: true
                    })
                        .setLngLat([self.apoint[1],self.apoint[0]])
                        .addTo(self.map);
                    self.marker.on('dragend', self.onDragEnd);
                    
                  }
                  self.markers.push(self.marker)
                  

                })
                self.$emit('updateMap',self.map)
                
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
