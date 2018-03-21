# Book Catalogue App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Development Steps 
1. Install app related dependencies. 
`npm install bootstrap font-awesome ng2-toasty ngx-bootstrap popper.js simple-line-icons tether --save`
2. Edit the .angular-cli.json to add in the styling

```javascript
"styles": [
"../node_modules/tether/dist/css/tether.min.css",
"../node_modules/bootstrap/dist/css/bootstrap.min.css",
"../node_modules/ng2-toasty/bundles/style-bootstrap.css",
"../node_modules/font-awesome/css/font-awesome.min.css",
"../node_modules/simple-line-icons/css/simple-line-icons.css",
"../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",
"styles.css"
],
"scripts": [
"../node_modules/jquery/dist/jquery.slim.min.js",
"../node_modules/tether/dist/js/tether.min.js",
"../node_modules/popper.js/dist/popper.min.js",
"../node_modules/bootstrap/dist/js/bootstrap.min.js"
],
```
3. Add google font and font awesome css src/index.html
```html
<link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
<script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
```
4. Unzip the library thumbnails to the src/assests/images directory.


## this app consist 5 features
1. 
2. 