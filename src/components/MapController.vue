<template>
	<ul id="buttons">
<li v-on:click="buttonClicked" id='isochrone' class='button'>isochrone</li>
<li v-on:click="buttonClicked" id='routing' class='button'>routing</li>
</ul>

</template>

<script>
	
	export default {
  name: 'MapController',
  data: function(){return {
  	mode:"isochrone"
  }},
  methods: {

        buttonClicked (cle){
        	let self = this;
        	let modeclick = cle.target.id
          
          if (self.$attrs.mode !=modeclick ){
              self.$emit('updateMode',modeclick)
              console.log("update mode to", modeclick)
              console.log("current mode is: ", self.$attrs.mode)
              console.log(self)

          
          }
        
        }}
  }


</script>

<style scoped>
 #buttons {
width: 90%;
}
.button {
display: inline-block;
position: relative;
cursor: pointer;
width: 10%;
padding: 8px;
border-radius: 3px;
margin-top: 10px;
font-size: 12px;
text-align: center;
color: #fff;
background: #ee8a65;
font-family: sans-serif;
font-weight: bold;
}

</style>