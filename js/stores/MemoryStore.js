var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MemoryConstants = require('../constants/MemoryConstants');
var Categorizer = require('../helpers/categorizer');
var assign = require('object-assign');
var Api = require('../helpers/api');

var CHANGE_EVENT = 'change';

var _memories = {};
var _memoryGroups = [];
var _memoriesByCategory = { memories: [], category: "" };

function storeMemoryGroups(groups) {
  groups.forEach(function (group, index) {
    _memoryGroups.push(group);
  });
}

function categoryMemories(category, memories) {
  _memoriesByCategory = {};
  _memoriesByCategory = {category: category, memories: memories};
}

/**
 * Create a MEMORY item.
 * @param  {string} text The content of the MEMORY
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  var memory = {
    id: id,
    dateAdded: Date.now(),
    text: text
  };
  _memories[id] = memory;
  return processMemory(memory);
}

function processMemory(memory) {
  var text = memory.text;
  memory["category"] = Categorizer.categorize(text);
  return memory;
};

/**
 * Update a MEMORY item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _memories[id] = assign({}, _memories[id], updates);
}

/**
 * Update all of the MEMORY items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _memories) {
    update(id, updates);
  }
}

/**
 * Delete a MEMORY item.
 * @param  {string} id
 */
function destroy(id) {
  delete _memories[id];
}

/**
 * Delete all the completed MEMORY items.
 */
function destroyCompleted() {
  for (var id in _memories) {
    if (_memories[id].complete) {
      destroy(id);
    }
  }
};

var MemoryStore = assign({}, EventEmitter.prototype, {

  mixins: [ReactFireMixin],
  /**
   * Get the entire collection of MEMORYs.
   * @return {object}
   */
  getAllMemoryGroups: function() {
    return _memoryGroups;
  },

  getMemoriesByCategory: function () {
    return _memoriesByCategory;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch (action.actionType) {
    case MemoryConstants.ADD_MEMORY:
      text = action.text.trim();
      if (text !== '') {
        var memory = create(text);
        Api.addMemory(memory);
        MemoryStore.emitChange();
      }
      break;

    case MemoryConstants.MEMORY_TOGGLE_COMPLETE_ALL:
      if (MemoryStore.areAllComplete()) {
        updateAll({
          complete: false
        });
      } else {
        updateAll({
          complete: true
        });
      }
      MemoryStore.emitChange();
      break;

    case MemoryConstants.MEMORY_UNDO_COMPLETE:
      update(action.id, {
        complete: false
      });
      MemoryStore.emitChange();
      break;

    case MemoryConstants.MEMORY_COMPLETE:
      update(action.id, {
        complete: true
      });
      MemoryStore.emitChange();
      break;

    case MemoryConstants.MEMORY_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {
          text: text
        });
        MemoryStore.emitChange();
      }
      break;

    case MemoryConstants.MEMORY_DESTROY:
      destroy(action.id);
      MemoryStore.emitChange();
      break;

    case MemoryConstants.MEMORY_DESTROY_COMPLETED:
      destroyCompleted();
      MemoryStore.emitChange();
      break;

    case MemoryConstants.FETCH_ALL:
      storeMemoryGroups(action.categories);
      MemoryStore.emitChange();
      break;

    case MemoryConstants.SHOW_CATEGORY:
      categoryMemories(action.category, action.memories);
      MemoryStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = MemoryStore;
