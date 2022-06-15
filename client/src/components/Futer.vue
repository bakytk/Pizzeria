<template>
  <b-navbar type="light" variant="light" tabs justified>

	  <div class="futer">

		<b-nav-text class="justify2"> <b>Address</b>: Str. Trafalgar, 1, UK, London </b-nav-text>
		<b-nav-text class="justify2"> <b>Phone</b>: 8-800-2003000 </b-nav-text>
		<b-nav-text class="justify2"> <b>E-mail</b>: info@example.com</b-nav-text>
	  </div>

  </b-navbar>
</template>

<script>
export default {
    name: 'Futer'
};
</script>

<style scoped>

.futer {
	/*background-color: #107EAE;padding-bottom: 2%;*/

    background-size: cover;
	text-align: center;
    width: 100%;
    height: auto;
	color: brown;
	bottom: 0;
}

.justify2 {
  margin-left: 40px;
}


</style>
