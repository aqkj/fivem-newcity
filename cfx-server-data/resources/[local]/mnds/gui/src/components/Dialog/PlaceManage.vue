<template>
  <div class="place-manage">
    <Dialog
      title="地点管理"
      width="70%"
      :visible.sync="showDialog"
    >
      <Button type="primary" @click="showInfoDialog = true">添加地点</Button>
      <Table>
          <TableColumn label="地点名称"></TableColumn>
          <TableColumn label="地点marker"></TableColumn>
          <TableColumn label="操作">
            <template slot-scope="row">
              {{ row }}
            </template>
          </TableColumn>
      </Table>
    </Dialog>
    <Dialog title="添加地点" :visible.sync="showInfoDialog" >
        <Form label-width="80px">
          <FormItem label="地点名：">
            <Input v-model="form.name" placeholder="请输入地点名称"/>
          </FormItem>
          <FormItem label="marker：">
            <Input v-model="form.marker" placeholder="请输入marker名称"/>
          </FormItem>
        </Form>
        <div slot="footer" class="dialog-footer">
          <Button type="primary" @click="showInfoDialog = false">确 定</Button>
        </div>
    </Dialog>
  </div>
</template>

<script>
/**
 * 地点管理
 */
import { Dialog, Table, TableColumn, Button, Form, FormItem, Input } from 'element-ui'
export default {
    name: 'PlaceManage',
    components: {
        Dialog,
        Table,
        TableColumn,
        Button,
        Form,
        FormItem,
        Input
    },
    data() {
        return {
            showDialog: false,
            showInfoDialog: false,
            form: {
              name: '',
              marker: ''
            }
        }
    },
    created() {
        this.$root.$on('admin:placemanage', () => {
          this.showDialog = true
        })
    }
}
</script>

<style>

</style>