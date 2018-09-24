import * as mocha from 'mocha'
import { expect } from 'chai'

import { parseJsonString, parseMessageArgs, safeParseStrictJson } from './'

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

describe('test parseMessageArgs', function () {
  it('should always return an object with IArgument keys', function () {
    const actual = parseMessageArgs('')
    expect(actual).to.have.all.keys('spaces', 'type', 'text')
  })
  it('should return correct args (1)', function () {
    const msg = 'foo: bar'
    const expected = {
      spaces: 2,
      type: 'json',
      text: 'foo: bar'
    }
    const actual = parseMessageArgs(msg)
    expect(actual).to.deep.equal(expected)
  })
  it('should return correct args (2)', function () {
    const msg = '4 [{foo: bar}, {baz: bim}]'
    const expected = {
      spaces: 4,
      type: 'json',
      text: '[{foo: bar}, {baz: bim}]'
    }
    const actual = parseMessageArgs(msg)
    expect(actual).to.deep.equal(expected)
  })
  it('should return correct args (3)', function () {
    const msg = '10 a: b, c: d'
    const expected = {
      spaces: 10,
      type: 'json',
      text: 'a: b, c: d'
    }
    const actual = parseMessageArgs(msg)
    expect(actual).to.deep.equal(expected)
  })
  it('should return correct args (4)', function () {
    const msg = '0{"a": "b", "c": ["d", "e", "f"]}'
    const expected = {
      spaces: 0,
      type: 'json',
      text: '{"a": "b", "c": ["d", "e", "f"]}'
    }
    const actual = parseMessageArgs(msg)
    expect(actual).to.deep.equal(expected)
  })
})

describe('test safeParseStrictJson', function () {
  it('should return pased JSON if given strict JSON', function () {
    const json = '{"a": [false, true, 6.4, 100, "foo"]}'
    expect(safeParseStrictJson(json)).to.deep.equal(JSON.parse(json))
  })
  it('should return null if given relaxed JSON', function () {
    const json = 'foo: \'bar\''
    expect(safeParseStrictJson(json)).to.be.null
  })
  it('should return null if given invalid JSON', function () {
    const json = '[&49.o'
    expect(safeParseStrictJson(json)).to.be.null
  })
})
