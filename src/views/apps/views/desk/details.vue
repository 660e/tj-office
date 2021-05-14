<template>
  <h1>details</h1>
</template>

<script>
import { getStationInfo } from '@/api/workstation.js';
export default {
  data() {
    return {
      did: this.$route.params.did
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getStationInfo(this.did).then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>
