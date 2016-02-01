import AppDispatcher from '../dispatcher/AppDispatcher';
import * as MemoryConstants from '../constants/MemoryConstants';

class MemoryActions {

  /**
   * @param  {string} text
   */
  static create(text) {
    AppDispatcher.dispatch({
      actionType: MemoryConstants.ADD_MEMORY,
      text: text
    });
  }

  /**
   * @param  {string} id The ID of the Memory item
   * @param  {string} text
   */
  static updateText(id, text) {
    AppDispatcher.dispatch({
      actionType: MemoryConstants.MEMORY_UPDATE_TEXT,
      id: id,
      text: text
    });
  }

  /**
   * Toggle whether a single Memory is complete
   * @param  {object} memory
   */
  static toggleComplete(memory) {
    var id = memory.id;
    var actionType = memory.complete ?
      MemoryConstants.MEMORY_UNDO_COMPLETE :
      MemoryConstants.MEMORY_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  }

  /**
   * Mark all ToDos as complete
   */
  static toggleCompleteAll() {
    AppDispatcher.dispatch({
      actionType: MemoryConstants.MEMORY_TOGGLE_COMPLETE_ALL
    });
  }

  /**
   * @param  {string} id
   */
  static destroy(id) {
    AppDispatcher.dispatch({
      actionType: MemoryConstants.MEMORY_DESTROY,
      id: id
    });
  }

  /**
   * Delete all the completed ToDos
   */
  static destroyCompleted() {
    AppDispatcher.dispatch({
      actionType: MemoryConstants.MEMORY_DESTROY_COMPLETED
    });
  }

  static getAllCategories(categories) {
    AppDispatcher.dispatch({
      actionType: MemoryConstants.FETCH_ALL,
      categories: categories
    });
  }

  static showCategory(category, memories) {
    AppDispatcher.dispatch({
      actionType: MemoryConstants.SHOW_CATEGORY,
      category: category,
      memories: memories
    });
  }
};

export default MemoryActions;
