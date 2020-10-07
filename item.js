// Item Controller

const ItemCtrl = (function () {
  // When we add an item we need a constructor so that we create an Item and then we can add it the Data Structure


  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };


  // Data Structure / State
  const data = {
    // items: [
    //   {
    //     id: 0,
    //     name: 'Oxtail Noodle Soup',
    //     calories: 470
    //   },
    //   {
    //     id: 1,
    //     name: 'White Wine',
    //     calories: 100
    //   },
    //   {
    //     id: 2,
    //     name: 'Ginger Ice Cream',
    //     calories: 230
    //   },
    // ],
    items: StorageCtrl.getItemsFromStorage(),
    // when click update icon, that particular item to be the currentItem. And then that item is going to be put up in the form to be updated = currentItem
    currentItem: null,
    totalCalories: 0
  };


  // Public Methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;
      // Create ID 
      // Gives a sense of autoIncrement
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create newItem
      newItem = new Item(ID, name, calories);

      // Add to items Array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function (id) {
      let found = null;
      // Loop through items
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        };
      });
      return found;
    },
    updateItem: function (name, calories) {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        };
      });
      return found;
    },
    deleteItem: function (id) {
      // Get ids
      const ids = data.items.map(function (item) {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);
    },
    clearAllItems: function () {
      data.items = [];
    },
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    getTotalCalories: function () {
      let total = 0;

      // Loop through items and add Calories
      data.items.forEach(function (item) {
        total += item.calories; // total = total +item.calories
      });

      // Set totalCalories in Data Structure
      data.totalCalories = total;

      // Return total
      return data.totalCalories;
    },
    logData: function () {
      return data;
    }
  }
})();