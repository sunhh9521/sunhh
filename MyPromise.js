class MyPromise {
  state = 'pendding';
  value = undefined;
  reason = undefined;
  resolveCallbacks = [];
  rejectCallbacks = [];

  constructor(fn) {
    const resolveHandle = (value) => {
      setTimeout(() => {
        if (this.state === 'pendding') {
          this.state = 'fulfilled';
          this.value = value;
          this.resolveCallbacks.forEach(fn => fn(value))
        }
      })
    }
    const rejectHandle = (error) => {
      setTimeout(() => {
        if (this.state === 'pendding') {
          this.state = 'rejected';
          this.reason = error;
          this.rejectCallbacks.forEach(fn => fn(error))
        }
      })
    }
    try {
      fn(resolveHandle, rejectHandle)
    } catch (error) {
      rejectHandle(error)
    }
  }

  then(fn1, fn2) {
    fn1 = typeof fn1 === 'function' ? fn1 : (v) => v;
    fn2 = typeof fn2 === 'function' ? fn2 : (e) => e;
    return new MyPromise((resolve, reject) => {
      if (this.state === 'pendding') {
        this.resolveCallbacks.push(() => {
          try {
            const newValue = fn1(this.value);
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
            reject(error)
          }
        })
      }
      if (this.state === 'fulfilled') {
        try {
          const newValue = fn1(this.value);
          resolve(newValue)
        } catch (error) {
          reject(error)
        }
      }
      if (this.state === 'rejected') {
        try {
          const newReason = fn2(this.reason);
          reject(newReason)
        } catch (error) {
          reject(error)
        }
      }
    })
  }

  catch(fn) {
    return this.then(null, fn)
  }

  finally(fn) {
    return this.then(
      value => MyPromise.resolve(fn()),
      error => MyPromise.resolve(fn())
    )
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value)
    })
  }

  static reject(error) {
    return new MyPromise((resolve, reject) => {
      reject(error)
    })
  }

  static all(promiseLise) {
    return new MyPromise((resolve, reject) => {
      let result = [];
      const length = promiseLise.length;
      let count = 0;
      promiseLise.forEach((p, index) => {
        p.then(data => {
            result[index] = data;
            count++;
            if (count === length) {
              resolve(result)
            }
          }).catch(error => {
            reject(error)
          }) 
      })
    })
  }

  static race(promiseLise) {
    return new MyPromise((resolve, reject) => {
      let returned = false;
      promiseLise.forEach(p => {
        p.then(
          data => {
            if (!returned) {
              resolve(data);
              returned = true
            }
          },
          error => {
            reject(error)
          }
        )
      })
    })
  }

  static any(promiseLise) {
    return new MyPromise((resolve, reject) => {
      let result = [];
      const length = promiseLise.length;
      let count = 0;
      promiseLise.forEach((p, index) => {
        p.then(
          data => {
            resolve(data)
          },
          error => {
            result[index] = error;
            count++;
            if (count === length) {
              reject(result)
            }
          }
        )
      })
    })
  }

  static allSettled(promiseLise) {
    return new MyPromise((resolve, reject) => {
      let result = [];
      const length = promiseLise.length;
      let count = 0;
      promiseLise.forEach((p, index) => {
        p.then(
          data => {
            result[index] = {
              state: 'fulfilled',
              value: data
            }
            count++;
            if (count === length) {
              resolve(result)
            }
          },
          error => {
            result[index] = {
              state: 'rejected',
              value: error
            }
            count++;
            if (count === length) {
              reject(result)
            }
          }
        )
      })
    })
  }
}