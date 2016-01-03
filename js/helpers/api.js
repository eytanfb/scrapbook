var MemoryActions = require("../actions/MemoryActions");

var Api = (function () {
  var baseRefUrl = 'https://scrapbook.firebaseio.com/';
  var categoriesRef = new Firebase(baseRefUrl + "categories/");
  var memoriesRef = new Firebase(baseRefUrl + "memories/");
  var newMemoryRef = function (id) {
    return new Firebase(baseRefUrl + "memories/" + id);
  };

  var _fetchCategories = function () {
    categoriesRef.once('value', function (snapshot) {
      MemoryActions.getAllCategories(snapshot.val());
    });
  };

  var _fetchCategory = function (category) {
    memoriesRef.orderByChild("category").equalTo(category).on("value", function(snapshot) {
      MemoryActions.showCategory(category, snapshot.val());
    });
  };

  var _addMemory = function (memory) {
    newMemoryRef(memory.id).set(memory);
  };

  return {
    fetchCategories: _fetchCategories,
    fetchCategory: _fetchCategory,
    addMemory: _addMemory
  };
}());

module.exports = Api;
