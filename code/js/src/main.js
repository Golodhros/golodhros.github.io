demo.core = {
    // D3 Reusable API Chart
    // BarGraph
    barGraph: {
        selector: '.initBarGraph',
        dataManager: null,
        config: {
            margin : {
                top   : 20,
                bottom: 30,
                right : 20,
                left  : 40
            },
            aspectWidth: 13,
            aspectHeight: 4,
            animation: 'linear',
            dataURL: 'json/barGraphData.json'
        },
        defaultParams: function(){
            return {};
        },
        init: function(idx, ele, params){
            this.$el = ele;
            this.requestNewData();
            this.addEvents();
        },
        addEvents: function(){
            var _this = this;
            //Callback triggered by browser
            window.onresize = function() {
                _this.drawGraph();
            };
        },
        drawGraph: function(){
            var _this  = this,
                config = this.config,
                width  = this.$el.width(),
                height = Math.ceil((width * config.aspectHeight) / config.aspectWidth);

            this.resetGraph();
            this.barChart = demo.graphs.barChart()
                .width(width).height(height).margin(config.margin);

            this.container = d3.select(this.$el[0])
                .datum(this.data)
                .call(this.barChart);
        },
        handleReceivedData: function(result){
            this.data = result;
            this.drawGraph();
        },
        dataCleaningFunction: function(d){
            // Due to timestamp on JS being on miliseconds
            d.frequency = +d.frequency;
            d.letter = d.letter;
        },
        requestNewData: function(el){
            var dataPointURL = this.config.dataURL;

            this.dataManager = demo.graphs.dataManager();
            this.dataManager.on('dataError', function(errorMsg){
                console.log('error:', errorMsg);
            });
            this.dataManager.on('dataReady', $.proxy(this.handleReceivedData, this));
            this.dataManager.loadJsonData(dataPointURL, this.dataCleaningFunction);
        },
        resetGraph: function(){
            this.$el.find('svg').remove();
        }
    }
};

$(function(){
    demo.core.barGraph.init(0, $('.bar-graph'));
});