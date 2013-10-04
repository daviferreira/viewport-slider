# ViewportSlider

ViewportSlider is a pure JavaScript implementarion of Apple's product page showcase (ie. http://www.apple.com/iphone-5c/).

[![Build Status](https://travis-ci.org/daviferreira/viewport-slider.png?branch=master)](https://travis-ci.org/daviferreira/viewport-slider)

## Development

ViewportSlider development tasks are managed by Grunt. To install all the necessary packages, just invoke:

```bash
npm install
```

These are the available grunt tasks:

* __js__: runs jslint and jasmine tests and creates minified and concatenated versions of the script;
* __css__: runs compass and csslint
* __test__: runs jasmine tests, jslint and csslint
* __watch__: watch for modifications on script/scss files

The source files are located inside the __src__ directory. ViewportSlider stylesheet was created using sass/compass, make sure you have the compass gem installed on your system.

## License

"THE BEER-WARE LICENSE" (Revision 42):

As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.
