<template>
  <!-- you define your Vue template here -->
  <div class="item-list-container">
    <q-search v-model="search" />
    <q-list highlight>
      <q-list-header>Fridge items</q-list-header>
      <q-item v-for="fridgeItem in filteredList" v-bind:key="fridgeItem.name"  v-on:click="openListItemDetails()">
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
  QSearch
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
    QSearch
  },
  data () {
    return {
      search: '',
      fridgeItemsList: [
        {name: 'bannana', quantity: 3, expiredDate: '28/10/2017', comment: 'xxxx'},
        {name: 'yogurt', quantity: 3, expiredDate: '28/10/2017', comment: 'xxxx'},
        {name: 'Cheese', quantity: 3, expiredDate: '28/10/2017', comment: 'xxxx'},
        {name: 'Milk', quantity: 3, expireddate: '28/10/2017', comment: 'xxxx'}
      ]
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
    openListItemDetails () {
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
</style>