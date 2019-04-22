<template>
  <div>
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <AppMain></AppMain>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar/index'
import AppMain from './components/AppMain'
export default {
  name: 'layout',
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
