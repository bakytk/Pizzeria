
<template>
  <div id="app">
  	<navig></navig>
  	<router-view></router-view>
	<futer></futer> 
  </div>
</template>

<script>
	
import navig from './components/Navig.vue';
import futer from './components/Futer.vue';
	
export default {
	name: 'App',
    components: {
        navig,
		futer
    }
}
</script>
	
<style>
</style>

