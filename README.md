# React PrettifyDOM

Inline styling is not pretty. But it is fast. Faster than making classnames in external CSS files and setting the class attribute, for small pieces of CSS declarations. It is also a great way to overrule heavy CSS selectors. But it makes the DOM looks messy. 

PrettifyDOM takes all the inline styling, creates a unique class for each, removes style attributes and adds one embedded stylesheet with the CSS.

## Installation

```bash
npm install react-prettifydom
```

## Usage

```
//...
import PrettifyDOM from 'react-prettifydom'

ReactDOM.render(
  <PrettifyDOM>
    <App />
  </PrettifyDOM>,
  document.getElementById("root")
);
```
## Example
JSX:
```
<div className="container" style={{ width: '100vw', background: 'red' }}>
  <h1 style={{ textAlign: 'center', fontStyle: 'italic', color: 'orange' }}>
    Hello world!
  </h1>
</div>
```
With `<PrettifyDOM customClassName="myapp"/> //pdom as default` you can see in DevTools the elements will now looks something like this

````
// With <PrettifyDOM />
<div class="container myapp_af34ds">
  <h1 class="myapp_fg5ds">
    Hello world!
  </h1>  
</div>

// Without <PrettifyDOM />
<div class="container" style="width: 100vw; background: red">
  <h1 style="text-align: center; font-style: italic; color: orange">
    Hello world!
  </h1>
</div>
````


This will only work with static style attributes. If you are doing like this (not recommended):

````
<div style={{ color: active ? 'blue' : 'red' }} />

//or 

onClick = () => element.style.color = "red"
````

you will see the inline style for that element. This is because it only listen to child and subtree changes from the body element.

It is possible listening on attribute changes. But, it will mess up element styling using DevTools, since it can't tell where the inline styling is made. We don't wanna lose that option.




## License
[MIT](https://choosealicense.com/licenses/mit/)
