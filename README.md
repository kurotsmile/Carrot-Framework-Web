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

> `cr`.**paset**(emp)

- Parameters
	- `emp` (string): The element from which the content will be paste.

```javascript
    var emp="#input_val";
    cr.paste(emp);
```

### copy

Copies the content.

> `cr`.**copy**(emp)

- Parameters
	- `emp` (string): The element from which the content will be copied.

```javascript
    cr.copy("#input_va");
```

### share

Shares the specified URL with an optional title and tip.

> `cr`.**share**(url='', title='', tip='Get Now')

- Parameters
	- `url` (string): The URL to share.
	- `title` (string): The title of the share content.
	- `tip` (string): The tip for the share action.

```javascript
//Share url current 
cr.share(); 

//Share link customer 
cr.share('http://example.com');

//Share link extended 
cr.share('http://example.com','Web Example','Visit now');

```


### limitItem

Limits the number of items in an array to the specified length.

> `cr`.**limitItem**(array, length)

- Parameters
	- `array` (Array):  The array to limit.
	- `length` (number): The maximum number of items.

### shuffle

Shuffles the items in an array randomly.

> `cr`.**shuffle*(array)

Parameters
	- `array` (Array):  The array to zhuffles.

### get_random

Returns a random item from the array.

> `cr`.**get_random**(array)

Parameters
	- `array` (Array):  The list from which to get a random item.

### showSearch

Displays the search bar and returns the search key.

> `cr`.**showSearch*(act_done=null)

- Parameters:
	- `act_done` (function): The callback function when the search is done.

### arg

Returns `false` if the specified URL parameter does not exist.

> `cr`.**arg**(sParam)

- Parameters:
	- `sParam` (string): The URL parameter to check.

### go_to

Navigates to the specified element with optional start and done actions.

> `cr`.**go_to**(emp, act_start=null, act_done=null)

- Parameters:
	- `emp` (string): The element to navigate to.
	- `act_start` (function): The callback function when the action starts.
	- `act_done` (function): The callback function when the action is done.

### top

Similar to `cr.go_to`, but navigates to the top.

> cr.top(act_start=null, act_done=null)

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

## Register SSL For IIS

- 1 Đăng ký SSL cho máy chủ IIS window

Chạy file `Register SSL For IIS.ps1` ở trong dự án rồi nhập host name (ví dụ `abc.store.com`)

- 2 Xuất bản file chứng chỉ 

sau khi đã tạo chững chỉ bạn cần xuất file chứng chỉ từ Admin tool và nhập vào trình chứng chỉ của IIS

Xuất bản chứng chỉ từ chương trình quảng lý chứng chỉ window

Chạy chương trình từ cửa sổ run gõ 

> certlm.msc

- 3 Nhập và khởi chạy chổng 443 cho giao thức https từ IIS manager

