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
  // function SameValueNonNumber(x, y) {
  //   if(x === undefined) return true;
  //   if(x === null) return true;
  //   if(typeof x === 'string') return x === y;
  //   if(typeof x === 'boolean') return x === y;
  //   // if(typeof x === 'symbol') 规范要求判断，如何判断？
  //   return x === y;
  // }
  // function SameValueZero(x, y) {
  //   if(typeof x !== typeof y) return false;
  //   if(typeof x === "number") {
  //     if(x !== x && y !== y) return true;
  //     if(x === y) return true;
  //     return false;
  //   }
  //   return SameValueNonNumber(x,y);
  // }
  function difference(arr, ...arrs){
    let result = [];
    let set = {};
    for(let i = 0; i < arrs.length; i++){
      for(let j = 0; j < arrs[i].length; j++){
        let key = arrs[i][j];
        set[key] = undefined;
      }
    }
    for(let i = 0; i < arr.length; i++){
      if(!(arr[i] in set)) result.push(arr[i]);
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
    let set = {};
    for(let i = 0; i < vals.length; i++){
      for(let j = 0; j < vals[i].length; j++){
        let key = iteratee(vals[i][j]);
        set[key] = undefined;
      }
    }
    for(let i = 0; i < arr.length; i++){
      if(!(iteratee(arr[i]) in set)) result.push(arr[i]);
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
    join,
    last,
    lastIndexOf,
    isEqual,
    identity,
    matches,
    matchesProperty,
    property
  }
}();