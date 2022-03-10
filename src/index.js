console.clear();

// memoizing functions which accept functions as arguments
function memoize(func) {
  const cache = new Map();
  const myKey = Symbol();

  return function (arg) {
    let key;

    if (typeof arg === "function") {
      if (arg[myKey]) {
        key = arg[myKey];
      } else {
        // functions are objects so we can modify them like we would do objects
        arg[myKey] = Symbol();
        key = arg[myKey];
      }
    } else {
      key = JSON.stringify(arg);
    }

    if (cache.has(key)) {
      // use from cache
      console.log("uses cache");
      return cache.get(key);
    }

    const result = func(arg);

    cache.set(key, result);

    return result;
  };
}

function myCb(num) {
  return num + 6;
}

function myCb2(num) {
  return num + 2;
}

function funcToMemoize(cb) {
  return cb(4);
}

const memoizedFunction = memoize(funcToMemoize);

console.log(memoizedFunction(myCb));
console.log(memoizedFunction(myCb));
console.log(memoizedFunction(myCb2));
