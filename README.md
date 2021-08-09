# babel-plugin-named-stitches-classnames

Babel plugin to add displayName to your styled component

## Input

```js
let foo = styled('div', {});
```

## Output

```js
let foo = styled('div', {}, 'foo');
```

## Requirements

Currently, this plugin only works with [@LucasUnplugged's fork of Stitches](https://github.com/LucasUnplugged/stitches) (v0.2.3 or later), though hopefully that will change in the future.

## Installation

```sh
$ npm install babel-plugin-named-stitches-classnames
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["named-stitches-classnames"]
}
```

### Via CLI

```sh
$ babel --plugins named-stitches-classnames script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["named-stitches-classnames"],
});
```

## Acknowledgements

This plugin is adapted from [@babel/plugin-transform-stitches-display-name](https://github.com/afzalsayed96/babel-plugin-transform-stitches-display-name), which is itself adapted from [@babel/plugin-transform-react-display-name](https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-react-display-name).
