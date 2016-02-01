import MemoryActions from "../actions/MemoryActions";

const baseRefUrl = 'https://scrapbook.firebaseio.com/';
const categoriesRef = new Firebase(baseRefUrl + "categories/");
const memoriesRef = new Firebase(baseRefUrl + "memories/");

class Api {

  static newMemoryRef(id) {
    return new Firebase(baseRefUrl + "memories/" + id);
  }

  static fetchCategories() {
    categoriesRef.once('value', function (snapshot) {
      MemoryActions.getAllCategories(snapshot.val());
    });
  }

  static fetchCategory(category) {
    memoriesRef.orderByChild("category").equalTo(category).on("value", function(snapshot) {
      MemoryActions.showCategory(category, snapshot.val());
    });
  }

  static addMemory(memory) {
    newMemoryRef(memory.id).set(memory);
  }
};

export default Api;
