<template>
  <div class="admin">
      <div class="admin__menu">
        <Button
            v-for="item in menuList"
            :key="item.id"
            type="primary"
            @click="onMenuClick(item)"
        >{{ item.name }}</Button>
      </div>
  </div>
</template>

<script>
import { Button } from 'element-ui'
export default {
    name: 'Admin',
    components: {
        Button
    },
    data() {
        return {
            menuList: [{
                id: 0,
                name: '地点管理'
            }]
        }
    },
    created() {},
    methods: {
        onMenuClick(item) {
            // 地点管理
            if (item.id === 0) {
                this.$root.$emit('admin:placemanage')
            }
        }
    }
}
</script>

<style lang="less">
.admin{
    padding: 20px;
}
</style>