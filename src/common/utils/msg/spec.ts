import { expect } from 'chai'

import { formatAsCodeBlock } from './'

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
