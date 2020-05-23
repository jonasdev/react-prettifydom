# React PrettifyDOM

Inline styling is not pretty. But it is fast. Faster than making classnames in external CSS files and setting the class attribute, for small pieces of CSS declarations. It is also a good way to quickly overrule heavy CSS selectors. But it makes the DOM looks messy. 

PrettifyDOM takes all the inline styling, create a unique class, removes the style attribute and adds an embedded stylesheet with all the new css.

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
<div className="container" style={{ display: 'flex', background: 'red' }}>
  <h1 style={{ fontStyle: 'italic', color: 'orange' }}>
    Hello 
    <span style={{ color: 'purple' }}>world!</span>
  </h1>
</div>
```
With `<PrettifyDOM customClassName="myapp"/> //pdom as default` you can see in DevTools the elements will now looks something like this

````
// With <PrettifyDOM />
<div class="container myapp_af34ds">
  <h1 class="myapp_fg5ds">
    Hello
    <span class="myapp_kj8wd">world!</span>
</div>

// Without <PrettifyDOM />
<div class="container" style="background: red">
  <h1 style="font-style: italic; color: orange">
    Hello
    <span style="color: purple">world!</span>
</div>
````


This will only work with static style attributes. If you are (not recommended) doing like this 

````
<div style={active ? {color: 'blue'} : {color: 'red'}} />

//or 

onClick = () => element.style.color = "red"
````

you will see the inline styling in the DOM. This is because it only listen to child and subtree changes from the body element.

It is possible to listening on attribute changes. But, it will mess up element styling using DevTools, since it can't tell where the inline styling is made. We don't wanna lose that option.




## License
[MIT](https://choosealicense.com/licenses/mit/)