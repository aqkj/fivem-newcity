<template>
  <div class="server-title" :style="{
      opacity
  }">
      欢迎来到模拟都市，按home键查看个人信息/帮助
  </div>
</template>

<script>
export default {
    name: 'ServerTitle',
    data() {
        return {
            opacity: 1
        }
    },
    created() {
        this.$root.$on('message', (event) => {
            if (event.data.type === 'mnds:event' && event.data.action === 'display') {
                const data = event.data.data
                this.opacity = data ? 1 : 0
            }
        })
    }
}
</script>

<style lang="less">
.server-title{
    position: fixed;
    color: rgb(255, 0, 76);
    font-size: 12px * 2.0;
    top: 6px;
    left: 0;
    right: 0;
    text-align: center;
    font-weight: bold;
    transition: all .5s ease;
}
</style>