<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import axios from '@/api/index'

export default {
  data () {
    return {
      url: ''
    }
  },
  methods: {
    getImg () {
      axios.request({
        url: 'http://192.168.2.53:8080/api/v1/get_img?ImgId=7131b3c1-e2ff-4ccd-a36e-500636fa1ce8',
        method: 'get',
        responseType: 'blob'
      }).then(res => {
        const type = res.headers['content-type']
        const bb = new Blob([res.data], { type })
        this.url = URL.createObjectURL(bb)
      })
    }
  }
}
</script>
