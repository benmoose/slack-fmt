import * as mocha from 'mocha'
import { expect } from 'chai'

import { prepareString, safeParseStrictJson } from './'

describe('test prepareString', function () {
  it('should strip quotes and whitespace', function () {
    const text = ' \t"foo\'      \n\t  '
    expect(prepareString(text)).to.equal('foo')
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
