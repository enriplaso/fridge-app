<template>
  <!-- you define your Vue template here -->
  <div>
    <q-list highlight>
      <q-list-header>Fridge items</q-list-header>
      <q-item>
        <q-item-main>
          <q-item-tile label>John Doe</q-item-tile>
          <q-item-tile sublabel>Quasar enthusiast</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile icon="chat_bubble" color="green" />
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import {
  dom,
  event,
  openURL,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain
} from 'quasar'


// This is where your Javascript goes
// to define your Vue component, which
// can be a Layout, a Page or your own
// component used throughout the app.
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
    QItemMain
  }
}
</script>
<style>
/* This is where your CSS goes */
</style>