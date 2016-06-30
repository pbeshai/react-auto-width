# react-auto-width
A React component to set the width of a child component to its parent's width

### Install

Install via NPM

```
npm install react-auto-width --save-dev
```


### Example Usage

To provide the `width` prop to **MyComponent** based on the width of its parent container, do the following:

```js
<AutoWidth>
 <MyComponent />
</AutoWidth>
```

### AutoWidth props

- `debounceTime` {Number} The amount of delay between debounced calls (default: 100)
- `defaultRenderWidth` {Number} If set, the default width is set to this value and the child is
    rendered. If null, the child is not rendered until a width is provided (default: null)
- `parentMayResize` {Boolean} If true, the component checks on componentDidUpdate to see
    if it needs to resize (default: false)


## Developing

To compile the component with babel, run

```
npm run build
```
