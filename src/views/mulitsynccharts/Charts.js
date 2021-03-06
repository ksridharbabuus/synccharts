import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var toolTip = {
	shared: true
  };

var legend = {
	cursor: "pointer",
	itemclick: function (e) {
	  if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	  } else {
		e.dataSeries.visible = true;
	  }
	  e.chart.render();
	}
  }; 

// Old code and converted to the local State and the State is updated from APIs
/*
var systemDps = [], userDps=[], waitDps = [], buffersDps = [], cacheDps = [], usedDps=[], inboundDps = [], outboundDps = [], writeDps = [], readDps = [];

var cpuChartOptions = {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title:{
	  text: "Temperature(°C)",
	  horizontalAlign: "left",
	  fontColor:'#717171',
	  fontSize:14,
	  padding:{left:20,top:5}
	},
	height: 100,
	zoomEnabled: true,
	zoomType: "x",
	toolTip: toolTip,
    axisX:{
		gridThickness: 0,
    	tickLength: 0,
		lineThickness: 0,
		labelFormatter: function(){
			return " ";
		},
		crosshair: {
			enabled: true,
			snapToDataPoint: true
		},
		viewportMinimum: 1549474200000,
		viewportMaximum: 1549560600000,
		interval: 3600000
	}, 
	axisY: {
		gridThickness: 0,
    	tickLength: 0,
		lineThickness: 0,
		labelFormatter: function(){
			return " ";
		}
	},
	legend: legend,
	backgroundColor: "#f4f4f4",
	data: [{
	  type: "splineArea", 
	  showInLegend: false,
	  name: "Temperature",
	  //yValueFormatString: "#0.#%",
	  color: "#000000",
	  xValueType: "dateTime",
	  xValueFormatString: "DD MMM YY HH:mm",
	  //legendMarkerType: "square",
	  dataPoints: userDps,
	  fillOpacity: "0",
	  lineThickness:1,
	  toolTipContent: "{y}"
	},{
	  type: "stepLine", 
	  //showInLegend: "false",
	  //name: "System",
	 // yValueFormatString: "#0.#%",
	  color: "#9B9B9B",
	  //xValueType: "dateTime",
	  //xValueFormatString: "DD MMM YY HH:mm",
	  //legendMarkerType: "square",
	  dataPoints: systemDps,
	  lineDashType: "shortDot",
	  toolTipContent: "({y})"
	}]
  };

  var memoryChartOptions = {
	animationEnabled: true,
	theme: "light2",
	title:{
	  text: "Humidity (%)",
	  horizontalAlign: "left",
	  fontColor:'#717171',
	  fontSize:14,
	  padding:{left:20,top:5}
	},
	axisX:{
		gridThickness: 0,
    	tickLength: 0,
		lineThickness: 0,
		labelFormatter: function(){
			return " ";
		},
		crosshair: {
			enabled: true,
			snapToDataPoint: true
		},
		viewportMinimum: 1549474200000,
		viewportMaximum: 1549560600000,
		interval: 3600000
	},
	axisY: {
		gridThickness: 0,
    	tickLength: 0,
		lineThickness: 0,
		labelFormatter: function(){
			return " ";
		}
	},
	height: 100,
	zoomEnabled: true,
	zoomType: "x",
	toolTip: toolTip,
	legend: legend,
	backgroundColor: "#f4f4f4",
	backgroundColor: "#f4f4f4",
	data: [{
	  type: "splineArea", 
	  showInLegend: false,
	  name: "Cache",
	  color: "#000000",
	  xValueType: "dateTime",
	  xValueFormatString: "DD MMM YY HH:mm",
	  //yValueFormatString: "#.## GB",
	  legendMarkerType: "square",
	  dataPoints: cacheDps,
	  fillOpacity: "0",
	  lineThickness:1,
	  toolTipContent: "{y}"
	},{
	  type: "stepLine", 
	  showInLegend: false,
	  name: "System",
	 // yValueFormatString: "#0.#%",
	  color: "#9B9B9B",
	  //xValueType: "dateTime",
	  //xValueFormatString: "DD MMM YY HH:mm",
	  //legendMarkerType: "square",
	  dataPoints: systemDps,
	  lineDashType: "shortDot",
	  toolTipContent: "({y})"
	}]
  }

  var networkChartOptions = {
	animationEnabled: true,
	theme: "light2",
	title:{
	  text: "CO2 (ppm)",
	  horizontalAlign: "left",
	  fontColor:'#717171',
	  fontSize:14,
	  padding:{left:20,top:5}
	},
	axisX: {
		crosshair: {
			enabled: true,
			snapToDataPoint: true
		},
		viewportMinimum: 1549474200000,
		viewportMaximum: 1549560600000,
		interval: 3600000
	},
	axisY: {
		gridThickness: 0,
    	tickLength: 0,
		lineThickness: 0,
		labelFormatter: function(){
			return " ";
		},
	},
	height: 100,
	zoomEnabled: true,
	zoomType: "x",
	toolTip: toolTip,
	legend: legend,
	backgroundColor: "#f4f4f4",
	data: [{
	  type: "splineArea", 
	  showInLegend: false,
	  name: "Outbound",
	  color: "#000000",
	  xValueType: "dateTime",
	  xValueFormatString: "DD MMM YY HH:mm",
	  //yValueFormatString: "#.## Kb/s",
	  legendMarkerType: "square",
	  dataPoints: outboundDps,
	  fillOpacity: "0",
	  lineThickness:1,
	  toolTipContent: "{y}"
	},{
	  type: "stepLine", 
	  showInLegend: false,
	  name: "System",
	 // yValueFormatString: "#0.#%",
	  color: "#9B9B9B",
	  //xValueType: "dateTime",
	  //xValueFormatString: "DD MMM YY HH:mm",
	  //legendMarkerType: "square",
	  dataPoints: systemDps,
	  lineDashType: "shortDot",
	  toolTipContent: "({y})"
	}]
  }

  var diskChartOptions = {
	animationEnabled: true,
	theme: "light2",
	title:{
	  text: "Light rows",
	  horizontalAlign: "left"
	},
	axisX:{
		gridThickness: 0,
    	tickLength: 0,
		lineThickness: 0,
		labelFormatter: function(){
			return " ";
		},
		crosshair: {
			enabled: true,
			snapToDataPoint: true
		},
		viewportMinimum: 1549474200000,
		viewportMaximum: 1549560600000,
		interval: 3600000
	},
	axisY: {
		gridThickness: 0,
    	tickLength: 0,
		lineThickness: 0,
		labelFormatter: function(){
			return " ";
		},
	},
	height: 100,
	zoomEnabled: true,
	zoomType: "x",
	toolTip: toolTip,
	legend: legend,
	backgroundColor: "#f4f4f4",
	data: [{
	  type: "bar", 
	  showInLegend: "true",
	  name: "Write",
	  color: "#000000",
	  xValueType: "dateTime",
	  xValueFormatString: "DD MMM YY HH:mm",
	  yValueFormatString: "#.## ops/second",
	  legendMarkerType: "square",
	  dataPoints: writeDps,
	  fillOpacity: "0",
	  lineThickness:1
	},{
	  type: "stepLine", 
	  //showInLegend: "false",
	  //name: "System",
	 // yValueFormatString: "#0.#%",
	  color: "#9B9B9B",
	  //xValueType: "dateTime",
	  //xValueFormatString: "DD MMM YY HH:mm",
	  //legendMarkerType: "square",
	  dataPoints: systemDps,
	  lineDashType: "shortDot",
	}]
  }

*/

