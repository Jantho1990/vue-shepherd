class VueMap {
  constructor () {
    let obj = {
      _Map: new Map(),
      _timestamp: Date.now()
    }
    let proxy = new Proxy(obj, {
      get (target, prop, receiver) {
        console.log('landlords', prop, typeof Reflect.get(target._Map, prop))
        const value = Reflect.get(target._Map, prop)
        if (typeof value === 'function') {
          return function () {
            let args = arguments
            console.log('bbq', this)
            console.log('map', this._Map)
            console.log('args', args)
            let ret = target._Map[prop].apply(target._Map, [...args])
            target._timestamp = Date.now()
            return Date.now() && ret
          }
        }
        return target[prop]
      }
    })
    Object.defineProperty(proxy, '_ts', {
      value: 0,
      writable: true
    })
    return proxy
  }

  static forceUpdate (ts, val) {
    return ts && val
  }
}

export default VueMap
