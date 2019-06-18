# jquery-simple-toggle

A jquery plugin for simple togglable panels.

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
<div id="panel">
  <div name="menu1">panel1</div>
  <div name="menu2">panel2</div>
  <div name="menu3">panel3</div>
</div>
```

Then run:

```javascript
$('#menu').simpleToggle({
  panelContainer: '#panel'
});
```

### Options

Change selector for menus and paneles:

```javascript
$('#menu').simpleToggle({
  ...
  menu: '[href]',
  menuAttr: 'href'
  panel: '[name]',
  panelAttr: 'name'
});
```

Store current panel in the web storage:

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
}).on('panel:show', function(e, $panel) {
  ...
}).on('panel:hide', function(e, $panel) {
  ...
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
