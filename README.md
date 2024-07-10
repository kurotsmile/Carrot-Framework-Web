# Carrot Framework for Web Apps

Carrot Framework is a tool designed to support various functions for web applications.

## Introduction

Carrot.js is the main file of this framework. It initializes the framework and provides global access to its functionalities.

### Global Variable
```javascript
var cr = new Carrot();
```

# Functions

loadJs(path_js, obj_call, func_call = "show")

Dynamically loads a JavaScript file and executes a specified function.
- `path_js`: Path to the JavaScript file.
- `obj_call`: Object to call the function on.
- `func_call`: Name of the function to call (default is "show").

```javascript
cr.loadJs('path/to/script.js', window, 'initialize');
```