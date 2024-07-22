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

- [loadJs](#loadJs)
- [top](#top)
- [add_btn_top](#add_btn_top)
- [paste](#paste)
- [copy](#copy)
- [share](#share)
- [limitItem](#limitItem)
- [showSearch](#showSearch)
- [shuffle](#shuffle)
- [show_youtube](#show_youtube)
- [download](#download)

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

```javascript
	var code=["c#","javascript","java","c++","python","c"];
	cr.limitItem(code,2); //return c#,javascript,java
```

### shuffle

Shuffles the items in an array randomly.

> `cr`.**shuffle**(array)

- Parameters
	- `array` (Array):  The array to zhuffles.

### get_random

Returns a random item from the array.

> `cr`.**get_random**(array)

- Parameters
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

### get
Fetches HTML data from the specified URL with optional done and fail actions.

> `cr`.**get**(url, act_done=null, act_fail=null)

- Parameters:
	- `url` (string) : Địa chỉ hoặt đường dẫn tới trang web , tệp html.
	- `act_done` (function): Phương thức được gọi khi thành công và trả về dữ liệu của trang theo địa chỉ url
		- Giá trị trả về (html) : Dữ liệu trả về là dạng string html
	- `act_fail` (function): Phương thức được gọi khi quá trình tải gặp sự cố

```javascript
	cr.get("data/about.html",(data)=>{
		$("#container").html(data);
	},()=>{
		alert("Không thể tải tệp");
	});
```
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

> `cr`.**setSiteName**(name)

- Tham số
	- `name` (string) : Tên của web app, tham số này được áp dụng trong các trang pp và tos

```javascript
	cr.setSiteName("Music Store");
```

### cr.setSiteUrl(url)
Sets the site URL. giá trị này có thể áp dụng trong chức năng show_pp và show_tos

- Tham số
	- `url` (string) : url của website hoặt web app

```javascript
	cr.setSiteUrl("https://example.com");
```
### setVer
Sets the version to avoid cache memory issues.

> `cr`.***setVer***(ver)

- Tham số 
	- `ver` (stirng) : số phiên bản các file để tải lại các file trên trình duyện tránh sự lưu trữ tạm

```javascript
	cr.setVer("0.0.1");
```

### download

> `cr`.***download**(data,file_name,type_file='application/json');

- Tham số
	- `data` (string) : Dữ liệu cho file tải xuống. dữ liệu này sẽ được tự động chuyển đổi định dạng cho phù hợp với tham số `type_file`
	- `file_name` (string) : Tên tệp tải xuống
	- `type_file` (string) : Loại định dạng của file tải xuống
		- Text Media Types:
			- text/plain: Văn bản thuần (plain text)
			- text/html: HTML
			- text/css: CSS
			- text/javascript: JavaScript (có thể dùng application/javascript)
		- Image Media Types:

			- image/jpeg: JPEG hình ảnh
			- image/png: PNG hình ảnh
			- image/gif: GIF hình ảnh
			- image/webp: WebP hình ảnh
			- image/svg+xml: SVG hình ảnh
		- Audio Media Types:
			- audio/mpeg: MP3 âm thanh
			- audio/wav: WAV âm thanh
			- audio/ogg: Ogg âm thanh
			- audio/aac: AAC âm thanh
		- Video Media Types:
			- video/mp4: MP4 video
			- video/webm: WebM video
			- video/ogg: Ogg video
		- Application Media Types:
			- application/json: JSON dữ liệu
			- application/xml: XML dữ liệu
			- application/x-www-form-urlencoded: Dữ liệu biểu mẫu URL-encoded
			- application/octet-stream: Dữ liệu nhị phân
			- application/pdf: PDF tài liệu
			- application/zip: ZIP tập tin
		- Font Media Types:
			- font/woff: Web Open Font Format (WOFF)
			- font/woff2: Web Open Font Format 2 (WOFF2)
			- font/ttf: TrueType Font (TTF)
			- font/otf: OpenType Font (OTF)

## Data Carrot
Những phương thức sử lý và xây Dữ liệu cho web app

# UI Box
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

Hiện hộp thoại xem video youtube

> `cr`.**show_youtube**(link_ytb,html_extension="",act_done_show=null)

- tham số 
	- `link_ytb` (url) : url link youtube 
	-  `html_extension` : html chèn mở rộng thêm các tính năng cho hộp thoại
	-  `act_done_show` : phương thức được gọi để xử lý khi hộp thoại được bật

```javascript
	//Basic
	cr.show_youtube("https://youtu.be/lj9lCUGAQBY");

	//full
	var html_btn='<div id="all_btn"></div>';
	cr.show_youtube("https://youtu.be/lj9lCUGAQBY",html_btn,()=>{
		$("#all_btn").append('<button>Info</button>');
	});
```
## getYouTubeVideoId

Phương thức lấy ID của liên kết video youtube

## show_donation

### showSearch

Displays the search bar and returns the search key.

> `cr`.**showSearch*(act_done=null)

- Parameters:
	- `act_done` (function): The callback function when the search is done.
		- giả trị trả về (string) : là key tìm kiếm

```javascript
	cr.showSearch((key)=>{
		alert("Xử lý từ khóa "+key);
	});
```

## Register SSL For IIS

- 1 Đăng ký SSL cho máy chủ IIS window

Chạy file `Register SSL For IIS.ps1` ở trong dự án rồi nhập host name (ví dụ `abc.store.com`)

- 2 Xuất bản file chứng chỉ 

sau khi đã tạo chững chỉ bạn cần xuất file chứng chỉ từ Management Console và nhập vào trình chứng chỉ của IIS

Xuất bản chứng chỉ từ chương trình quảng lý chứng chỉ window

Chạy chương trình từ cửa sổ run gõ 

> certlm.msc

- 3 Nhập và khởi chạy chổng 443 cho giao thức https từ IIS manager

 