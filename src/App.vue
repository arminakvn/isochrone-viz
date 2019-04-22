
<template>
    <div id="app">
        <!-- <div class="background-image">
          </div> -->
        <div class="app-content">
          <map-view v-bind:apoint="pointCoord" v-on:updatePoint="updatePontCoord"></map-view>

        </div>
    </div>

</template>
<script>
    import MapView from './components/MapView.vue'
    // import mapboxgl from 'mapbox-gl/dist/mapbox-gl.css'
// import 'mapbox-gl/dist/mapbox-gl.css'
// require('mapbox-gl/dist/mapbox-gl.css')


    export default {
        name: 'app',
        components:{
            MapView
        },
        // model: {
        //   prop: 'pointCoord',
        //   event: 'updatePoint'
        // },
         data: function(){
            return {pointCoord:[]}
            },
        computed:{
          pointCoorded: function(){
            return this.pointCoord
          }
        },
        // props: ["pointCoord"],
        methods: {

        updatePontCoord: function(pccord){
          const self = this;
          console.log("update my coord",self)
          self.pointCoord = pccord

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

