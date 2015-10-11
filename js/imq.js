/*****************************
 * Author: Julien Ambos, Date: 11.10.2015
 * Version: v.1.1
 * 
 * OBJECT MODELS
 * 
 * query
 * { selector: string, shortname: string, size: int }
 * 
 * viewport
 * { name: string, size: int, classes : [ { name: string, styles: [string] } ] }
 * 
 * cssclass 
 * { classname: string, styles: [string] }
 *****************************/
var IQM = {};

(function(IQM) {

    var that = IQM;

    /*****************************
     * PRIVATE PROPERTIES
     *****************************/

    var applicationPrefix = "ds";
    var classCounter = 0;
    var viewports = [];
    var standardQueries = [{
        "selector": "*[data-style-xs]",
        "shortname": "xs",
        "size": 0
    }, {
        "selector": "*[data-style-sm]",
        "shortname": "sm",
        "size": 768
    }, {
        "selector": "*[data-style-md]",
        "shortname": "md",
        "size": 992
    }, {
        "selector": "*[data-style-lg]",
        "shortname": "lg",
        "size": 1200
    }];

    /*****************************
     * PUBLIC METHODS - INTERFACE
     *****************************/

    that.Load = function() {
        LoadStandardQueries(clearStandardStyles);
        LoadCustomQueries(clearCustomStyles);
    };

    that.Reload = function() {
        LoadStandardQueries(clearStandardStyles);
        LoadCustomQueries(clearCustomStyles);
    };

    that.ReloadStandardQueries = function() {
        LoadStandardQueries(clearStandardStyles);
    };

    that.ReloadCustomQueries = function() {
        LoadCustomQueries(clearCustomStyles);
    };

    /*****************************
     * PRIVATE METHODS
     *****************************/

    /**
     * return void
     */
    var LoadStandardQueries = function(clearStyles) {
        executeWorkflow(retrieveStylesStandard, clearStyles, "data-style-standardtag");
    };

    /**
     * return void
     */
    var LoadCustomQueries = function(clearStyles) {
        executeWorkflow(retrieveStylesCustom, clearStyles, "data-style-customtag");
    };

    /**
     * return void
     */
    var executeWorkflow = function(retrieveStyles, clearStyles, dataStyleType) {
        clearStyles();
        viewports = [];
        retrieveStyles();
        orderViewportsBySize();
        var styleBuilder = createStylebuilder(dataStyleType);
        writeStylebuilderToDOM(styleBuilder);
    };

    /**
     * return void
     */
    var retrieveStylesStandard = function() {

        $("*[data-style-standard]").each(function() {
            var currentIQMElement = this;

            if (!$(currentIQMElement).is("[data-style-exclude]")) {

                $(currentIQMElement.attributes).each(function() {
                    var iqmElementAttribute = this;

                    if ($.inArray(iqmElementAttribute.name, extractQueryNames(standardQueries)) != -1) {

                        if (iqmElementAttribute.name.substr(0, 10) == "data-style") {

                            var shortname = iqmElementAttribute.name.substr(11, iqmElementAttribute.length);
                            var currentQuery = getQueryObject(standardQueries, shortname);

                            addViewportIfNotExists(currentQuery);
                            addClassToViewport(formCssClass(currentIQMElement, currentQuery), currentQuery);
                        }
                    }
                });
                classCounter += 1;
            }
        });
    };

    /**
     * return void
     */
    var retrieveStylesCustom = function() {

        $("*[data-style-custom]").each(function() {
            var currentIQMElement = this;

            if (!$(currentIQMElement).is("[data-style-exclude]")) {

                $(currentIQMElement.attributes).each(function() {
                    var iqmElementAttribute = this;

                    if (iqmElementAttribute.name.substr(0, 10) == "data-style") {

                        var viewportWidth = iqmElementAttribute.name.substr(11, iqmElementAttribute.length);
                        
                        if ($.inArray(iqmElementAttribute.name, extractQueryNames(standardQueries)) == -1) {
                            if (!isNaN(viewportWidth)) {
                                var currentQuery = {
                                    "selector": "*[" + iqmElementAttribute.name + "]",
                                    "shortname": viewportWidth.toString(),
                                    "size": viewportWidth
                                };
    
                                addViewportIfNotExists(currentQuery);
                                addClassToViewport(formCssClass(currentIQMElement, currentQuery), currentQuery);
                            }
                        }
                    }
                });
                classCounter += 1;
            }
        });
    };

    /**
     * return void
     */
    var addViewportIfNotExists = function(currentQuery) {
        if (getViewportByQueryShortname(currentQuery["shortname"]) == null) {
            var viewport = {
                "size": currentQuery["size"],
                "name": currentQuery["shortname"],
                "classes": []
            };
            viewports.push(viewport);
        }
    };

    /**
     * return void
     */
    var addClassToViewport = function(cssClass, currentQuery) {
        var viewport = getViewportByQueryShortname(currentQuery["shortname"]);
        viewport["classes"].push(cssClass);
    };


    /**
     * return string
     */
    var createStylebuilder = function(dataStyleType) {
        var styleBuilder = '<style ' + dataStyleType + ' type="text/css">';

        $(viewports).each(function() {
            if (this["size"] != 0) {
                styleBuilder = styleBuilder + " @media (min-width: " + this["size"] + "px) { ";
            }
            $(this["classes"]).each(function() {
                styleBuilder = styleBuilder + "." + this["classname"] + " { ";

                $(this["styles"]).each(function() {
                    styleBuilder = styleBuilder + this + ";";
                });

                styleBuilder = styleBuilder + " } ";
            });
            if (this["size"] != 0) {
                styleBuilder = styleBuilder + "} ";
            }
        });

        styleBuilder = styleBuilder + '</style>';

        return styleBuilder;
    };

    /**
     * return void
     */
    var writeStylebuilderToDOM = function(styleBuilder) {
        $(styleBuilder).appendTo("head");
    };

    /**
     * return {object} cssclass
     */
    var formCssClass = function(currentElement, relatedQuery) {
        var classname = applicationPrefix + "-" + classCounter;
        $(currentElement).addClass(classname);
        return cssClass = {
            "classname": classname,
            "styles": $(currentElement).attr("data-style-" + relatedQuery["shortname"]).split(";")
        };
    };

    /**
     * return void
     */
    var clearCustomStyles = function() {
        $("style[data-style-customTag]").remove();
    };

    /**
     * return void
     */
    var clearStandardStyles = function() {
        $("style[data-style-standardTag]").remove();
    };

    /**
     * return {object} query
     */
    var getQueryObject = function(queries, shortname) {
        var result = null;
        $(queries).each(function() {
            if (this["shortname"] == shortname) {
                result = this;
                return;
            }
        });
        return result;
    };

    /**
     * return {object} viewport
     */
    var getViewportByQueryShortname = function(shortname) {
        var result = null;
        $(viewports).each(function() {
            if (this["name"] == shortname) {
                result = this;
                return;
            }
        });
        return result;
    };

    /**
     * return void
     */
    var orderViewportsBySize = function() {
        viewports.sort(function(a, b) {
            return a.size - b.size
        })
    };

    /**
     * return {array} string
     */
    var extractQueryNames = function(queriesIn) {
        var queries = [];
        $(queriesIn).each(function() {
            queries.push("data-style-" + this["shortname"]);
        });
        return queries;
    };

})(IQM);

$(document).ready(function() {
    IQM.Load();
});