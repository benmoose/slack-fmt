import * as mocha from 'mocha'
import { expect } from 'chai'

import { prepareString } from './'

describe('test prepareString', function () {
  it('should strip quotes and whitespace', function () {
    const text = ' \t"foo\'      \n\t  '
    expect(prepareString(text)).to.equal('foo')
  })
})
