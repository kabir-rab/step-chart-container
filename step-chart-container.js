define( [	
		"jquery",
		"qlik",
		"./lib/js/property",
		"./lib/js/initialProps",
		"text!./step-chart-container-template.html",
		"text!./lib/css/step-chart-container.css",
		"text!./lib/css/spectre.min.css",
		"./lib/js/directives",	
	],

	function ($, qlik, props, initProps, template, flowCSS, spectreCSS) {'use strict';
		$("<style>").html(spectreCSS).appendTo("head");
		$("<style>").html(flowCSS).appendTo("head");
		var support = {	snapshot: false,
			export: false,
			exportData : false};

		return {		
			initialProperties : initProps,
			definition : props,
			support : support,
			template: template,
			
			controller: ['$scope', function ( $scope ) {
				var app = qlik.currApp(this);									

				$scope.totalSteps = function(){var t; t=$scope.layout.listItems.length; return t};
				$scope.extId = '#'+$scope.layout.qInfo.qId+'-chart';
				$scope.avatarId = $scope.layout.qInfo.qId+'-avatar';
				$scope.textId = $scope.layout.qInfo.qId+'-text';
				$scope.liClass = $scope.layout.qInfo.qId+'-css';
											
				$scope.stepMasterItem = function(maserItemNo){
					//qlik.theme.apply('card');																	
					app.getObject( $scope.extId, $scope.layout.listItems[maserItemNo].props.masteritem );				
					$("[id^="+$scope.liClass+"]").removeClass("active");					
					$('#'+$scope.liClass+'-'+maserItemNo).addClass("active");
					
					$("[id^="+$scope.avatarId+"]").addClass("qv-object-step-chart-container-not-select");
					$('#'+$scope.avatarId+'-'+maserItemNo).removeClass("qv-object-step-chart-container-not-select");
					$('#'+$scope.avatarId+'-'+maserItemNo).addClass("qv-object-step-chart-container-select");
				};
				
				$scope.headerMinHeight = function(){
					var minHeight,
						heightPercen,
						elementCss;						
					
					minHeight = $scope.layout.props.show === false ? "min-height: 70px;" : "min-height: 120px;";
					heightPercen = $scope.layout.props.MasterItem === false ? "height: 100%;" : "height: 20%;";
					elementCss = minHeight + heightPercen;
					return elementCss;
				};	
			}],			

			paint: function ($element, layout) {
				var self = this,
					editmode = qlik.navigation.getMode(),
					showText = 'Please select a process/step',
					textId = layout.qInfo.qId+'-text';					

				switch (editmode) {
					case "edit":
						$('#'+textId).html('Add Process/steps');
						break;
					case "analysis":
						$('#'+textId).html(showText);						
				}			
				
				return qlik.Promise.resolve();
			}
		};
	} 
);