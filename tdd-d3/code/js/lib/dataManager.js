var demo = demo || {};
demo.graphs = demo.graphs || {};

demo.graphs.dataManager = function module(){
    var exports = {},
        dispatch = d3.dispatch('dataReady', 'dataLoading', 'dataError'),
        data;

    d3.rebind(exports, dispatch, 'on');

    exports.loadJsonData = function(_file, _cleaningFn){
        var loadJson = d3.json(_file);

        loadJson.on('progress', function(){
            dispatch.dataLoading(d3.event.loaded);
        });

        loadJson.get(function (_err, _response){
            if(!_err){
                _response.data.forEach(function(d){
                    _cleaningFn(d);
                });
                data = _response.data;
                dispatch.dataReady(_response.data);
            }else{
                dispatch.dataError(_err.statusText);
            }
        });
    };

    // If we need more types of data geoJSON, csv, etc. we will need
    // to create methods for them

    exports.getCleanedData = function(){
        return data;
    };

    return exports;
};