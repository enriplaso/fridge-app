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
    // this.fridgeItemList = LocalStorage.get.item('fridgeItemList')
    console.log(this.fridgeItemList)
    if (this.fridgeItemList) {
      if (this.itemIndex(item.name) !== -1) {
        alert('Error: Item already exists')
      }
      else {
        this.fridgeItemList.push(item)
        LocalStorage.set('fridgeItemList', this.fridgeItemList)
      }
    }
    else {
      // handle error
      console.log('Could not insert data')
      alert('Error: Could not insert data')
    }
  }
  editItem (item) {
    if (this.fridgeItemList) {
      let index = this.itemIndex(item.name)
      if (index !== -1) {
        this.fridgeItemList[index] = item
        LocalStorage.set('fridgeItemList', this.fridgeItemList)
      }
      else {
        alert('Error edit: Could not edit data')
      }
    }
    else {
      alert('Error edit: Could not edit data')
    }
  }
  deleteItem (item) {
    if (this.fridgeItemList) {
      let index = this.itemIndex(item.name)
      if (index !== -1) {
        this.fridgeItemList.splice(index, 1)
        LocalStorage.set('fridgeItemList', this.fridgeItemList)
      }
      else {
        alert('Error delete: Item deoes not exists')
      }
    }
    else {
      alert('Error delete: Item can not be deleted')
    }
  }
  itemIndex (itemName) {
    this.fridgeItemList = LocalStorage.get.item('fridgeItemList')
    let length = this.fridgeItemList.length
    for (let i = 0; i < length; i++) {
      console.log(this.fridgeItemList[i].name + ' // ' + itemName)
      if (this.fridgeItemList[i].name.toString().trim() === itemName.toString().trim()) {
        return i
      }
    }
    return -1
  }
}
