import * as mocha from 'mocha'
import { expect } from 'chai'

import { parseJsonString, parseMessageArgs } from './'

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
    expect(actual).to.have.all.keys('indent', 'type', 'text', 'tag')
  })
  it('should return default args', function () {
    const msg = 'foo: bar'
    const expected = {
      indent: 2,
      text: 'foo: bar'
    }
    const actual = parseMessageArgs(msg)
    expect(actual).to.include(expected)
  })
  it('should return correct args with -i flag', function () {
    const msg = '-i 4 [{foo: bar}, {baz: bim}]'
    const expected = {
      indent: 4,
      text: '[{foo: bar}, {baz: bim}]'
    }
    const actual = parseMessageArgs(msg)
    expect(actual).to.include(expected)
  })
  it('should return correct args with --indent flag', function () {
    const msg = '--indent 8 a: b, c: d'
    const expected = {
      indent: 8,
      text: 'a: b, c: d'
    }
    const actual = parseMessageArgs(msg)
    expect(actual).to.include(expected)
  })
  it('should return correct args with floating point indent', function () {
    const msg = '-i 1.598 {"a": "b", "c": ["d", "e", "f"]}'
    const expected = {
      indent: 1,
      text: '{"a": "b", "c": ["d", "e", "f"]}'
    }
    const actual = parseMessageArgs(msg)
    expect(actual).to.include(expected)
  })
  it('should return correct args with -t flag', function () {
    const msg = '-t request foo:bar'
    const expected = {
      indent: 2,
      tag: 'request'
    }
    const actual = parseMessageArgs(msg)
    expect(actual).to.include(expected)
  })
})
