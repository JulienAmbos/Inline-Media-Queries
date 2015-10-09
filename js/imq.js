$(document).ready(function() {
				
	var applicationPrefix = "ds";
	var styleBuilder = '<style data-ds type="text/css">';
	var selectorObjects = [
		{"selector" : "*[data-style-xs]", "classPrefix" : "xs","size" : 0},
		{"selector" : "*[data-style-sm]", "classPrefix" : "sm","size" : 768},
		{"selector" : "*[data-style-md]", "classPrefix" : "md","size" : 992},
		{"selector" : "*[data-style-lg]", "classPrefix" : "lg","size" : 1200}
	];

	// each media query
	$(selectorObjects).each(function() {
		
		var selectorObject = this;
		var classCounter = 0;
		var rules = [];
		
		if (selectorObject["size"] != 0) {
			styleBuilder = styleBuilder + " @media (min-width: " + selectorObject["size"] + "px) { ";
		}
		
		// each data-style selector for the corresponding media query									
		$(selectorObject["selector"]).each(function () {					
			var classname = applicationPrefix + "-" + classCounter;
			
			$(this).addClass(classname);
			var rule = {
				"classname" : classname,
				"styles" : $(this).attr("data-style-" + selectorObject["classPrefix"]).split(";")
			};
			
			rules.push(rule);					
			classCounter = classCounter + 1;
		});

		$(rules).each(function() {
			styleBuilder = styleBuilder + formClassRule(this);
		});
		
		if (selectorObject["size"] != 0) {
			styleBuilder = styleBuilder + "} ";
		}
							
	});
	styleBuilder = styleBuilder + "</style>";
	
	$(styleBuilder).appendTo( "head" );

});

// return string, input rule
function formClassRule(rule) {
	var appendString = "";
	var classname = rule["classname"];
	appendString = appendString + "." + classname + " ";
	
	appendString = appendString + "{ ";
	$(rule["styles"]).each(function() {
		if (this != "") {
			appendString = appendString + this + ";";
		}			
	});
	return appendString + " } ";
}
