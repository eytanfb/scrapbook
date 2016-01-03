var AppDispatcher = require('../dispatcher/AppDispatcher');
var MemoryConstants = require('../constants/MemoryConstants');

var MemoryActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: MemoryConstants.ADD_MEMORY,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the Memory item
   * @param  {string} text
   */
  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: MemoryConstants.MEMORY_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single Memory is complete
   * @param  {object} memory
   */
  toggleComplete: function(memory) {
    var id = memory.id;
    var actionType = memory.complete ?
      MemoryConstants.MEMORY_UNDO_COMPLETE :
      MemoryConstants.MEMORY_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: MemoryConstants.MEMORY_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: MemoryConstants.MEMORY_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: MemoryConstants.MEMORY_DESTROY_COMPLETED
    });
  },

  getAllCategories: function(categories) {
    AppDispatcher.dispatch({
      actionType: MemoryConstants.FETCH_ALL,
      categories: categories
    });
  },

  showCategory: function (category, memories) {
    console.log("show category", category, memories);
    AppDispatcher.dispatch({
      actionType: MemoryConstants.SHOW_CATEGORY,
      category: category,
      memories: memories
    });
  },
};

module.exports = MemoryActions;
