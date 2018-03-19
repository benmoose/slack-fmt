import * as mocha from 'mocha'
import { expect } from 'chai'

import { prepareString, isStrictJson } from './'

describe('test prepareString', function () {
  it('should strip quotes and whitespace', function () {
    const text = ' \t"foo\'      \n\t  '
    expect(prepareString(text)).to.equal('foo')
  })
})

describe('test isStrictJson', function () {
  it('should return true if given strict JSON', function () {
    const json = '{"a": [false, true, 6.4, 100, "foo"]}'
    expect(isStrictJson(json)).to.equal(true)
  })
  it('should return false if given relaxed JSON', function () {
    const json = 'foo: \'bar\''
    expect(isStrictJson(json)).to.equal(false)
  })
  it('should return false if given invalid JSON', function () {
    const json = '[&49.o'
    expect(isStrictJson(json)).to.equal(false)
  })
})
