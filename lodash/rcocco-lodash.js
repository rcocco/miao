var rcocco = function() {
  // Array
  function chunk(arr, size = 1) {
    let result = [[]];
    for(let i = 0, j = 0; i < arr.length; i++){
      if(result[j].length == size){
        result.push([]);
        j++;
      }
      result[j].push(arr[i]);
    }
    return result;
  }
  function compact(arr) {
    let result = [];
    for(let i = 0; i < arr.length; i++){
      if(arr[i]) result.push(arr[i]);
    }
    return result;
  }
  function concat(arr, ...vals) {
    let result = [];
    for(let i = 0; i < arr.length; i++){
      result.push(arr[i]);
    }
    for(let i = 0; i < vals.length; i++){
      if(Array.isArray(vals[i])){
        for(let j = 0; j < vals[i].length; j++){
          result.push(vals[i][j]);
        }
      }else{
        result.push(vals[i]);
      }
    }
    return result;
  }
  function difference(arr, ...arrs){
    let result = [];
    let set = new Set(); // set使用SameValueZero算法，不会像对象键那样转字符串再比较
    for(let i = 0; i < arrs.length; i++){
      for(let j = 0; j < arrs[i].length; j++){
        let key = arrs[i][j];
        set.add(key);
      }
    }
    for(let i = 0; i < arr.length; i++){
      if(!set.has(arr[i])) result.push(arr[i]);
    }
    return result;
  }
  function differenceBy(arr, ...vals) {
    let iteratee = identity;
    if(vals.length > 0){
      if(typeof vals[vals.length-1] === 'function'){
        iteratee = vals[vals.length-1];
        vals.length -= 1;
      }else if(typeof vals[vals.length-1] === 'string'){
        iteratee = property(vals[vals.length-1]);
        vals.length -= 1;
      }
    }
    let result = [];
    let set = new Set();
    for(let i = 0; i < vals.length; i++){
      for(let j = 0; j < vals[i].length; j++){
        let key = iteratee(vals[i][j]);
        set.add(key);
      }
    }
    for(let i = 0; i < arr.length; i++){
      if(!set.has(iteratee(arr[i]))) result.push(arr[i]);
    }
    return result;
  }
  function differenceWith(arr, ...vals) {
    comparator = vals[vals.length-1];
    vals.length -= 1;
    let result = [];
    for(let i = 0; i < arr.length; i++) {
      // arr[i] 原数组中要比较的值
      for(let j = 0; j < vals.length; j++) {
        for(let k = 0; k < vals[j].length; k++){
          // vals[j][k] 用于对比的值
          if(!comparator(arr[i], vals[j][k]))
            result.push(arr[i]);
        }
      }
    }
    return result;
  }
  function drop(arr, n = 1) {
    let result = [];
    for(let i = n; i < arr.length; i++){
      result.push(arr[i]);
    }
    return result;
  }
  function dropRight(arr, n = 1) {
    let result = [];
    for(let i = 0; i < arr.length - n; i++){
      result.push(arr[i]);
    }
    return result;
  }
  function dropRightWhile(arr, predicate = identity) {
    if(Array.isArray(predicate))
      predicate = matchesProperty(predicate[0], predicate[1]);
    else if(typeof predicate === 'object')
      predicate = matches(predicate);
    else if(typeof predicate === 'string')
      predicate = property(predicate);
    let result = [];
    let end = arr.length - 1;
    while(predicate(arr[end], end, arr)) end--;
    for(let i = 0; i <= end ; i++){
      result.push(arr[i]);
    }
    return result;
  }
  function dropWhile(arr, predicate = identity) {
    if(Array.isArray(predicate))
      predicate = matchesProperty(predicate[0], predicate[1]);
    else if(typeof predicate === 'object')
      predicate = matches(predicate);
    else if(typeof predicate === 'string')
      predicate = property(predicate);
    let result = [];
    let start = 0;
    while(predicate(arr[start], start, arr)) start++;
    for(let i = start; i < arr.length ; i++){
      result.push(arr[i]);
    }
    return result;
  }
  function fill(arr, val, start = 0, end = arr.length) {
    for(let i = start; i < end; i++){
      arr[i] = val;
    }
    return arr;
  }
  function findIndex(arr, predicate = identity, fromIndex = 0) {
    if(Array.isArray(predicate))
      predicate = matchesProperty(predicate[0], predicate[1]);
    else if(typeof predicate === 'object')
      predicate = matches(predicate);
    else if(typeof predicate === 'string')
      predicate = property(predicate);
    for(let i = fromIndex; i < arr.length; i++){
      if(predicate(arr[i])) return i;
    }
    return -1;
  }
  function findLastIndex(arr, predicate = identity, fromIndex = arr.length - 1) {
    if(Array.isArray(predicate))
      predicate = matchesProperty(predicate[0], predicate[1]);
    else if(typeof predicate === 'object')
      predicate = matches(predicate);
    else if(typeof predicate === 'string')
      predicate = property(predicate);
    for(let i = fromIndex; i >= 0; i--){
      if(predicate(arr[i])) return i;
    }
    return -1;
  }
  function flatten(arr) {
    let result = [];
    for(let i = 0; i < arr.length; i++){
      if(Array.isArray(arr[i])){
        for(let j = 0; j < arr[i].length; j++){
          result.push(arr[i][j]);
        }
      }else{
        result.push(arr[i]);
      }
    }
    return result;
  }
  function flattenDeep(arr) {
    let result = [];
    for(let i = 0; i < arr.length; i++){
      if(Array.isArray(arr[i])){
        let flattenArr = flattenDeep(arr[i]);
        for(let j = 0; j < flattenArr.length; j++){
          result.push(flattenArr[j]);
        }
      }else{
        result.push(arr[i]);
      }
    }
    return result;
  }
  function flattenDepth(arr, depth = 1) {
    let result = [];
    for(let i = 0; i < arr.length; i++){
      if(depth > 0 && Array.isArray(arr[i])){
        let flattenArr = flattenDepth(arr[i], depth-1);
        for(let j = 0; j < flattenArr.length; j++){
          result.push(flattenArr[j]);
        }
      }else{
        result.push(arr[i]);
      }
    }
    return result;
  }
  function fromPairs(arr) {
    let obj = {};
    for(let i = 0; i < arr.length; i++){
      // key = arr[i][0]
      // value = arr[i][1]
      obj[arr[i][0]] = arr[i][1];
    }
    return obj;
  }
  function head(arr) {
    return arr[0];
  }
  function indexOf(arr, val, fromIndex = 0) {
    if(fromIndex < 0) fromIndex += arr.length;
    for(let i = fromIndex; i < arr.length; i++){
      if(arr[i] === val) return i;
    }
    return -1;
  }
  function initial(arr) {
    let result = [];
    for(let i = 0; i < arr.length - 1; i++){
      result.push(arr[i]);
    }
    return result;
  }
  function intersection(...arrs) {
    // 数组内的值可能是多个不同类型
    // SameValueZero算法如果Type不相同返回false
    // 即 1 === "1" 为false
    // 但对象的key都会转换为字符串
    // 不能用对象作为set
    // 用ES6提供的Set
    if(arrs.length == 0) return [];
    else if(arrs.length == 1) {
      // 如果只有一个数组，它自身的元素就是交集
      let result = [];
      for(let j = 0; j < arrs[0].length; j++){
        result.push(arrs[0][j]);
      }
      return result;
    }
    let setlast = new Set();
    let set = new Set();
    for(let j = 0; j < arrs[arrs.length-1].length; j++) {
      setlast.add(arrs[arrs.length-1][j]);
    }
    for(let i = 0; i < arrs.length - 1; i++) {
      for(let j = 0; j < arrs[i].length; j++){
        if(setlast.has(arrs[i][j])) {
          set.add(arrs[i][j]);
        }
      }
    }
    return Array.from(set);
  }
  function intersectionBy(...arrs) {
    if(arrs.length == 0) return [];
    else if(arrs.length == 1) {
      let result = [];
      for(let j = 0; j < arrs[0].length; j++){
        result.push(arrs[0][j]);
      }
      return result;
    }
    // assert arrs.length > 1
    let iteratee = identity;
    if(typeof arrs[arrs.length-1] === 'function'){
      iteratee = arrs[arrs.length-1];
      arrs.length -= 1;
    }else if(typeof arrs[arrs.length-1] === 'string'){
      iteratee = property(arrs[arrs.length-1]);
      arrs.length -= 1;
    }
    let setlast = new Set();
    let set = new Set();
    for(let j = 0; j < arrs[arrs.length-1].length; j++) {
      setlast.add(iteratee(arrs[arrs.length-1][j]));
    }
    for(let i = 0; i < arrs.length - 1; i++) {
      for(let j = 0; j < arrs[i].length; j++){
        if(setlast.has(iteratee(arrs[i][j]))) {
          set.add(arrs[i][j]);
        }
      }
    }
    return Array.from(set);
  }
  function intersectionWith(...arrs) {
    let result = [];
    if(arrs.length == 0) return result;
    else if(arrs.length == 1) {
      for(let j = 0; j < arrs[0].length; j++){
        result.push(arrs[0][j]);
      }
      return result;
    }
    comparator = arrs[arrs.length-1];
    arrs.length -= 1;
    for(let i = 0; i < arrs[0].length; i++) {
      // arrs[0][i] 第一个数组中的值
      outer:
      for(let j = 1; j < arrs.length; j++) {
        for(let k = 0; k < arrs[j].length; k++){
          // arrs[j][k] 用于对比的值
          if(comparator(arrs[0][i], arrs[j][k])){
            result.push(arrs[0][i]);
            continue outer;
          }
        }
      }
    }
    return result;
  }
  function join(arr, separator=',') {
    separator = String(separator);
    let str = "";
    let i;
    for(i = 0; i < arr.length - 1; i++){
      str += arr[i]+separator;
    }
    if(i < arr.length) str += arr[i];
    return str;
  }
  function last(arr) {
    return arr[arr.length-1];
  }
  function lastIndexOf(arr, val, fromIndex=arr.length-1) {
    for(let i = fromIndex; i >= 0; i--){
      if(arr[i] === val) return i;
    }
    return -1;
  }
  function nth(arr, n = 0) {
    if(n < 0) n += arr.length;
    return arr[n];
  }
  function pull(arr, ...vals) {
    let set = new Set(arr);
    for(let i = 0; i < vals.length; i++){
      set.delete(vals[i]);
    }
    let i = 0;
    for(let j = 0; j < arr.length; j++){
      if(set.has(arr[j])){
        arr[i] = arr[j];
        i++;
      }
    }
    arr.length = i;
    return arr;
  }
  function pullAll(arr, vals) {
    return pull(arr, ...vals);
  }
  function pullAllBy(arr, vals, iteratee = identity) {
    if(typeof iteratee === 'string')
      iteratee = property(iteratee);
    let set = new Set();
    for(let i = 0; i < arr.length; i++){
      set.add(iteratee(arr[i]));
    }
    for(let i = 0; i < vals.length; i++){
      set.delete(iteratee(vals[i]));
    }
    let i = 0;
    for(let j = 0; j < arr.length; j++){
      if(set.has(iteratee(arr[j]))){
        arr[i] = arr[j];
        i++;
      }
    }
    arr.length = i;
    return arr;
  }
  function pullAllWith(arr, vals, comparator) {
    let i = 0;
    for(let j = 0; j < arr.length; j++){
      // arr[j]用来比较
      let k;
      for(k = 0; k < vals.length; k++){
        // vals[k]用来比较
        if(comparator(arr[j], vals[k])) {
          break;
        }
      }
      if(k == vals.length) {
        arr[i] = arr[j];
        i++;
      }
    }
    arr.length = i;
    return arr;
  }
  // 未测试
  function pullAt(arr, ...indexes) {
    // indexes的元素可能是数组，也可能是数字
    // 从arr中删除指定索引的元素
    // 返回所有被删除的元素组成的数组，且indexes指定的顺序
    indexes = flatten(indexes);
    let removeArr = [];
    for(let i = 0; i < indexes.length; i++) {
      removeArr.push(arr[indexes[i]]);
    }
    indexes.sort();
    for(let i = indexes.length - 1; i >= 0; i--) {
      indexes[i]
      for(let j = indexes[i]; j < arr.length - 1; j++) {
        arr[j] = arr[j+1];
      }
      arr.length--;
    }
    return removeArr;
  }
  function remove(arr, predicate = identity) {
    let removeArr = [];
    for(let i = 0; i < arr.length; i++) {
      if(predicate(arr[i], i, arr))
        removeArr.push(arr[i]);
    }
    pull(arr, ...removeArr);
    return removeArr;
  }
  // Lang
  function isEqual(x, y) {
    if(x === y) return true;
    // 类型可能不一致导致false
    // 若x或y为NaN可能导致false(需修正)
    // 数字不相等可能为false
    // String不相等可能为false
    // 布尔值不相等可能为false
    // 不是同一个对象可能为false(需修正)
    if(x !== x && y !== y) return true; // NaN
    if(x === null || y === null || typeof x != 'object' || typeof y != 'object')
      return false;
    // 先比较属性个数，避免x的属性是y的属性的子集
    if(Object.keys(x).length != Object.keys(y).length)
      return false;
    for(let key in x) {
      if(!(key in y) || !isEqual(x[key], y[key]))
        return false;
    }
    return true;
  }
  // Util
  function identity(val) {
    return val;
  }
  function matches(source){
    return function(obj) {
      for(let key in source) {
        if(!(key in obj) || !isEqual(source[key], obj[key]))
          return false;
      }
      return true;
    }
  }
  function matchesProperty(path, val){
    if(typeof path === 'string') path = path.split('.');
    return function(obj) {
      // 类似property
      // 但直接调property无法区分没有路径还是值就是undefined
      let i;
      for(i = 0; obj !== undefined && i < path.length; i++){
        obj = obj[path[i]];
      }
      if(i < path.length) return false;
      return isEqual(obj, val);
    }
  }
  function property(path) {
    if(typeof path === 'string') path = path.split('.');
    return function(obj) {
      for(let i = 0; obj !== undefined && i < path.length; i++){
        obj = obj[path[i]];
      }
      return obj;
    }
  }
  return {
    chunk,
    compact,
    concat,
    difference,
    differenceBy,
    differenceWith,
    drop,
    dropRight,
    dropRightWhile,
    dropWhile,
    fill,
    findIndex,
    findLastIndex,
    flatten,
    flattenDeep,
    flattenDepth,
    fromPairs,
    head,
    indexOf,
    initial,
    intersection,
    intersectionBy,
    intersectionWith,
    join,
    last,
    lastIndexOf,
    nth,
    pull,
    pullAll,
    pullAllBy,
    pullAllWith,

    isEqual,
    identity,
    matches,
    matchesProperty,
    property
  }
}();