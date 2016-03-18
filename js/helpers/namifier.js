import Categorizer from "./categorizer";

let stripText = (text) => {
  return (arrayOfVerbs = []) => {
    let newText = text;
    arrayOfVerbs.forEach( (verb) => {
      newText = newText.replace(verb, "");
    });
    return newText.trim();
  };
};

const Namifier = {
  namify: (text, category) => {
    const verbs = Categorizer.verbsForCategory(category.toLowerCase());
    return stripText(text)(verbs)
  }
};

export default Namifier;
