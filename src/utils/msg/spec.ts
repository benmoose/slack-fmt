import * as mocha from 'mocha'
import { expect } from 'chai'

import { formatAsCodeBlock, parseMessageArgs } from './'

describe('test formatAsCodeBlock', function () {
  it('should return wrapped in code block markdown', function () {
    const expected = {
      single: '```code block```',
      multi: `\`\`\`Line 1\nLine 2\`\`\``
    }
    expect(formatAsCodeBlock('code block')).to.equal(expected.single)
    expect(formatAsCodeBlock(`Line 1\nLine 2`)).to.equal(expected.multi)
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