class LineChart extends Component {

	constructor() {
		super();

		this.state = {
			systemDps : [], 
			userDps:[], 
			waitDps : [], 
			buffersDps : [], 
			cacheDps : [], 
			usedDps:[], 
			inboundDps : [], 
			outboundDps : [], 
			writeDps : [], 
			readDps : []
		}


		this.cpuChartOptions = {
			animationEnabled: true,
			theme: "light2", // "light1", "light2", "dark1", "dark2"
			title:{
			  text: "Temperature(°C)",
			  horizontalAlign: "left",
			  fontColor:'#717171',
			  fontSize:14,
			  padding:{left:20,top:5}
			},
			height: 100,
			zoomEnabled: true,
			zoomType: "x",
			toolTip: toolTip,
			axisX:{
				gridThickness: 0,
				tickLength: 0,
				lineThickness: 0,
				labelFormatter: function(){
					return " ";
				},
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				},
				viewportMinimum: 1549474200000,
				viewportMaximum: 1549560600000,
				interval: 3600000
			}, 
			axisY: {
				gridThickness: 0,
				tickLength: 0,
				lineThickness: 0,
				labelFormatter: function(){
					return " ";
				}
			},
			legend: legend,
			backgroundColor: "#f4f4f4",
			data: [{
			  type: "splineArea", 
			  showInLegend: false,
			  name: "Temperature",
			  //yValueFormatString: "#0.#%",
			  color: "#000000",
			  xValueType: "dateTime",
			  xValueFormatString: "DD MMM YY HH:mm",
			  //legendMarkerType: "square",
			  dataPoints: this.state.userDps,
			  fillOpacity: "0",
			  lineThickness:1,
			  toolTipContent: "{y}"
			},{
			  type: "stepLine", 
			  //showInLegend: "false",
			  //name: "System",
			 // yValueFormatString: "#0.#%",
			  color: "#9B9B9B",
			  //xValueType: "dateTime",
			  //xValueFormatString: "DD MMM YY HH:mm",
			  //legendMarkerType: "square",
			  dataPoints: this.state.systemDps,
			  lineDashType: "shortDot",
			  toolTipContent: "({y})"
			}]
		  };
		
