# PDS.ResponsiveBackground

A dynamic responsive background image module for the global PDS object. This module takes a JSON object of breakpoints 
and their corresponding background image URLs and dynamically swaps out the background image when necessary.

##Dependencies
- jQuery
- *debouncedresize* event ([link](https://github.com/louisremi/jquery-smartresize))
- **PDS.Breakpoints** module

##Usage 

There are a few ways this module can be used. First off, let's cover the important general points that you need to know;

1. You need to include the necessary scripts in your HTML document. See the `index.html` file for an example.
2. The `js-responsive-bg` CSS class is only required if you want the plugin to automatically initialise on an element.
3. The breakpoint data is passed to the plugin via the `data-bg-images` HTML attribute. The data is a JSON object. 
4. The breakpoint values are not fixed in any way. Use whatever numbers are necessary to match your breakpoint requirements.
5. The plugin actively monitors and updates the background images on both *debouncedresize* and *orientationchange* events. This is a function of the `PDS.Breakpoints` module.

###Example 1: Automatically 

By setting up your markup a particular way, this module can just do what it does without much input from you;

````html
<div class="js-responsive-bg"
    data-bg-images='{"0":"img/xs.jpg", "320":"img/sm.jpg", "768":"img/md.jpg", "1024":"img/lg.jpg"}'>
</div>
````

The module knows to look for any elements with the `js-responsive-bg` CSS class, and initilise itself based on the data
provided in the `data-bg-images` attribute.
 
###Example 2: Manual init, the jQuery way

Assuming we are using this on an element that does not have the 'js-responsive-bg' class but does have the necessary data attribute;

````html
<div class="some-other-element"
    data-bg-images='{"0":"img/xs.jpg", "320":"img/sm.jpg", "768":"img/md.jpg", "1024":"img/lg.jpg"}'>
</div>
````
The JS;
````javascript
$('.some-other-element').responsiveBackground();
````