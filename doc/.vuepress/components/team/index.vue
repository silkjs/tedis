<template>
<div class="team">
  <div class="avator">{{msg}}</div>
</div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "team-index",
  data() {
    return {
      msg: "hello team"
    };
  }
});
</script>
<style lang="stylus" scoped>
</style>
