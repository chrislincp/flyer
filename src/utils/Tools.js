export function typeOf(obj) {
  const { toString } = Object.prototype
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  return map[toString.call(obj)]
}

export function cloneDeep(data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(cloneDeep(data[i]))
    }
  } else if (t === 'object') {
    for (const i in data) {
      o[i] = cloneDeep(data[i])
    }
  }
  return o
}

export function isNumber(val) {
  return !Number.isNaN(Number(val))
}

export function appendZero(val) {
  if (val < 10) {
    return `0${val}`
  }
  return val
}
