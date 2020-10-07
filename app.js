// App Controller

const AppCtrl = (function (ItemCtrl, StorageCtrl, UICtrl) {

  // Load Event Listeners 
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add Item Event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable Submit on Enter
    document.addEventListener('keypress', function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        return false;
      }
    });

    // Edit Icon Click Event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update Item Event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete Item Event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Back Button Event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    // Clear Items Event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  };


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

    // Store in Local Storage
    StorageCtrl.storeItem(newItem);

    // Clear Input Fields
    UICtrl.clearInput();

    e.preventDefault();
  };


  // Edit Item Click
  const itemEditClick = function (e) {
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
  };


  // Update Item Submit
  const itemUpdateSubmit = function (e) {
    // Get Item Input
    const input = UICtrl.getItemInput();

    // Update Item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update the UI
    UICtrl.updateListItem(updatedItem);

    // Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add Total Calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Update LS
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
  };


  // Delete Button Event
  const itemDeleteSubmit = function (e) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add Total Calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete from LS
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();

    // Hide UL
    // UICtrl.hideList();

    e.preventDefault();
  };


  // Clear All Items Event
  const clearAllItemsClick = function () {
    // Delete All Items from Data Structure
    ItemCtrl.clearAllItems();

    // Get Total Calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add Total Calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeItems();

    // Clear from LS
    StorageCtrl.clearItemsFromStorage();

    // Hide UL
    UICtrl.hideList();
  };


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
})(ItemCtrl, StorageCtrl, UICtrl);


// Initialize AppCtrl
AppCtrl.init();