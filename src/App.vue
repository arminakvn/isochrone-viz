
<template>
    <div id="app">
        <!-- <div class="background-image">
          </div> -->
        <div class="app-content">
          <div v-if="modeClik=='isochrone'">
          <map-view v-bind:markers="markers" v-bind:map="map" v-bind:mode="modeClik" v-bind:apoint="pointCoord" v-bind:secpoint="destCoord" v-on:updateMarkers="markersUpdated" v-on:updateMap="mapUpdated" v-on:updatePoint="updatePontCoord" v-on:updateDest="updateDestCoord"></map-view>
        </div>
        <div v-else>
            <routing-view v-bind:fromToPoints="fromTo" v-on:updateFromTo="fromToUpdated"></routing-view>
        </div>
        <map-controller v-bind:mode="modeClik" v-on:updateMode="updateModeCliked" v-on:updateMarkers="markersUpdated"></map-controller>


        </div>
    </div>

</template>
<script>
    import MapView from './components/MapView.vue'
    import RoutingView from './components/RoutingView.vue'
    import MapController from './components/MapController.vue'
    // import mapboxgl from 'mapbox-gl/dist/mapbox-gl.css'
// import 'mapbox-gl/dist/mapbox-gl.css'
// require('mapbox-gl/dist/mapbox-gl.css')


    export default {
        name: 'app',
        components:{
            MapView,
            RoutingView,
            MapController
        },
        // model: {
        //   prop: 'pointCoord',
        //   event: 'updatePoint'
        // },
         data: function(){
            return {pointCoord:[],modeClik:"isochrone",destCoord:[],map:null,markers:[], fromTo:[]}
            },
        computed:{
          pointCoorded: function(){
            return this.pointCoord
          },
           modeCliked: function(){
            return this.modeClik
          },
          destCoorded: function(){
            return this.destCoord
          },
          updateMap: function(){
            return this.map
          },
          markersComputed: function(){
            return this.markers
          },
          fromToComputed: function(){
            return this.fromTo
          }

        },
        // props: ["pointCoord"],
        methods: {

        updatePontCoord: function(pccord){
          const self = this;
          console.log("update my coord",self)
          self.pointCoord = pccord

        },
        updateModeCliked: function(mdclik){
            console.log("dadad",this)

            
        //      self.markers.forEach(mrkr => {
        //    self.map.removeLayer(mrkr)
        //  });
            const self = this;
            self.modeClik = mdclik
            
            // console.log(this.$children[0].onModeChange())
          },
          updateDestCoord: function(destrd){
            const self = this;
            self.destCoord = destrd
          },
          mapUpdated: function(mp){
            const self = this;
            self.map = mp
          },
          markersUpdated: function(mrks){
            console.log("mrksrs", mrks)
            const self = this;
            self.markers = mrks
          },

          fromToUpdated: function(frmT){
            const self = this;
            self.fromTo = frmT
          }
        


            },



    }

</script>

<style scoped>
    /* @import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.css'); */
    @import url('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.1.0/mapbox-gl-compare.css'); 
    body{
        height: 100%;
    }
    #map { position:absolute; top:0; bottom:0; width:100%; }

   
</style>

