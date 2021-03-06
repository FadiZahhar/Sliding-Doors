/**
*
* @author Pete Rugh peterugh@gmail.com 
*
*/


jQuery.fn.slidingDoors = function (options) 
{
	"use strict";

	function returnObject 
	(
		doorsWidthP,
		numOfPanelsP,
		containerP,
		doorsP,
		closedWidthP,
		intialSlideIndexP,
		openWidthP
	)
	{
		this.doorsWidth = doorsWidthP;
		this.numOfPanels = numOfPanelsP;
		this.container = containerP;
		this.doors = doorsP;
		this.closedWidth = closedWidthP;
		this.intialSlideIndex = intialSlideIndexP;
		this.openWidth = openWidthP;
	}

	// Set the defaults
    var settings = $.extend(
	{
		activationMethod: 'hover',
		easingLength: 300,
		easingMethod: 'linear',
		firstPanel: 0,
		fitToWidth: 0,
		height: 0,
		panelBlur: function () {},
		panelFocus: function () {},
		onLoaded: function () {},
		perIterationActive: function () {},
		perIterationInactive: function () {},
		widthClosed: 0,
		widthOpen: 0
	}, options),

		fullWidth,
		currentOffset,
		theContainer,
		theDoors,
		actualWidth,
		panels,
		returned,
		returnObjects = [];

	this.each(function(index, doorsSet)
	{ 
		fullWidth = 0,
		currentOffset = 0,
		theContainer = $(doorsSet),
		theDoors = $('> *', theContainer),
		actualWidth = 0,
		panels = theDoors.length,
		returned = false;
	
		//set up the default styles
		theContainer.css(
		{
			overflow: 'hidden',
			position: 'relative',
			margin: 0,
			padding: 0,
			listStyle: 'none',
			height: settings.height
		});
	
		theDoors.css(
		{
			overflow: 'hidden',
			position: 'absolute',
			margin: 0,
			padding: 0,
			top: 0,
			left: 0,
			height: settings.height
		});
	
		//make sure the slide index they chose exists
		if (settings.firstPanel >= theDoors.length || settings.firstPanel < 0) 
		{
			settings.firstPanel = 0;
		}
	
		//calculate the width of the panels when closed based on total width
		if (settings.fitToWidth > 0) 
		{
			settings.widthClosed = Math.floor((settings.fitToWidth * (1 - ((settings.widthOpen / settings.fitToWidth))) / (panels - 1)));
		}
	
		function slideThem(context) 
		{
	
			$(' .active', theContainer).removeClass('active');
			context.addClass('active');
			currentOffset = 0;
	
			theDoors.each(function () 
			{
				if ($(this).hasClass('active')) 
				{
					$(this)
						.stop()
						.animate(
						{
							left: currentOffset,
							width: settings.widthOpen
						}, settings.easingLength, settings.easingMethod);
	
					if (settings.perIterationActive) 
					{
						settings.perIterationActive.call($(this));
					}
	
					actualWidth = settings.widthOpen + parseInt($(this).css('border-left-width'), 10) + parseInt($(this).css('border-right-width'), 10);
				}
				else
				{
					$(this)
						.stop()
						.animate(
						{
							left: currentOffset,
							width: settings.widthClosed
						}, settings.easingLength, settings.easingMethod, 
						function () 
						{
							$(' .first', theContainer).removeClass('first');
						});
	
					if (settings.perIterationInactive) 
					{
						settings.perIterationInactive.call($(this));
					}
	
					actualWidth = settings.widthClosed + parseInt($(this).css('border-left-width'), 10) + parseInt($(this).css('border-right-width'), 10);
				}
	
				currentOffset = currentOffset + actualWidth;
	
			});
		}
	
		theDoors.each(function (eleIndex) 
		{
			if (settings.firstPanel == eleIndex) 
			{
				$(this).addClass('first');
				$(this).width(settings.widthOpen);
			}
			else 
			{
				$(this).width(settings.widthClosed);
			}
			$(this).css('left', fullWidth);
			$(' img', $(this)).width(settings.widthOpen);
			fullWidth = fullWidth + $(this).outerWidth();
		});
	
		if (settings.fitToWidth != 0) 
		{
			fullWidth = settings.fitToWidth;
		}
		theContainer.width(fullWidth);
	
		if (settings.activationMethod === 'hover') 
		{
			theDoors.hover(function () 
			{
				if (settings.panelFocus) 
				{
					settings.panelFocus.call($(this));
				}
				slideThem($(this));
			}, 
			function () 
			{
				if (settings.panelBlur) 
				{
					settings.panelBlur.call($(this));
				}
			});
		}
		else
		{
			theDoors.click(function () 
			{
				if (settings.panelFocus) 
				{
					settings.panelFocus.call($(this));
				}
				slideThem($(this));
			});
		}
	
		returnObjects.push(new returnObject
		(
			fullWidth,
			panels,
			theContainer,
			theDoors,
			settings.widthClosed,
			settings.firstPanel,
			settings.widthOpen
		));
	});

	if (settings.onLoaded && returned == false) 
	{
		returned = true;
		settings.onLoaded(returnObjects);
	}
};