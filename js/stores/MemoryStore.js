import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmitter from 'events';
import MemoryConstants from '../constants/MemoryConstants';
import Categorizer from '../helpers/categorizer';
import Api from '../helpers/api';
import assign from 'object-assign';

let CHANGE_EVENT = 'change';

let _memories = {};
let _memoryGroups = [];
let _memoriesByCategory = { memories: [], category: "" };

function storeMemoryGroups(groups) {
  groups.forEach(function (group, index) {
    _memoryGroups.push(group);
  });
  localStorage.setItem("_memoryGroups", JSON.stringify(_memoryGroups));
}

function categoryMemories(category, memories) {
  _memoriesByCategory = {
    category: category, 
    memories: memories
  };
}

/**
 * Create a MEMORY item.
 * @param  {string} text The content of the MEMORY
 */
function create(text) {
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
  getAllMemoryGroups() {
    return _memoryGroups;
  },

  getMemoriesByCategory() {
    return _memoriesByCategory;
  },

  getInitialState() {
    if(localStorage.getItem("_memoryGroups")){
      _memoryGroups = JSON.parse(localStorage.getItem("_memoryGroups"));
    }
    return {
      props: {
        memoryGroups: _memoryGroups,
        category: "",
        memories: []
      }
    };
  },

  getCurrentState() {
    const { category, memories } = _memoriesByCategory;
    return {
      props: {
        memoryGroups: _memoryGroups,
        category: category,
        memories: memories 
      }
    };
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

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

export default MemoryStore;
