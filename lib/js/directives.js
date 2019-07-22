define(['qvangular'], function (qvangular) {
	'use strict';

	qvangular.directive("steps", [function() {
	    return {
	        link: function (scope, element, attrs) {
	        	element.bind("click", onClick);
                function onClick(event) {
					var method = element.attr("steps")
														
                    scope.$apply(method);                   
	        	}
	    	}
	    }
	}]);
});