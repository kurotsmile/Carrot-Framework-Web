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

> `cr`.**top**(act_start=null, act_done=null)

- Parameters:
	- `act_start` (function): The callback function when the action starts.
	- `act_done` (function): The callback function when the action is done.

```javascript
	//Basic
	cr.top();

	//Full
	cr.top(()=>{
		alert("Action Start");
	},()=>{
		alert("End Scroll Done");
	});
```

### cr.get(url, act_done=null, act_fail=null)
Fetches HTML data from the specified URL with optional done and fail actions.

> `cr`.**get**(url, act_done=null, act_fail=null)



### set_color_active

Sets the active color.

> `cr`.**set_color_active**(color)

- Parameters:
	- `color` (string) ; Màu sắc cho các mục nỗi bật 

```javascript
	cr.set_color_active("#FFFFFF");
```

### set_color_btn

Sets the button color.

> `cr`.**set_color_btn**(color)

 - Parameters:
	- `color` (string) ; Màu sắc cho các nút và các công cụ điều khiển 

```javascript
	cr.set_color_btn("#00FF00");
```
### setColor
Sets the color.

> `cr`.**setColor**(color)

Phương thức này tương tự `cr`.**set_color_btn**

```javascript
	cr.setColor("#00FFFF");
```

### cr.setSiteName(name)
Sets the site name.

### cr.setSiteUrl(url)
Sets the site URL.

### cr.setVer(ver)
Sets the version to avoid cache memory issues.

## Data Carrot
Những phương thức sử lý và xây Dữ liệu cho web app

## getYouTubeVideoId

### UI Box
Những phương thức tích hợp giao diện để người dùng tương tác

## show_setting
Phương thức hiện hộp thoại tùy chỉnh cài đặt web với trường ngôn ngữ , kiểu dáng nút trở về đầu trang và bạn có thể thêm các trường tùy biến vào tham số **html_extension**

> `cr`.**show_setting**(act_done=null,html_extension='')

- Parameters:
	- `act_done` (function): Phương thức gọi lại khi bấm nút hoàn tất (ok) trong cửa sổ cài đặt 
		- Giá trị trả về (json) : data.lang

	- `html_extension` (string):Các trường html tùy biến thêm vào phần cài đặt

### show_pay
Displays a payment prompt with the specified item name, tip, price, value, and type.

> `cr`.**show_pay**(name_item='Test item', tip='Please start paying to use the corresponding function', price_item='2.00', val='', type='link')

- Parameters:
	- `name_item` (string) : Tên sản phẩm hoặc dịch vụ đơn hàng
	- `tip` (string) : Mô tả ngắn cho đơn hàng
	- `price_item` (float srting) : giá
	- `val` : tham số lưu lại giá trị đơn hàng thường dùng cho cách đơn hàng dịch vụ . Sau khi thanh toán thành công sẽ lưu lại dữ liệu cục bộ là `localStorage`.**setItem**(`type`,`val`)
	- `type` : truyền vào tham số khác với *link* nếu bạn muốn thiết lập đơn hàng cho chức năng tải file

```javascript
	//Buy nomal download link
	var name_file="lovestory.epub";
	cr.show_pay("Buy Book","Pay for download ebook file("+name_file+")","3.00","path/"+name_file);

	//Buy Service
	cr.show_pay("Buy Vip","Unlock func download ebooks file","all_ebook","type_user");
```

## show_youtube

## show_donation

### showSearch

Displays the search bar and returns the search key.

> `cr`.**showSearch*(act_done=null)

- Parameters:
	- `act_done` (function): The callback function when the search is done.


## Register SSL For IIS

- 1 Đăng ký SSL cho máy chủ IIS window

Chạy file `Register SSL For IIS.ps1` ở trong dự án rồi nhập host name (ví dụ `abc.store.com`)

- 2 Xuất bản file chứng chỉ 

sau khi đã tạo chững chỉ bạn cần xuất file chứng chỉ từ Management Console và nhập vào trình chứng chỉ của IIS

Xuất bản chứng chỉ từ chương trình quảng lý chứng chỉ window

Chạy chương trình từ cửa sổ run gõ 

> certlm.msc

- 3 Nhập và khởi chạy chổng 443 cho giao thức https từ IIS manager

 