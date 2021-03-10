let p = new Promise((resolve, reject) => {
  let a = 1 + 1;
  if (a == 2) {
    resolve("success");
  } else {
    reject("failed");
  }
});

//anything inside .then will run for resolve // if x happen, then you are going to do this next
console.log(p);
