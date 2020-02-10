<template>
  <div class="status" :style="{
      opacity
  }">
      <div class="food" :class="'status__' + food">
          <i class="iconfont icon-daochat"></i>
      </div>
      <div class="drink" :class="'status__' + drink">
          <i class="iconfont icon-water"></i>
      </div>
  </div>
</template>

<script>
/**
 * 用户状态
 */
export default {
    name: 'Status',
    data() {
        return {
            food: 0,
            drink: 0,
            opacity: 1
        }
    },
    created() {
        this.$root.$on('message', (event) => {
            // console.log(event)
            if (event.data.type === 'mnds:event' && (event.data.action === 'food' || event.data.action === 'drink')) {
                const data = event.data.data
                const action = event.data.action
                if (data) {
                    let food = parseFloat(data)
                    food = Math.round((1 - food) * 10)
                    this[action] = food > 9 ? 9 : food
                }
            }
            if (event.data.type === 'mnds:event' && event.data.action === 'display') {
                const data = event.data.data
                this.opacity = data ? 1 : 0
            }
        })
    }
}
</script>

<style lang="less">
.status{
    position: fixed;
    bottom: 10px * 2.0;
    left: 140px * 2.0;
    color: green;
    transition: all .5s ease;
    &__1{
        color: rgb(68, 128, 0);
    }
    &__2{
        color: rgb(100, 128, 0);
    }
    &__3{
        color: rgb(119, 128, 0);
    }
    &__4{
        color: rgb(128, 115, 0);
    }
    &__5{
        color: rgb(128, 98, 0);
    }
    &__6{
        color: rgb(128, 68, 0);
    }
    &__7{
        color: rgb(128, 36, 0);
    }
    &__8{
        color: rgb(128, 15, 0);
    }
    &__9{
        color: rgb(128, 0, 0);
    }
    .drink{
        margin-top: 10px * 2.0;
    }
    i{
        font-size: 20px * 2.0;
        transition: color .5s ease;
    }
}
</style>