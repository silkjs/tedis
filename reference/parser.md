```js
function createRequestString() {
  var length = arguments.length;
  var request = '*' + length + '\r\n';
  for (var i = 0; i < length; i++) {
    if (typeof arguments[i] === 'string') {
      request += '$' + arguments[i].length + '\r\n' + arguments[i] + '\r\n';
    } else {
      var string = '' + arguments[i];
      request += '$' + string.length + '\r\n' + string + '\r\n';
    }
  }
  return request;
};

function encode(request: any, encodeArray: boolean = true) {
  if (request === null) {
    return '$-1\r\n'
  }
  if (Array.isArray(request) && encodeArray) {
    const content = [`*${request.length}\r\n`]
    for (let i = 0, length = request.length; i < length; i++) {
      content.push(encode(request[i], false))
    }
    return content.join('')
  }
  let value
  if (typeof request === 'object' || typeof request === 'function') {
    value = {}.toString.call(request)
  } else {
    value = String(request)
  }
  return `$${value.length}\r\n${value}\r\n`
}
```

```js
export function decodeProgressive(content: Buffer, startIndex: number): { index: number, value: any } {
  let currentIndex = startIndex
  const type = content.toString('utf8', currentIndex, currentIndex + 1)
  // +1 because type takes 1 character
  currentIndex++

  if (type === '*') {
    // Array
    const lengthEnd = content.indexOf('\r\n', currentIndex)
    const length = parseInt(content.toString('utf8', currentIndex, lengthEnd), 10)
    // +2 because of \r\n after length ends
    currentIndex = lengthEnd + 2

    const value = []
    for (let i = 0; i < length; i++) {
      const entry = decodeProgressive(content, currentIndex)
      currentIndex = entry.index
      value.push(entry.value)
    }
    return { index: currentIndex, value }
  }

  if (type === '$') {
    // String or Null
    const lengthEnd = content.indexOf('\r\n', currentIndex)
    const length = parseInt(content.toString('utf8', currentIndex, lengthEnd), 10)
    // +2 because of \r\n after length ends
    currentIndex = lengthEnd + 2

    let value
    if (length === -1) {
      // Null
      value = null
    } else {
      // String
      value = content.toString('utf8', currentIndex, currentIndex + length)
      // +2 because of \r\n at the end of string
      currentIndex += length + 2
    }

    return { index: currentIndex, value }
  }

  if (type === '+') {
    // Simple string
    const valueEnd = content.indexOf('\r\n', currentIndex)
    const value = content.toString('utf8', currentIndex, valueEnd)
    // +2 because of \r\n at the end of simple string
    currentIndex = valueEnd + 2

    return { index: currentIndex, value }
  }

  if (type === ':') {
    // Integer
    const valueEnd = content.indexOf('\r\n', currentIndex)
    const value = parseInt(content.toString('utf8', currentIndex, valueEnd), 10)
    // +2 because of \r\n at the end of simple string
    currentIndex = valueEnd + 2

    return { index: currentIndex, value }
  }

  if (type === '-') {
    // Error
    const valueEnd = content.indexOf('\r\n', currentIndex)
    const value = content.toString('utf8', currentIndex, valueEnd)
    throw new Error(value)
  }

  throw new Error('Malformed Input')
}

export function *decodeGen(givenContent: Buffer | string): Generator<any, void, void> {
  let index = 0
  const content = Buffer.from(givenContent)

  for (;;) {
    const entry = decodeProgressive(content, index)
    index = entry.index
    yield entry.value
    if (index === content.length) {
      // We have read it all!
      break
    }
  }
}

export function decode(givenContent: Buffer | string): Array<any> {
  let index = 0
  const value = []
  const content = Buffer.from(givenContent)

  for (;;) {
    const entry = decodeProgressive(content, index)
    index = entry.index
    value.push(entry.value)
    if (index === content.length) {
      // We have read it all!
      break
    }
  }

  return value
}
```
