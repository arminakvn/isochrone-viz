<template>
	<ul id="buttons">
<li v-on:click="buttonClicked" id='isochrone' class='button'>isochrone</li>
<li v-on:click="buttonClicked" id='routing' class='button'>routing</li>
<li v-on:click="buttonClicked" id='profile' class='button'></li>
<!-- <li v-on:click="buttonClicked" id='profile' class='button'>bike2</li> -->
</ul>

</template>

<script>
	
	export default {
  name: 'MapController',
  data: function(){return {
    mode:"isochrone",
    profile: "lowstressbike2"
  }},
  methods: {

        buttonClicked (cle){
          let parent_o = this.$parent;

          // console.log()
        	let self = this;
          let modeclick = cle.target.id
          let to_profile = ''
          if (self.$attrs.mode !=modeclick ){
              self.$emit('updateMode',modeclick)
          } else if (modeclick == 'profile'){


            let currentProfile = this.profile
            if (currentProfile == 'lowstressbike2'){
              to_profile = 'bike2'
              this.profile = to_profile
              self.$emit('updateProfile', to_profile) 
              this.$el.children[2].innerHTML = to_profile
            } else {
              to_profile = 'lowstressbike2'
              this.profile = to_profile
              self.$emit('updateProfile', to_profile) 
              this.$el.children[2].innerHTML = to_profile
            }
              // console.log(to_profile, this.$el.children[2].innerTEXT)
              
              // this.$el.innerHTML = current_cont.replace(currentProfile, to_profile)
              
              
              parent_o.$refs.routing.onDragEnd()
              // this.$el.children[2].innerHTML = to_profile
              // this.profile = to_profile
          
            
          }
          
        
        }},
        mounted(){

          if (this.profile == 'lowstressbike2'){
              this.$el.children[2].innerHTML = 'bike2'
          } else {
            this.$el.children[2].innerHTML = 'lowstressbike2'
          }

        }
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
background: black;
font-family: sans-serif;
font-weight: bold;
}

#profile {
  background: gray
}
</style>