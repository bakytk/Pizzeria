<template>
    <span>
        <hero></hero>
		    <offer></offer>
    </span>
</template>

<script>

import hero from '../components/Hero.vue';
import offer from '../components/Offer.vue';

export default {

    components: {
        hero,
		offer,
    },

	created () {

		this.$store.dispatch('loadData');
  	},

	mounted () {

		this.$store.dispatch('setDevice', this.$mq);
  	}
};

</script>