		this.memoryChartOptions = {
			animationEnabled: true,
			theme: "light2",
			title:{
			  text: "Humidity (%)",
			  horizontalAlign: "left",
			  fontColor:'#717171',
			  fontSize:14,
			  padding:{left:20,top:5}
			},
			axisX:{
				gridThickness: 0,
				tickLength: 0,
				lineThickness: 0,
				labelFormatter: function(){
					return " ";
				},
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				},
				viewportMinimum: 1549474200000,
				viewportMaximum: 1549560600000,
				interval: 3600000
			},
			axisY: {
				gridThickness: 0,
				tickLength: 0,
				lineThickness: 0,
				labelFormatter: function(){
					return " ";
				}
			},
			height: 100,
			zoomEnabled: true,
			zoomType: "x",
			toolTip: toolTip,
			legend: legend,
			backgroundColor: "#f4f4f4",
			backgroundColor: "#f4f4f4",
			data: [{
			  type: "splineArea", 
			  showInLegend: false,
			  name: "Cache",
			  color: "#000000",
			  xValueType: "dateTime",
			  xValueFormatString: "DD MMM YY HH:mm",
			  //yValueFormatString: "#.## GB",
			  legendMarkerType: "square",
			  dataPoints: this.state.cacheDps,
			  fillOpacity: "0",
			  lineThickness:1,
			  toolTipContent: "{y}"
			},{
			  type: "stepLine", 
			  showInLegend: false,
			  name: "System",
			 // yValueFormatString: "#0.#%",
			  color: "#9B9B9B",
			  //xValueType: "dateTime",
			  //xValueFormatString: "DD MMM YY HH:mm",
			  //legendMarkerType: "square",
			  dataPoints: this.state.systemDps,
			  lineDashType: "shortDot",
			  toolTipContent: "({y})"
			}]
		  }
		
		this.networkChartOptions = {
			animationEnabled: true,
			theme: "light2",
			title:{
			  text: "CO2 (ppm)",
			  horizontalAlign: "left",
			  fontColor:'#717171',
			  fontSize:14,
			  padding:{left:20,top:5}
			},
			axisX: {
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				},
				viewportMinimum: 1549474200000,
				viewportMaximum: 1549560600000,
				interval: 3600000
			},
			axisY: {
				gridThickness: 0,
				tickLength: 0,
				lineThickness: 0,
				labelFormatter: function(){
					return " ";
				},
			},
			height: 100,
			zoomEnabled: true,
			zoomType: "x",
			toolTip: toolTip,
			legend: legend,
			backgroundColor: "#f4f4f4",
			data: [{
			  type: "splineArea", 
			  showInLegend: false,
			  name: "Outbound",
			  color: "#000000",
			  xValueType: "dateTime",
			  xValueFormatString: "DD MMM YY HH:mm",
			  //yValueFormatString: "#.## Kb/s",
			  legendMarkerType: "square",
			  dataPoints: this.state.outboundDps,
			  fillOpacity: "0",
			  lineThickness:1,
			  toolTipContent: "{y}"
			},{
			  type: "stepLine", 
			  showInLegend: false,
			  name: "System",
			 // yValueFormatString: "#0.#%",
			  color: "#9B9B9B",
			  //xValueType: "dateTime",
			  //xValueFormatString: "DD MMM YY HH:mm",
			  //legendMarkerType: "square",
			  dataPoints: this.state.systemDps,
			  lineDashType: "shortDot",
			  toolTipContent: "({y})"
			}]
		  }
		
		this.diskChartOptions = {
			animationEnabled: true,
			theme: "light2",
			title:{
			  text: "Light rows",
			  horizontalAlign: "left"
			},
			axisX:{
				gridThickness: 0,
				tickLength: 0,
				lineThickness: 0,
				labelFormatter: function(){
					return " ";
				},
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				},
				viewportMinimum: 1549474200000,
				viewportMaximum: 1549560600000,
				interval: 3600000
			},
			axisY: {
				gridThickness: 0,
				tickLength: 0,
				lineThickness: 0,
				labelFormatter: function(){
					return " ";
				},
			},
			height: 100,
			zoomEnabled: true,
			zoomType: "x",
			toolTip: toolTip,
			legend: legend,
			backgroundColor: "#f4f4f4",
			data: [{
			  type: "bar", 
			  showInLegend: "true",
			  name: "Write",
			  color: "#000000",
			  xValueType: "dateTime",
			  xValueFormatString: "DD MMM YY HH:mm",
			  yValueFormatString: "#.## ops/second",
			  legendMarkerType: "square",
			  dataPoints: this.state.writeDps,
			  fillOpacity: "0",
			  lineThickness:1
			},{
			  type: "stepLine", 
			  //showInLegend: "false",
			  //name: "System",
			 // yValueFormatString: "#0.#%",
			  color: "#9B9B9B",
			  //xValueType: "dateTime",
			  //xValueFormatString: "DD MMM YY HH:mm",
			  //legendMarkerType: "square",
			  dataPoints: this.state.systemDps,
			  lineDashType: "shortDot",
			}]
		  }

		this.charts = [];


		this.toggleDataSeries = this.toggleDataSeries.bind(this);

		this.onToolTipUpdated = this.onToolTipUpdated.bind(this);
		this.onToolTipHidden = this.onToolTipHidden.bind(this);
		this.onCrosshairUpdated = this.onCrosshairUpdated.bind(this);
		this.onCrosshairHidden = this.onCrosshairHidden.bind(this);
		this.onRangeChanged = this.onRangeChanged.bind(this);

		this.syncCharts = this.syncCharts.bind(this);
	}

	toggleDataSeries(e){

		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}


	onToolTipUpdated(e) {
		for (var j = 0; j < this.charts.length; j++) {
			if (this.charts[j] !== e.chart)
			  this.charts[j].toolTip.showAtX(e.entries[0].xValue);
		  }
	}

	onToolTipHidden(e) {
		for( var j = 0; j < this.charts.length; j++){
			if(this.charts[j] !== e.chart)
			  this.charts[j].toolTip.hide();
		  }
	}

	onCrosshairUpdated(e) {
		for(var j = 0; j < this.charts.length; j++){
			if(this.charts[j] !== e.chart)
			  this.charts[j].axisX[0].crosshair.showAt(e.value);
		  }
	}
  
	onCrosshairHidden(e) {
		for( var j = 0; j < this.charts.length; j++){
			if(this.charts[j] !== e.chart)
			  this.charts[j].axisX[0].crosshair.hide();
		  }
	}
  
	onRangeChanged(e) {
		for (var j = 0; j < this.charts.length; j++) {

			if (e.trigger === "reset") {
				this.charts[j].options.axisX.viewportMinimum = null;
				this.charts[j].options.axisY.viewportMinimum = null;
				this.charts[j].render();
			} else if (this.charts[j] !== e.chart) {
				this.charts[j].options.axisX.viewportMinimum = e.axisX[0].viewportMinimum;
				this.charts[j].options.axisX.viewportMaximum = e.axisX[0].viewportMaximum;
				this.charts[j].render();
			}
		  }
	}


	syncCharts(syncToolTip, syncCrosshair, syncAxisXRange) {
		for(var i = 0; i < this.charts.length; i++) { 
	
		  //Sync ToolTip
		  if(syncToolTip) {
			// if(!this.charts[i].options.toolTip)
			//   this.charts[i].options.toolTip = {};
			this.charts[i].options.toolTip.updated = this.onToolTipUpdated;
			this.charts[i].options.toolTip.hidden = this.onToolTipHidden;

		  }
	
		  //Sync Crosshair
		  if(syncCrosshair) {
			if(!this.charts[i].options.axisX)
			  this.charts[i].options.axisX = { crosshair: { enabled: true }};
			
			this.charts[i].options.axisX.crosshair.updated = this.onCrosshairUpdated; 
			this.charts[i].options.axisX.crosshair.hidden = this.onCrosshairHidden; 
		  }
	
		  //Sync Zoom / Pan
		  if(syncAxisXRange) {
			this.charts[i].options.zoomEnabled = true;
			this.charts[i].options.rangeChanged = this.onRangeChanged;
		  }
		}
	  } 

	  componentDidMount() {

		//if(systemDps.length === 0) {
		if(this.state.systemDps.length === 0) {


			// Get the State Variable
			let { systemDps, userDps, waitDps, buffersDps, cacheDps, usedDps, inboundDps, outboundDps, writeDps, readDps } = this.state;


			//$.get("https://canvasjs.com/data/gallery/javascript/server-matrics.json", function(data) {		 
				fetch("https://canvasjs.com/data/gallery/javascript/server-matrics.json")
				.then((res) => res.json())
				.then((data) => {
					for (var i = 1; i < data.length; i++) {
		
					systemDps.push({x: parseInt(data[i].time), y: parseFloat(data[i].system)});
					userDps.push({x: parseInt(data[i].time), y: parseFloat(data[i].user)});
					waitDps.push({x: parseInt(data[i].time), y: parseFloat(data[i].wait)});
					buffersDps.push({x: parseInt(data[i].time), y: parseFloat(data[i].buffers)});
					cacheDps.push({x: parseInt(data[i].time), y: parseFloat(data[i].cache)});
					usedDps.push({x: parseInt(data[i].time), y: parseFloat(data[i].used)});
					inboundDps.push({x: parseInt(data[i].time), y: parseFloat(data[i].inbound)});
					outboundDps.push({x: parseInt(data[i].time), y: parseFloat(data[i].outbound)});
					writeDps.push({x: parseInt(data[i].time), y: parseFloat(data[i].write)});
					readDps.push({x: parseInt(data[i].time), y: parseFloat(data[i].read)});
					}
	
					// Set the local State
					this.setState({systemDps, userDps, waitDps, buffersDps, cacheDps, usedDps, inboundDps, outboundDps, writeDps, readDps});

					for( i = 0; i < this.charts.length; i++){
	
						this.charts[i].options.axisX = {
							...this.charts[i].options.axisX,
							labelAngle: 0,
							crosshair: {
							enabled: true,
							snapToDataPoint: true,
							valueFormatString: "HH:mm"
							}
						}
	
						this.charts[i].options.toolTip.updated = this.onToolTipUpdated;
						this.charts[i].options.toolTip.hidden = this.onToolTipHidden;
	
						this.charts[i].options.axisX.crosshair.updated = this.onCrosshairUpdated; 
						this.charts[i].options.axisX.crosshair.hidden = this.onCrosshairHidden;
	
						this.charts[i].options.zoomEnabled = true;
						this.charts[i].options.rangeChanged = this.onRangeChanged;
	
					}
	
					//this.syncCharts(true, true, true); // syncCharts(charts, syncToolTip, syncCrosshair, syncAxisXRange)
	
					// Render the charts
					for( var j = 0; j < this.charts.length; j++){
						this.charts[j].render();
					}

					// Set the Toolbar state to default zoom level - leveraging JS code as the ref object is not available
					// var parentElement = document.getElementsByClassName("canvasjs-chart-toolbar");
					var childElement = document.getElementsByTagName("button");
					for(var i=0;i<childElement.length;i++){
						if(childElement[i].getAttribute("state") === "pan"){
							childElement[i].click();
						}
					}

					// hiding the toolbars for the charts
					var parentElement = document.getElementsByClassName("canvasjs-chart-toolbar");
					for(var i=0; i<parentElement.length; i++) {
						if(parentElement[i]) {
							parentElement[i].style.display = "none";
						}
					}

				});
			}


	  }

	render() {

			const options = {
				animationEnabled: true,
				exportEnabled: true,
				theme: "light2", // "light1", "dark1", "dark2"
				title:{
					text: "Bounce Rate by Week of Year"
				},
				axisY: {
					title: "Bounce Rate",
					includeZero: false,
					suffix: "%"
				},
				axisX: {
					
					interval: 2,
					gridThickness: 0,
					tickLength: 0,
					lineThickness: 0,
					labelFormatter: function(){
						return " ";
					}
				},
				data: [{
					type: "line",
					toolTipContent: "Week {x}: {y}%",
					dataPoints: [
						{ x: 1, y: 64 },
						{ x: 2, y: 61 },
						{ x: 3, y: 64 },
						{ x: 4, y: 62 },
						{ x: 5, y: 64 },
						{ x: 6, y: 60 },
						{ x: 7, y: 58 },
						{ x: 8, y: 59 },
						{ x: 9, y: 53 },
						{ x: 10, y: 54 },
						{ x: 11, y: 61 },
						{ x: 12, y: 60 },
						{ x: 13, y: 55 },
						{ x: 14, y: 60 },
						{ x: 15, y: 56 },
						{ x: 16, y: 60 },
						{ x: 17, y: 59.5 },
						{ x: 18, y: 63 },
						{ x: 19, y: 58 },
						{ x: 20, y: 54 },
						{ x: 21, y: 59 },
						{ x: 22, y: 64 },
						{ x: 23, y: 59 }
					]
				}]
			}
			
			const options2 = {
				theme: "light2",
				animationEnabled: true,
				exportEnabled: true,
				title: {
				  text: "Energy usage for Air Conditioning"
				},
				axisY: {
				  title: "Energy (in terawatt hours)"
				},
				toolTip: {
				  shared: true
				},
				legend: {
				  verticalAlign: "center",
				  horizontalAlign: "right",
				  reversed: true,
				  cursor: "pointer",
				  itemclick: this.toggleDataSeries
				},
				data: [
				  {
					  type: "stackedArea",
					  name: "US",
					  showInLegend: true,
					  xValueFormatString: "YYYY",
					  dataPoints: [
						  {x: new Date(1990, 0), y: 339},
						  {x: new Date(2000, 0), y: 448},
						  {x: new Date(2010, 0), y: 588},
						  {x: new Date(2016, 0), y: 616}
					  ]
				  },
				  {
					  type: "stackedArea",
					  name: "European Union",
					  showInLegend: true,
					  xValueFormatString: "YYYY",
					  dataPoints: [
						  {x: new Date(1990, 0), y: 63},
						  {x: new Date(2000, 0), y: 100},
						  {x: new Date(2010, 0), y: 149},
						  {x: new Date(2016, 0), y: 152}
					  ]
				  },
				  {
					  type: "stackedArea",
					  name: "Japan",
					  showInLegend: true,
					  xValueFormatString: "YYYY",
					  dataPoints: [
						  {x: new Date(1990, 0), y: 48},
						  {x: new Date(2000, 0), y: 100},
						  {x: new Date(2010, 0), y: 119},
						  {x: new Date(2016, 0), y: 107},
				  ]
				  },
				  {
					  type: "stackedArea",
					  name: "China",
					  showInLegend: true,
					  xValueFormatString: "YYYY",
					  dataPoints: [
						  {x: new Date(1990, 0), y: 7 },
						  {x: new Date(2000, 0), y: 45},
						  {x: new Date(2010, 0), y: 243},
						  {x: new Date(2016, 0), y: 450},
					  ]
				  },
				  {
					  type: "stackedArea",
					  name: "India",
					  showInLegend: true,
					  xValueFormatString: "YYYY",
					  dataPoints: [
						  {x: new Date(1990, 0), y: 6},
						  {x: new Date(2000, 0), y: 22},
						  {x: new Date(2010, 0), y: 49},
						  {x: new Date(2016, 0), y: 91},
					  ]
				  }
			  ]
			}

		return (
		<>
		<div>
			{/* <h1>React Line Chart</h1> */}
			
			{/* <CanvasJSChart options = {options} /> */}
			{/* onRef={ref => this.chart = ref}  You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		<div class="row">

			{/* <h1>React Stacked Area Chart</h1>
			<CanvasJSChart options = {cpuChartOptions} 
				onRef={ref => this.chart = ref}
			/> */}

		<CanvasJSChart options = {this.cpuChartOptions} onRef={ref1 => this.charts[0] = ref1} />
		<CanvasJSChart options = {this.memoryChartOptions} onRef={ref2 => this.charts[1] = ref2} />
		<CanvasJSChart options = {this.networkChartOptions} onRef={ref3 => this.charts[2] = ref3} />
		{/* <CanvasJSChart options = {diskChartOptions} onRef={ref4 => this.charts[3] = ref4} /> */}
	  </div>
	  </>
		);
	}
}

export default LineChart;