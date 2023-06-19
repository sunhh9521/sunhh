function debounce(fn, delay) {
  let timer = null;
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay)
  }
}

let input = document.getElementById("input1");
input.addEventListener('keyup', debounce(() => {
  console.log(input.value)
}, 1000))