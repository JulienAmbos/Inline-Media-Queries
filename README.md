# Inline-Media-Queries
Add inline CSS styling for specific viewports using data attributes.
# Demo
Want to see it in action? Follow <a href="http://google.com">this link</a>.
# How it works
By simply adding data attributes for specific viewports iqm.js writes plain CSS to your DOM:
<pre>
&lt;h3 	
 data-style-lg="background-color: black; color: white;" 
 data-style-md="background-color: green; color: white;"
 data-style-sm="background-color: yellow; color: black;" 
 data-style-xs="background-color: blue; color: white;"
&gt;
 Resize your browser window to see how it's working
&lt;/h2&gt;
</pre>
iqm.js writes a random class back to the HTML element and writes styles for that specific class into a new <code>&lt;style&gt;</code>-Tag in the head-section of the DOM.
Based on the code above, this would be the result:
<h3>CSS</h3>
<pre>
.ds-0 { background-color: blue; color: white; }  
@media (min-width: 768px) { 
  .ds-0 { background-color: yellow; color: black; } 
}  
@media (min-width: 992px) { 
  .ds-0 { background-color: green; color: white; } 
}  
@media (min-width: 1200px) { 
  .ds-0 { background-color: black; color: white; } 
} 
</pre>
<h3>HTML</h3>
<pre>
&lt;h3 
  data-style-lg="background-color: black; color: white;" 
  data-style-md="background-color: green; color: white;" 
  data-style-sm="background-color: yellow; color: black;" 
  data-style-xs="background-color: blue; color: white;" 
  class="ds-0"
&gt;
	Resize your browser window to see how it's working
&lt;/h3&gt;
</pre>
# Setup
To make this library running you need to include jQuery 2.1 or later.<br><br>
Include via Google:<br>
<pre>
&lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"&gt;&lt;/script&gt;
</pre>
or include locally:<br>
<pre>
&lt;script src="jquery/jquery.min.js"&gt;&lt;/script&gt;
</pre>
# Installation
All you need is a version of the iqm.js file. For productive use include iqm.min.js and for development use include iqm.js:
<pre>
&lt;!-- Production --&gt; 
&lt;script src="js/iqm.min.js"&gt;&lt;/script&gt; 

&lt;!-- Development --&gt; 
&lt;script src="js/iqm.min.js"&gt;&lt;/script&gt;
</pre>
# Basic usage
Use iqm by adding data attributes to the desired HTML element. There are currently four supported media queries, matching the media queries of Bootstrap 3.x:
  <ul>
		<li>
			xs (less than 768px)
		</li>
		<li>
			sm (equal and greater than 768px)
		</li>
		<li>
			md (equal and greather than 992px)
		</li>
		<li>
			lg (equal and greater than 1200px)
		</li>
	</ul>
Similary there are four data attributes you can use:
<ul>
		<li>
			data-style-xs (adress viewports smaller than 768px)
		</li>
		<li>
			data-style-sm (dress viewports equal and bigger than 768px)
		</li>
		<li>
			data-style-md (dress viewports equal and bigger than 992px)
		</li>
		<li>
			data-style-lg (dress viewports equal and bigger than 1200px)
		</li>
	</ul>
Simply add a data attribute to a HTML element and define CSS styles in the same way, you would use the "style" attribute.
	
