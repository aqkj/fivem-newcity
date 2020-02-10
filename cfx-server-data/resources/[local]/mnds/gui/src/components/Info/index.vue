<template>
  <div class="info" :style="{
    opacity
  }">
    <div class="info__tab">
        <div
          v-for="(item, index) in menuList"
          :key="item.id"
          :class="{
            'info__tab__item--active': index === currentMenuId
          }"
          class="info__tab__item"
          @click="onMenuClick(index)"
        >
          {{ item.name }}
        </div>
    </div>
    <div class="info__content">
      <keep-alive>
        <template v-if="menuList[currentMenuId] && menuList[currentMenuId].component">
          <component :is="menuList[currentMenuId].component" />
        </template>
      </keep-alive>
    </div>
  </div>
</template>

<script>
/**
 * info
 */
// import { Dialog } from 'element-ui'
import InfoInfo from './Info'
import Admin from './Admin'
export default {
  name: 'Info',
  components: {
    InfoInfo,
    Admin
  },
  data() {
    return {
      showDialog: true,
      opacity: 0,
      currentMenuId: 0,
      menuList: [{
      //   id: 0,
      //   name: '个人信息',
      //   component: InfoInfo
      // }, {
        id: 1,
        name: '游戏帮助'
      }, {
        id: 2,
        name: '管理员操作(管理员可见)',
        component: Admin
      }]
    }
  },
  created() {
    this.$root.$on('escActive', () => {
      this.opacity = 0
    })
    this.$root.$on('message', (event) => {
      if (event.data.type === 'mnds:event' && event.data.action === 'showHelp') {
        // const data = event.data.data
        this.opacity = 1
      }
    })
  },
  methods: {
    onMenuClick(id) {
      this.currentMenuId = id
    }
  }
}
</script>

<style lang="less">
.info{
    position: fixed;
    left: 50%;
    top: 43%;
    transform: translate(-50%, -50%);
    // box-shadow: 0 0 10px #ccc;
    width: 550px * 2.0;
    min-height: 200px * 2.0;
    // background-color: #000;
    display: flex;
    &__tab{
      margin-right: 10px * 2.0;
      &__item{
        background-color: rgba(0, 0, 0, .9);
        margin-bottom: 10px * 2.0;
        padding: 4px * 2.0;
        color: #fff;
        font-size: 6px * 2.0;
        box-shadow: 0 0 6px * 2.0 -3px * 2.0 #000;
        text-align: center;
        width: 100px * 2.0;
        transition: all .5s ease;
        cursor: pointer;
        &--active{
          background-color:rgba(255, 0, 76, .9);
          color: #fff;
        }
      }
    }
    &__content{
      background-color: rgba(0, 0, 0, .9);
      min-height: 10px * 2.0;
      width: 100%;
      box-shadow: 0 0 6px * 2.0 -3px * 2.0 #000;
    }
}
</style>