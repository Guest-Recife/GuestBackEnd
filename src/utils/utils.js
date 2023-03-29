export default class Utils {
  static arrayToObject(array, key) {
    const collection = {};

    array.forEach(data => {
      const val = data[key];

      if (!val) {
        return;
      }

      collection[val] = data;
    });

    return collection;
  }
}
