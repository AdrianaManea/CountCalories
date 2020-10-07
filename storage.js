// Storage Controller

const StorageCtrl = (function () {

  // Public Methods
  return {
    storeItem: function (item) {
      let items;
      // Check if any items in LS
      if (localStorage.getItem('items') === null) {
        items = [];
        // Push New item
        items.push(item);
        // Set LS
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is already in LS
        items = JSON.parse(localStorage.getItem('items'));

        // Push new item
        items.push(item);

        // Re set LS
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function () {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function (updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function (item, index) {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      // Re set LS
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function (id) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function (item, index) {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      // Re set LS
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function () {
      localStorage.removeItem('items');
    }
  }
})();