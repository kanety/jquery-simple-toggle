# jquery-simple-toggle

A jquery plugin for simple toggle boxes.

## Dependencies

* jquery

## Installation

Install from npm:

    $ npm install @kanety/jquery-simple-toggle --save

## Usage

Build html as follows:

```html
<div id="menu">
  <a href="#menu1">menu1</a>
  <a href="#menu2">menu2</a>
  <a href="#menu3">menu3</a>
</div>
<div id="box">
  <div name="menu1">box1</div>
  <div name="menu2">box2</div>
  <div name="menu3">box3</div>
</div>
```

Then run:

```javascript
$('#menu').simpleToggle({
  boxContainer: '#box'
});
```

### Options

Change selector for menus and boxes:

```javascript
$('#menu').simpleToggle({
  ...
  menuSelector: '[href]',
  menuAttr: 'href'
  boxSelector: '[name]',
  boxAttr: 'name'
});
```

Store current box in the web storage:

```javascript
$('#menu').simpleToggle({
  ...
  store: 'session',
  storeKey: 'YOUR_STORAGE_KEY'
});
```

### Callbacks

```javascript
$('#menu').simpleToggle({
  ...
}).on('toggle:show', function(e, $box) {
  ...
}).on('toggle:hide', function(e, $box) {
  ...
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
