<template>
  <h2>{{ name }}</h2>
</template>

<style lang="sass" scoped>

</style>

<script>
export default {
  name: 'SheepPlayer',
  data () {
    return {
      //
    }
  },
  props: {
    name: {
      type: String,
      required: true,
      validator: function (value) {
        return typeof value === 'string'
      }
    },
    id: {
      type: Number,
      required: true,
      validator: function (value) {
        return typeof value === 'number'
      }
    }
  }
}
</script>
