# Carrot Framework for Web Apps

Carrot Framework is a tool designed to support various functions for web applications.

## Introduction

Carrot-Framework-Web is a web application JavaScript support tool designed to enhance the development process by providing a variety of utility functions

`Carrot.js` is the main file of this framework. It initializes the framework and provides global access to its functionalities.

### Initialization

Clone the project into your project and pay attention to the path, you should not change the structure or name of the `Carrot-Framework-Web` folder

```javascript
<script src="Carrot-Framework-Web/Carrot.js"></script>
```

### Global Variable
```javascript
$(document).ready(function(){
    cr.onLoad();
});
```

## Methods

Here is a list of key methods that can be quickly integrated into your web building process

### loadJs
`cr`.loadJs(path_js, obj_call, func_call = "show")

Dynamically loads a JavaScript file and executes a specified function.
- `path_js`: Path to the JavaScript file.
- `obj_call`: Object to call the function on.
- `func_call`: Name of the function to call (default is "show").

```javascript
cr.loadJs('path/to/script.js', window, 'initialize');
```

### add_btn_top
Adds a button at the top of the web app.

```javascript
    cr.add_btn_top();
```

### paste
Pastes the content.

```javascript
    var emp="#input_val";
    cr.paste(emp);
```

### cr.copy(emp)
Copies the content.

### cr.share(url='', title='', tip='Get Now')
Shares the specified URL with an optional title and tip.

### cr.limitItem(array, length)
Limits the number of items in an array to the specified length.

### cr.shuffle(array)
Shuffles the items in an array randomly.

### cr.get_random(list)
Returns a random item from the list.

### cr.showSearch(act_done=null)
Displays the search bar and returns the search key.

### cr.arg(sParam)
Returns `false` if the specified URL parameter does not exist.

### cr.go_to(emp, act_start=null, act_done=null)
Navigates to the specified element with optional start and done actions.

### cr.top(act_start=null, act_done=null)
Similar to `cr.go_to`, but navigates to the top.

### cr.get(url, act_done=null, act_fail=null)
Fetches HTML data from the specified URL with optional done and fail actions.

### cr.show_pay(name_item='Test item', tip='Please start paying to use the corresponding function', price_item='2.00', val='', type='link')
Displays a payment prompt with the specified item name, tip, price, value, and type.

### cr.show_setting(act_done=null, html_extension='')
Displays settings with optional done action and HTML extension.

### cr.set_color_active(color)
Sets the active color.

### cr.set_color_btn(color)
Sets the button color.

### cr.setColor(color)
Sets the color.

### cr.setSiteName(name)
Sets the site name.

### cr.setSiteUrl(url)
Sets the site URL.

### cr.setVer(ver)
Sets the version to avoid cache memory issues.

## Data Carrot
Data for web
