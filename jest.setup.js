import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock Web APIs
class MockRequest {
  constructor(input, init = {}) {
    this.url = input.toString()
    this._body = init.body
  }

  async json() {
    return JSON.parse(this._body)
  }
}

class MockResponse {
  constructor(body, init = {}) {
    this._body = body
    this.status = init.status || 200
    this.statusText = init.statusText || ''
    this.ok = init.status ? init.status >= 200 && init.status < 300 : true
    this.headers = new Headers(init.headers)
  }

  async json() {
    return this._body
  }
}

class MockHeaders {
  constructor(init = {}) {
    this._headers = new Map()
    if (init) {
      Object.entries(init).forEach(([key, value]) => {
        this._headers.set(key.toLowerCase(), value)
      })
    }
  }

  append(name, value) {
    this._headers.set(name.toLowerCase(), value)
  }

  delete(name) {
    this._headers.delete(name.toLowerCase())
  }

  get(name) {
    return this._headers.get(name.toLowerCase()) || null
  }

  has(name) {
    return this._headers.has(name.toLowerCase())
  }

  set(name, value) {
    this._headers.set(name.toLowerCase(), value)
  }

  entries() {
    return this._headers.entries()
  }

  keys() {
    return this._headers.keys()
  }

  values() {
    return this._headers.values()
  }

  forEach(callback) {
    this._headers.forEach(callback)
  }
}

global.Request = MockRequest
global.Response = MockResponse
global.Headers = MockHeaders
global.fetch = jest.fn()
