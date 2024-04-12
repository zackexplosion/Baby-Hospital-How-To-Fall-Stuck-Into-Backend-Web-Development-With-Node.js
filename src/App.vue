<template>
  <h1>Baby Hospital Management System</h1>
  <BabyList />
</template>

<script>
import BabyList from '@/components/BabyList'

export default {
  name: 'App',
  components: {
    BabyList
  }
}
</script>

<style>
body, html {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  margin-top: 60px;
  max-width: 600px;
  padding:0 1em;
}
</style>
