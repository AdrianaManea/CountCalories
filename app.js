// Storage Controller




// Item Controller
const ItemCtrl = (function () {
  // When we add an item we need a constructor so that we create an Item and then we can add it the Data Structure


  // Item Constructor
  const Item = function (id, name, calories) {
    // Each time we add an item and calories it's going to have an id
    this.id = id;
    this.name = name;
    this.calories = calories;
  }


  // Data Structure / State
  const data = {
    items: [
      // {
      //   id: 0,
      //   name: 'Oxtail Noodle Soup',
      //   calories: 470
      // },
      // {
      //   id: 1,
      //   name: 'White Wine',
      //   calories: 100
      // },
      // {
      //   id: 2,
      //   name: 'Ginger Ice Cream',
      //   calories: 230
      // },
    ],
    // when click update icon, that particular item to be the currentItem. And then that item is going to be put up in the form to be updated = currentItem
    currentItem: null,
    totalCalories: 0
  }


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
        }
      });
      return found;
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



// UI Controller
const UICtrl = (function () {

  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn'
  }

  // Public Methods
  return {
    populateItemList: function (items) {
      // Loop through the items, make each one into a list item and then insert it into the ul
      let html = '';

      items.forEach(function (item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      // Insert List Items
      // document.querySelector('#item-list').innerHTML = html;
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function (item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      // Insert Item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors: function () {
      return UISelectors;
    }
  }
})();



// App Controller
const AppCtrl = (function (ItemCtrl, UICtrl) {

  // Load Event Listeners 
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add Item Event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Edit Icon Click Event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
  }


  // Add Item Submit
  const itemAddSubmit = function (e) {
    // Get Form Input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Add Item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // Add Item to UI List
      UICtrl.addListItem(newItem);
    }

    // Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add Total Calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Clear Input Fields
    UICtrl.clearInput();

    e.preventDefault();
  }


  // Update Item Submit
  const itemUpdateSubmit = function (e) {
    if (e.target.classList.contains('edit-item')) {
      // Get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get Item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current Item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  }


  // Public Methods
  return {
    init: function () {
      // Clear edit state / set initial state
      UICtrl.clearEditState();

      // Fetch items from Data Structure
      const items = ItemCtrl.getItems();

      // Check if any Items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate List with Items
        UICtrl.populateItemList(items);
      }

      // Get Total Calories when the app is Initialized
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add Total Calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load Event Listeners
      loadEventListeners();

    }
  }

})(ItemCtrl, UICtrl);


// Initialize AppCtrl
AppCtrl.init();