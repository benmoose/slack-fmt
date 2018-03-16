# Slack Fmt

> [View on Slack](https://moosesandbox.slack.com/apps/A9QSW4XSB-fmt?page=1)
or [Install](https://16el4ez0sg.execute-api.eu-west-2.amazonaws.com/dev/oauth/direct-install) to your workspace

**Fmt** is a helpful Slack bot for formatting JSON messages 🙃

Slash command `/fmt [spaces] json`.

### Usage

Simply type
```
/fmt {"people": [{"name": "Ben"}, {"name": "Sam"}, {"name": "Rebecca"}]}
```

and **Fmt** will respond with the JSON properly formatted.

```
{
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
}
```

By default **Fmt** will indent with two spaces. To change this, just enter the number of spaces you'd prefer before the JSON string.

```
/fmt 4 {"a": ["one", "two", "three", "four"]}

{
    "a": [
        "one",
        "two",
        "three",
        "four"
    ]
}
```

**Fmt** can also handle relaxed JSON, thanks to the [jsonic](https://github.com/rjrodger/jsonic) library.

You can find the rules for relaxed JSON [here](https://github.com/rjrodger/jsonic), but they are repeated below too.

  * You don't need to quote property names: `{ foo:"bar baz", red:255 }`
  * You don't need the top level braces: `foo:"bar baz", red:255`
  * You don't need to quote strings with spaces: `foo:bar baz, red:255`
  * You _do_ need to quote strings if they contain a comma or closing brace or square bracket: `icky:"_,}]_"`
  * You can use single quotes for strings: `Jules:'Cry "Havoc," and let slip the dogs of war!'`
  * You can have trailing commas: `foo:bar, red:255, `

For example

```
/fmt cats: [socks, spice, scratch, mister purrfect]

{
  "cats": [
    "socks",
    "spice",
    "scratch",
    "mister purrfect"
  ]
}
```

```
/fmt 4 cast: [{name: Belinda Blumenthal, job: Worldwide Sales Director of Steele's Pots & Pans}, {name: Ken Dewsbury, job: Central and Northern England RSM }]

{
    "cast": [
        {
            "name": "Belinda Blumenthal",
            "job": "Worldwide Sales Director of Steele's Pots & Pans"
        },
        {
            "name": "Ken Dewsbury",
            "job": "Central and Northern England RSM"
        }
    ]
}
```
