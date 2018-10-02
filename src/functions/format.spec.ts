import { expect } from 'chai'
import { formatJson } from './format'

describe('test formatJson', function () {
  it('should handle empty message', function () {
    const body = {
      text: ''
    }
    const expected = {
      response_type: 'in_channel',
      text: '```null```'
    }

    expect(formatJson(body)).to.deep.equal(expected)
  })
  it('should handle message with double quotes', function () {
    const body = {
      text: 'foo: "Hello World"'
    }
    const expected = {
      response_type: 'in_channel',
      text: `\`\`\`{
  "foo": "Hello World"
}\`\`\``
    }

    expect(formatJson(body)).to.deep.equal(expected)
  })

  it('should handle strict json', function () {
    const body = {
      text: '{"people": [{"name": "Ben"}, {"name": "Sam"}, {"name": "Rebecca"}]}'
    }
    const expected = {
      response_type: 'in_channel',
      text: `\`\`\`{
  "people": [
    {
      "name": "Ben"
    },
    {
      "name": "Sam"
    },
    {
      "name": "Rebecca"
    }
  ]
}\`\`\``
    }

    expect(formatJson(body)).to.deep.equal(expected)
  })

  it('should handle loose json', function () {
    const body = {
      text: 'cats: [socks, spice, scratch, mister purrfect]'
    }
    const expected = {
      response_type: 'in_channel',
      text: `\`\`\`{
  "cats": [
    "socks",
    "spice",
    "scratch",
    "mister purrfect"
  ]
}\`\`\``
    }

    expect(formatJson(body)).to.deep.equal(expected)
  })
})
