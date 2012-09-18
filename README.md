Sliding-Doors
=============

A super skinny, super flexible jQuery horizontal accordian

## Introduction 

I created this plugin out of necessity. Every accordian plugin I tried in the past was too pushy. It had limited customization with far too much built in CSS, themes, etc. So this is a super light weight horizontal accordian. The customization is up to you. The plugin comes with zero lines of accompanying CSS for you to deal with. If you want to make it look less plain, go for it, but far be it from me to assume you want some wieird theme. 

## What it does 

The plugin looks for an unordered list and then creates a horizontal accordian from the list items. From there it looks for some options that determine the size and display of your accordian. 

## The Code 

You MUST declare the size of your accordian. There are 2 ways to do this. One is to declare the width of a closed panel, the width of and open panel and the height. The other way is to declare the width of and open panel, the width for the whole panel set and the height. Then let the plugin figure out the rest. Examples of both follow.

###Plugin with width of open panel, closed panels and height declared

``` javascript
$(document).ready(function(){
  $("#panels").slidingDoors({    
    widthClosed: 30,        
    widthOpen: 500,        
    height: 350        
  });    
});
```

###Plugin with open panel, total width and height declared

``` javascript
$(document).ready(function(){
  $("#panels").slidingDoors({
      widthOpen: 500,
      fitToWidth: 900,
      height: 350
  });
});
```
    
##Advanced Usage

The plugin provides several options that allow you to gain more control. There are also events available to you so you can pile on effects. Below is the plugin with all the non-required options. This is also the code that is running the sliding doors example provided in the [index.html](https://github.com/peterugh/Sliding-Doors/blob/master/index.html) file included in this repository.

``` javascript
$(document).ready(function(){
    $("#panels").slidingDoors({
        widthOpen: 750,
        fitToWidth: 960,
        height: 350,
        firstPanel: 4,
        activationMethod: 'hover',
        easingMethod: 'swing',
        easingLength: 600,
        panelFocus: function() {
            console.log('Focused: ' + $(' img', this).prop('alt'));
        },
        panelBlur: function() {
            console.log('Blurred: ' + $(' img', this).prop('alt'));
        },
        perIterationInactive: function() {
            $(' img', this).stop().animate({ opacity: .5});
        },
        perIterationActive: function() {
            $(' img', this).stop().animate({ opacity: 1});
        },
        onLoaded: function(returnObject) {
            $(returnObject.doors).each(function(index, element){
                if(returnObject.intialSlideIndex != index){
                    $(' img', element).css('opacity', .5);
                }
            });
        }
    });
}); 
```

###For default values and options see the [index.html](https://github.com/peterugh/Sliding-Doors/blob/master/index.html) file included in this repository
