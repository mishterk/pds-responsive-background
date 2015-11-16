# PDS.ResponsiveBackground

A dynamic responsive background image module for the global PDS object. This module takes a JSON object of breakpoints 
and their corresponding background image URLs and dynamically swaps out the background image when necessary.

##Dependencies
- jQuery
- *debouncedresize* event ([link](https://github.com/louisremi/jquery-smartresize))
- **PDS.Breakpoints** module

##Usage

First, include the necessary scripts in your HTML document. 

There are a few ways this module can be used;

###Example 1: Automatically 

By setting up your markup a particular way, this module can just do what it does without much input from you;

````html
<div class="some-other-element"
    data-bg-images='{"0":"img/xs.jpg", "320":"img/sm.jpg", "768":"img/md.jpg", "1024":"img/lg.jpg"}'>
</div>
````