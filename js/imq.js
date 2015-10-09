var IQM = {};

(function (IQM) {
        
	that = IQM;
	that.Load = function () {
	
		// set the class prefix 	
		var applicationPrefix = "ds";
		// setup the css builder
		var styleBuilder = '<style data-ds type="text/css">';
		
		var queries = [
			{"selector" : "*[data-style-xs]", "classPrefix" : "xs","size" : 0},
			{"selector" : "*[data-style-sm]", "classPrefix" : "sm","size" : 768},
			{"selector" : "*[data-style-md]", "classPrefix" : "md","size" : 992},
			{"selector" : "*[data-style-lg]", "classPrefix" : "lg","size" : 1200}
		];
	
		// each media query
		$(queries).each(function() {
			
			var query = this;
			var classCounter = 0;
			var rules = [];
			
			// dont write a media query for the xs-query
			if (query["size"] != 0) {
				styleBuilder = styleBuilder + " @media (min-width: " + query["size"] + "px) { ";
			}
			
			// each data-style selector for the corresponding media query									
			$(query["selector"]).each(function () {		
				if (!$(this).is("[data-style-exclude]")) {
					var classname = applicationPrefix + "-" + classCounter;
					
					// write class with classname back to html element
					$(this).addClass(classname);			
					var cssRule = {
						"classname" : classname,
						"styles" : $(this).attr("data-style-" + query["classPrefix"]).split(";")
					};
					
					rules.push(cssRule);					
					classCounter += 1;
				}							
			});
	
			// write the css code for each rule
			$(rules).each(function() {
				styleBuilder = styleBuilder + that.formClassRule(this);
			});
			
			// dont write a media query for the xs-query
			if (query["size"] != 0) {
				styleBuilder = styleBuilder + "} ";
			}								
		});
		
		styleBuilder = styleBuilder + "</style>";		
		$(styleBuilder).appendTo("head");
	};
	
	// return string, input rule
	that.formClassRule = function (rule) {
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
	};
		   
})(IQM);

$(document).ready(function() {
	IQM.Load();
});
