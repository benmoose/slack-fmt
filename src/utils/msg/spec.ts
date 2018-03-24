import * as mocha from 'mocha'
import { expect } from 'chai'

import { formatMessageText } from './'

describe('test formatAsCodeBlock', function () {

  it('should return wrapped in code block markdown', function () {
    const expected = {
      single: '```abc d+```',
      multi: '\`\`\`Line 1\nLine 2\`\`\`'
    }
    expect(formatMessageText('abc d+')).to.equal(expected.single)
    expect(formatMessageText(`Line 1\nLine 2`)).to.equal(expected.multi)
  })
  it('should return code block with tag', function () {
    const expected = (
`*tag*
\`\`\`code block\`\`\``
    )
    expect(formatMessageText('code block', 'tag')).to.equal(expected)
  })
})
