<template>
  <div>
        <button type="button" class="btn btn-success btn-circle">
			<i class="fa fa-link">+</i>
        </button>
        <button type="button" class="btn btn-warning btn-circle">
			<i class="fa fa-times">–</i>
        </button>
        <button type="button" class="btn btn-danger btn-circle">
			<i class="fa fa-heart">X</i>
        </button>
  </div>
</template>

<script>

export default {

};
	
</script>

<style scoped>

.btn-circle {
    width: 30px;
    height: 30px;
    padding: 6px 0px;
    border-radius: 50%; /*15px*/
    text-align: center;
    font-size: 12px;
    line-height: 1.42857;
}

	
</style>