<template>
  <!-- you define your Vue template here -->
  <div class="item-list-container">
    <q-search v-model="search" />
    <q-list highlight>
      <q-list-header>Fridge items</q-list-header>
      <q-item v-for="fridgeItem in filteredList" v-bind:key="fridgeItem.name"  v-on:click="showDialog(fridgeItem);">
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
    <q-btn class="create-button" round icon="create" color="secondary" v-on:click="showDialog()"></q-btn>
  </div>
</template>
<script>
import LocalStorageService from 'services/LocalStorageService'
const localStorageService = new LocalStorageService()
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
  QItemTile,
  QItemSeparator,
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
  watch: {
    fridgeItemsList: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    }
  },
  created () {
    this.fridgeItemsList = localStorageService.getData()
    console.log(this.fridgeItemsList)
  },
  computed: {
    filteredList () {
      console.log(Object.keys(this.fridgeItemsList))
      return this.fridgeItemsList.filter(item => {
        return item && item.name ? item.name.toLowerCase().includes(this.search.toLowerCase()) : {}
      })
    }
  },
  methods: {
    getData () {
      this.fridgeItemsList = localStorageService.getData()
      alert('TEST')
    },
    showDialog (fridgeItem) {
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
              localStorageService.addItem(data)
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
  bottom 10px
  right 10px
</style>