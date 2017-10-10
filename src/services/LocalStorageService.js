import {LocalStorage} from 'quasar'
export default class LocalStorageService {
  constructor () {
    this.fridgeItemList = LocalStorage.get.item('fridgeItemList')
    if (!this.fridgeItemList) {
      LocalStorage.set('fridgeItemList', [])
      this.fridgeItemList = []
      console.log('LocalStorageService initialized')
    }
  }
  fridgeItemList = []
  getData () {
    this.fridgeItemList = LocalStorage.get.item('fridgeItemList')
    console.log(this.fridgeItemList)
    return this.fridgeItemList || []
  }
  addItem (item) {
    this.fridgeItemList = LocalStorage.get.item('fridgeItemList')
    console.log(this.fridgeItemList)
    if (this.fridgeItemList) {
      this.fridgeItemList.push(item)
      LocalStorage.set('fridgeItemList', this.fridgeItemList)
    }
    else {
      // handle error
      console.log('Could not insert data')
      alert('Error: Could not insert data')
    }
  }
  isItemInFridge (itemName) {
    return true
  }
}
