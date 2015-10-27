# Inline Media Queries

Write inline styles for specific media queries.

# Table of content

Jump quickly to a topic.

* [Overview][0]
* [Setup][1]
* [Installation][2]
* [Media Queries][3]
  * [Standard media queries][4]
  * [Custom media queries][5]
* [Basic usage][6]
  * [Standard media queries][7]
  * [Custom media queries][8]
* [Exclude elements from inline media queries][9]
* [Programmability][10]
  * [Reload()][11]
  * [ReloadStandardQueries()][12]
  * [ReloadCustomQueries()][13]
* [Summary][14]

# Overview

Inline Media Query uses data attributes with the prefix `data-style` to write inline styles.
A media query is a descriptor for applying certain CSS styles for specific devices using the width of the browser. You can either use Bootstrap-like media queries using the postfixes `xs`, `sm`, `md` or
`lg`, or use dynamic viewport widths by simply applying any number you like as a postfix to apply CSS styles to.

# Setup

To make this library running you need to include jQuery 2.1 or later.

Include via Google:

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

or include locally:  

    <script src="jquery/jquery.min.js"></script>

# Installation

All you need is a version of the iqm.js file. For productive use include iqm.min.js and for development use include iqm.js:

    <!-- Production --> 
    <script src="js/imq.min.js"></script> 
    
    <!-- Development --> 
    <script src="js/imq.js"></script>

# Media queries

You can either use predefined media queries as defined in Bootstrap v. 3.x using named postfixes or you can address any browser width by using a number as a dynamic postfix.  

## Standard media queries

If you want to use standard Bootstrap media queries, apply to any HTML element the `data-style-standard` data attribute to set up for standard media queries.
Add the following data-style attributes to address the corresponding viewport width:

* data-style-`xs` (less than 768px)
* data-style-`sm` (equal and greater than 768px)
* data-style-`md` (equal and greather than 992px)
* data-style-`lg` (equal and greater than 1200px)

## Custom media queries

If you want to use custom media queries, apply to any HTML element the `data-style-custom` data attribute to set up for custom media queries.
Add any number as data-style postifx to address the corresponding viewport width:

* data-style-`<number>` (equal and greater than the given number)
* e.g. data-style-`400` (equal and greater than 400px)
* e.g. data-style-`600` (equal and greater than 600px)
* e.g. data-style-`800` (equal and greater than 800px)

# Basic usage

Simple add data attributes to the desired HTML element with css styles as value.

## Standard media queries

Apply the `data-style-standard` data attribute with standard media query data-style tags:

    <h3 
     data-style-standard	
     data-style-lg="background-color: black; color: white;" 
     data-style-md="background-color: green; color: white;"
     data-style-sm="background-color: yellow; color: black;" 
     data-style-xs="background-color: blue; color: white;"
    >
     Resize your browser window to see how it's working
    </h3>

### Resize your browser window to see how it's working

## Custom media queries

Address custom viewports using the dynamic data attribute data-style-\* (\* needs to be a number). When applying a data-style attribute with any 
number the styles will apply for the browser width equal and greater the given number.

Apply the `data-style-custom` data attribute with custom media query data-style tags:

    <h3 
     data-style-custom
     data-style-400="background-color: black; color: white;" 
     data-style-600="background-color: green; color: white;"
     data-style-800="background-color: yellow; color: black;" 
    >
     Resize your browser window to see how it's working
    </h3>
    

### Resize your browser window to see how it's working

# Exclude elements from inline media queries

In case you might come across display problems or just need to hide the styles applied by inline media queries you can turn effects off
by adding the data attribute `data-style-exclude` to the element.

    <h3 
     data-style-standard
     data-style-exclude
     data-style-lg="background-color: black; color: white;" 
     data-style-md="background-color: green; color: white;"
     data-style-sm="background-color: yellow; color: black;" 
     data-style-xs="background-color: blue; color: white;"
    >
     Resize your browser window to see how it's working
    </h3>

### Resize your browser window to see how it's working

# Programmability

Initially on including the iqm.js file, inline media queries loads all CSS on `$(document).ready();`

## Reload()

You can reload all CSS styles by calling the `Reload()` function:

    <script type="text/javascript">
     IQM.Reload();
    </script>

## ReloadStandardQueries()

You can reload all CSS styles applied with standard queries by calling the `ReloadStandardQueries()` function:

    <script type="text/javascript">
     IQM.ReloadStandardQueries();
    </script>

## ReloadCustomQueries()

You can reload all CSS styles applied with custom queries by calling the `ReloadCustomQueries()` function:

    <script type="text/javascript">
     IQM.ReloadCustomQueries();
    </script>

# Summary

Thank you for reaching the bottom of this page. If you're interested, contribute anytime to this library on [https://github.com/JulienAmbos/Inline-Media-Queries][15].


[0]: #overview
[1]: #setup
[2]: #installation
[3]: #media-queries
[4]: #standard-media-queries
[5]: #custom-media-queries
[6]: #basic-usage
[7]: #standard-media-queries-1
[8]: #custom-media-queries-1
[9]: #exclude-elements-from-inline-media-queries
[10]: #programmability
[11]: #reload
[12]: #reloadstandardqueries
[13]: #reloadcustomqueries
[14]: #summary
[15]: https://github.com/JulienAmbos/Inline-Media-Queries
