var rcocco = function() {
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
  function SameValueNonNumber(x, y) {
    if(x === undefined) return true;
    if(x === null) return true;
    if(typeof x === 'string') return x === y;
    if(typeof x === 'boolean') return x === y;
    // if(typeof x === 'symbol') 规范要求判断，如何判断？
    return x === y;
  }
  function SameValueZero(x, y) {
    if(typeof x !== typeof y) return false;
    if(typeof x === "number") {
      if(x !== x && y !== y) return true;
      if(x === y) return true;
      return false;
    }
    return SameValueNonNumber(x,y);
  }
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
  function identity(val) {
    return val;
  }
  function property(path) {
    if(typeof path === 'string') path = path.split('.');
    return function(obj) {
      for(let i = 0; i < path.length; i++){
        obj = obj[path[i]];
      }
      return obj;
    }
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
  return {
    chunk,
    compact,
    concat,
    difference,
    differenceBy,
  }
}();