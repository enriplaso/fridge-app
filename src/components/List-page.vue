<template>
  <!-- you define your Vue template here -->
  <div class="item-list-container">
    <q-search v-model="search" />
    <q-list highlight>
      <q-list-header>Fridge items</q-list-header>
      <q-item v-for="fridgeItem in filteredList" v-bind:key="fridgeItem.name"  v-on:click="itenDialog.handler(fridgeItem)">
        <q-item-main>
          <q-item-tile label>{{fridgeItem.name}}</q-item-tile>
          <q-item-tile sublabel>Quasar enthusiast</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile icon="chat_bubble" color="green" />
        </q-item-side>
      </q-item>
      <q-item-separator inset />
    </q-list>
    <q-btn class="create-button" round icon="create" color="secondary" v-on:click="itenDialog.handler()"></q-btn>
  </div>
</template>
<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QSearch,
  Dialog,
  Toast
} from 'quasar'
export default {
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSearch,
    Dialog,
    Toast
  },
  data () {
    return {
      search: '',
      fridgeItemsList: [
        {name: 'bannana', quantity: 3, expiredDate: '28/10/2017', comment: 'xxxx'},
        {name: 'yogurt', quantity: 3, expiredDate: '28/10/2017', comment: 'xxxx'},
        {name: 'Cheese', quantity: 3, expiredDate: '28/10/2017', comment: 'xxxx'},
        {name: 'Milk', quantity: 3, expireddate: '28/10/2017', comment: 'xxxx'}
      ],
      itenDialog: {
        label: 'Edit Item',
        icon: 'warning',
        handler (fridgeItem) {
          Dialog.create({
            title: fridgeItem ? 'Edit' : 'Create',
            form: {
              name: {
                type: 'text',
                label: 'Item name',
                model: fridgeItem ? fridgeItem.name: ''
              },
              age: {
                type: 'number',
                label: 'Number of items',
                model: fridgeItem ? fridgeItem.quantity: 1,
                min: 1,
                max: 90
              },
              comments: {
                type: 'textarea',
                label: 'Comment',
                model: fridgeItem ? fridgeItem.comment: '',
              }
            },
            buttons: [
              'Cancel',
              {
                label: 'Ok',
                handler (data) {
                  Toast.create('Returned ' + JSON.stringify(data))
                }
              }
            ]
          })
        }
      }
    }
  },
  computed: {
    filteredList () {
      return this.fridgeItemsList.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    openListItemModal (edit) {
      alert('TEST')
    }
  }
}
</script>
<style lang="stylus">
/* This is where your CSS goes */
.item-list-container
  position absolute
  height 100%
  width 100%
.create-button
  position fixed
  bottom 10px
  right 10px
</style>