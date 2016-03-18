import MemoryActions from "../actions/MemoryActions";
import YelpWrapper from "./yelpWrapper";
import request from "request";

const baseRefUrl = 'https://scrapbook.firebaseio.com/';
const categoriesRef = new Firebase(baseRefUrl + "categories/");
const memoriesRef = new Firebase(baseRefUrl + "memories/");

let newMemoryRef = (id) => {
  return new Firebase(baseRefUrl + "memories/" + id);
}

class Api {

  static fetchCategories() {
    categoriesRef.once('value', function(snapshot) {
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
    const { id, category, text, name } = memory;
    newMemoryRef(id).set(memory);

    //const search = YelpWrapper.prepareSearch(name, category);
    //const { url, method } = search.requestData;
    //const { headers } = search;

    //request({
      //url: url,
      //method: method,
      //headers: headers
    //}, (error, response, body) => {
      //console.log(error);
      //console.log(response);
      //console.log(body);
    //});
  }
};

let arrayify = (obj) => {
  if (obj) {
    return Object.keys(obj).map((k) => obj[k]);
  }
  return [];
}

export default Api;
