# 手写promise

## promise（类实现）

```js
class MyPromise {
  state = 'pending';
  value = undefined;
  reason = undefined;
  resolveCallbacks = [];
  rejectCallbacks = [];

  constructor (fn) {
    const resolveHandler = (value) => {
      setTimeout(() => {
        if (this.state === 'pending') {
          this.state = 'fulfilled';
          this.value = value;
          this.resolveCallbacks.forEach(fn => fn(value));
        }
      })
    }
    const rejectHandler = (reason) => {
      setTimeout(() => {
        if (this.state === 'pending') {
          this.state = 'rejected';
          this.reason = reason;
          this.rejectCallbacks.forEach(fn => fn(reason));
        }
      })
    }
    try {
      fn(resolveHandler, rejectHandler)
    } catch (error) {
      rejectHandler(error)
    }
  }

  then(fn1, fn2) {
    fn1 = typeof fn1 === 'function' ? fn1 : (v) => v;
    fn2 = typeof fn2 === 'function' ? fn2 : (e) => e;
    if (this.state === 'pending') {
      return new MyPromise((resolve, reject) => {
        this.resolveCallbacks.push(() => {
          try {
            const newValue = fn1(this.value)
            resolve(newValue)
          } catch (error) {
            reject(error)
          }
        })
        this.rejectCallbacks.push(() => {
          try {
            const newReason = fn2(this.reason);
            reject(newReason)
          } catch (error) {
            reject(error);
          }
        })
      })
    }
    if (this.state === 'fulfilled') {
      return new MyPromise((resolve, reject) => {
        try {
          const newValue = fn1(this.value);
          resolve(newValue);
        } catch (error) {
          reject(error)
        }
      })
    }
    if (this.state === 'rejected') {
      return new MyPromise((resolve, reject) => {
        try {
          const newReason = fn2(this.reason);
          reject(newReason);
        } catch (error) {
          reject(newReason);
        }
      })
    }
  }

  catch(fn) {
    return this.then(null, fn); 
  }

  finally(fn) {
    return this.then(
      value => MyPromise.resolve(fn()),
      error => MyPromise.resolve(fn())
      )
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    })
  }
  
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  
  static all(promiseList) {
    return new MyPromise((resolve, reject) => {
      const result = [];
      const length = promiseList.length;
      let count = 0;
      promiseList.forEach((p, index) => {
        p.then(data => {
          result[index] = data;
          count++;
          if (count === length) {
            resolve(result)
          }
        }).catch((error) => {
          reject(error)
        })
      })
    })
  }

  static race(promiseList) {
    return new MyPromise((resolve, reject) => {
      let resolved = false;
      promiseList.forEach(p => {
        p.then(
          data => {
            if (!resolved) {
              resolve(data);
              resolved = true;
            }
          },
          error => {
            reject(error)
          })
      })
    })
  }

  static any(promiseList) {
    return new MyPromise((resolve, reject) => {
      const result = [];
      const length = promiseList.length;
      let count = 0;
      promiseList.forEach((p, index) => {
        p.then(
          data => {
            resolve(data);
          },
          error => {
            result[index] = error;
            count++;
            if (count === length) {
              reject(result)
            }
          })
      })
    })
  }

  static allSettled(promiseList) {
    return new MyPromise((resolve, reject) => {
      const result = [];
      const length = promiseList.length;
      let count = 0;
      promiseList.forEach((p, index) => {
        p.then(
          data => {
            result[index] = {
              status: 'fulfilled',
              value: data
            };
            count++
            if (count === length) {
              resolve(result)
            }
          },
          error => {
            result[index] = {
              status: 'rejected',
              value: error
            }
            count++;
            if (count === length) {
              reject(result)
            }
          })
      })
    })
  }
}
```

- **测试then、catch、finally方法**

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyPromise</title>
  </head>
  <body>
    <h1>MyPromise</h1>
    <script src="./MyPromise.js"></script>
    <script>
      const p = new MyPromise((resolve, reject) => {
        // resolve(100)
        throw new Error('错误信息')
      })
      p.then(data => {
        console.log('data', data)
      }).catch(error => {
        console.log('error', error)
      }).finally(res => {
        console.log('finally')
      })
      console.log('p', p);
    </script>
  </body>
</html>
```

- **测试Promise.all()方法**

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyPromise</title>
  </head>
  <body>
    <h1>MyPromise</h1>
    <script src="./MyPromise.js"></script>
    <script>
      const p1 = new MyPromise((resolve, reject) => {
          setTimeout(() => {
              resolve(100)
          }, 1000)
      })
      const p2 = MyPromise.resolve(200)
      const p3 = MyPromise.resolve(300)
      const p4 = MyPromise.reject('错误信息...')
      const promiseList = [p1, p2, p3, p4];
      console.log(MyPromise.all(promiseList));
    </script>
  </body>
</html>
```

- **测试Promise.race()方法**

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyPromise</title>
  </head>
  <body>
    <h1>MyPromise</h1>
    <script src="./MyPromise.js"></script>
    <script>
      const p1 = new MyPromise((resolve, reject) => {
          setTimeout(() => {
              resolve(100)
          }, 1000)
      })
      const p4 = MyPromise.reject('错误信息...')
      const p2 = MyPromise.resolve(200)
      const p3 = MyPromise.resolve(300)
      const promiseList = [p1, p2, p3, p4];
      console.log(MyPromise.race(promiseList));
    </script>
  </body>
</html>
```

- **测试Promise.any()方法**

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyPromise</title>
  </head>
  <body>
    <h1>MyPromise</h1>
    <script src="./MyPromise.js"></script>
    <script>
      const p1 = new MyPromise((resolve, reject) => {
          setTimeout(() => {
            reject(100)
          }, 1000)
      })
      const p4 = MyPromise.reject('错误信息...')
      const p2 = MyPromise.reject(200)
      const p3 = MyPromise.reject(300)
      const promiseList = [p1, p2, p3, p4];
      console.log(MyPromise.any(promiseList));
    </script>
  </body>
</html>
```

- **测试Promise.allSettled()方法**

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyPromise</title>
  </head>
  <body>
    <h1>MyPromise</h1>
    <script src="./MyPromise.js"></script>
    <script>
      const p1 = new MyPromise((resolve, reject) => {
          setTimeout(() => {
            reject(100)
          }, 1000)
      })
      const p4 = MyPromise.reject('错误信息...')
      const p2 = MyPromise.reject(200)
      const p3 = MyPromise.reject(300)
      const promiseList = [p1, p2, p3, p4];
      console.log(MyPromise.allSettled(promiseList));
    </script>
  </body>
</html>
```