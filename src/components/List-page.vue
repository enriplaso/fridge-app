<template>
  <!-- you define your Vue template here -->
  <div class="item-list-container">
    <q-search v-model="search" />
    <q-list highlight>
      <q-list-header>Fridge items</q-list-header>
      <q-item v-for="fridgeItem in filteredList" v-bind:key="fridgeItem.name">
        <q-item-main  v-on:click="editOrCreate(fridgeItem)">
          <q-item-tile label>{{fridgeItem.name}}</q-item-tile>
          <q-item-tile color="green" sublabel>{{fridgeItem.quantity}}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile icon="delete" color="red"  v-on:click="deleteItem(fridgeItem)"/>
        </q-item-side>
      </q-item>
      <q-item-separator inset />
    </q-list>
    <div class="list-info" v-if="fridgeItemsList.length === 0">
      Please add new Items in the list
    </div>
    <div class="list-info" v-else-if="filteredList.length === 0">
      There are not items with the current search
    </div>
    <q-btn class="create-button" round icon="create" color="secondary" v-on:click="editOrCreate()"></q-btn>
  </div>
</template>

<script>
import LocalStorageService from 'services/LocalStorageService'
const localStorageService = new LocalStorageService()
import {
  Loading,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemTile,
  QItemSeparator,
  QItemMain,
  QSearch,
  Dialog,
  Toast
} from 'quasar'

export default {
  components: {
    Loading,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemTile,
    QItemSeparator,
    QItemMain,
    QSearch,
    Dialog,
    Toast
  },
  data () {
    return {
      search: '',
      fridgeItemsList: []
    }
  },
  created () {
    Loading.show()
    setTimeout(
      () => {
        this.fridgeItemsList = localStorageService.getData()
        Loading.hide()
      },
      2000)
  },
  computed: {
    filteredList () {
      return this.fridgeItemsList.filter(item => {
        return item && item.name ? item.name.toLowerCase().includes(this.search.toLowerCase()) : {}
      })
    }
  },
  methods: {
    getData () {
      this.fridgeItemsList = localStorageService.getData()
    },
    editOrCreate (fridgeItem) {
      Dialog.create({
        title: fridgeItem ? 'Edit' : 'Create',
        form: {
          name: {
            type: 'text',
            label: 'Item name',
            model: fridgeItem ? fridgeItem.name : ' '
          },
          quantity: {
            type: 'number',
            label: 'Number of items',
            model: fridgeItem ? fridgeItem.quantity : 1,
            min: 1,
            max: 90
          },
          comment: {
            type: 'textarea',
            label: 'Comment',
            model: fridgeItem ? fridgeItem.comment : ' '
          }
        },
        buttons: [
          'Cancel',
          {
            label: 'Ok',
            handler: (data) => {
              Toast.create('Returned ' + JSON.stringify(data))
              if (fridgeItem) {
                localStorageService.editItem(data)
              }
              else {
                localStorageService.addItem(data)
              }
              this.fridgeItemsList = localStorageService.getData()
            }
          }
        ]
      })
    },
    deleteItem (fridgeItem) {
      Dialog.create({
        title: 'Do you want to delete this item ?',
        buttons: [
          'NO',
          {
            label: 'Yes',
            handler: () => {
              localStorageService.deleteItem(fridgeItem)
              this.fridgeItemsList = localStorageService.getData()
            }
          }
        ]
      })
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
  bottom 20px
  right 20px
.list-info
  padding-top 60px
  width 100%
  height 100px
  position absolute
  text-align center
</style>