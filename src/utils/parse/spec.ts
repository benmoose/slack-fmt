import * as mocha from 'mocha'
import { expect } from 'chai'

import { parseJsonString } from './'

describe('test parseJsonString', function () {
  it('should parse strict JSON string to js object (1)', function () {
    const actual = parseJsonString('{"a": [1, 2, 3]}')
    const expected = {
      a: [1, 2, 3]
    }
    expect(actual).to.deep.equal(expected)
  })
  it('should parse strict JSON string to js object (2)', function () {
    const actual = parseJsonString('{"a": 5, "b": false}')
    const expected = {
      a: 5,
      b: false
    }
    expect(actual).to.deep.equal(expected)
  })
  it('should parse strict JSON string to js object (3)', function () {
    const actual = parseJsonString('null')
    const expected = null
    expect(actual).to.deep.equal(expected)
  })
  it('should parse relaxed JSON string to js object (1)', function () {
    const actual = parseJsonString('a: [1, 2, 3]')
    const expected = {
      a: [1, 2, 3]
    }
    expect(actual).to.deep.equal(expected)
  })
  it('should parse relaxed JSON string to js object (2)', function () {
    const actual = parseJsonString('"&": bar, 6: \'10,000\', f: [1,2,3.4,4]')
    const expected = {
      '&': 'bar',
      6: '10,000',
      f: [1, 2, 3.4, 4]
    }
    expect(actual).to.deep.equal(expected)
  })
  it('should throw SyntaxError when given invalid JSON (1)', function () {
    const msg = 'a, b, c, d'
    expect(() => parseJsonString(msg)).to.throw(SyntaxError)
  })
  it('should throw SyntaxError when given invalid JSON (2)', function () {
    const msg = 'a, b, c, d'
    expect(() => parseJsonString(msg)).to.throw(SyntaxError)
  })
  it('should throw SyntaxError when given invalid JSON (3)', function () {
    const msg = '{&p: 100}'
    expect(() => parseJsonString(msg)).to.throw(SyntaxError)
  })
})
