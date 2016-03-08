import MemoryActions from "../actions/MemoryActions";

const baseRefUrl = 'https://scrapbook.firebaseio.com/';
const categoriesRef = new Firebase(baseRefUrl + "categories/");
const memoriesRef = new Firebase(baseRefUrl + "memories/");
let newMemoryRef = (id) => {
  return new Firebase(baseRefUrl + "memories/" + id);
}

class Api {

  static fetchCategories() {
    categoriesRef.once('value', function (snapshot) {
      MemoryActions.getAllCategories(snapshot.val());
    });
  }

  static fetchCategory(category) {
    memoriesRef.orderByChild("category").equalTo(category).on("value", function(snapshot) {
      const value = arrayify(snapshot.val());
      MemoryActions.showCategory(category, value);
    });
  }

  static addMemory(memory) {
    const { id } = memory;
    newMemoryRef(id).set(memory);
  }

};

let arrayify = (obj) =>  {
  if(obj) {
    return Object.keys(obj).map((k) => obj[k]);
  }
  return [];
}

export default Api;
