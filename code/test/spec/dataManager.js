describe('Reusable Data Manager Module', function(){
    var dataManager,
        fixturePath = 'base/test/fixtures/';

    jasmine.getJSONFixtures().fixturesPath = fixturePath;
    d3.json.get = function(){
        return getJSONFixture('dummyData.json');
    };

    describe('Initialization', function(){

        it('defines a dataManager object', function(){
            expect(demo.graphs.dataManager).toBeDefined();
        });

        it('can be called like a constructor', function(){
            expect(typeof demo.graphs.dataManager).toBe('function');
            expect(demo.graphs.dataManager()).toBeDefined();
        });
    });

    describe('Interface', function(){

        beforeEach(function(){
            dataManager = demo.graphs.dataManager();

            spyOn(dataManager, 'on').and.callThrough();
        });

        it('triggers dataReady when data loaded', function(done){
            var dataReadyHandler = function(result){
                done();
            };

            dataManager.on('dataReady', dataReadyHandler);
            dataManager.loadJsonData(fixturePath + 'dummyData.json', function(d){
                d = d;
            });

            expect(dataManager.on).toHaveBeenCalled();
            expect(dataManager.on).toHaveBeenCalledWith('dataReady', dataReadyHandler);
        });

        it('triggers dataError when data point fails', function(done){
            var dataErrorHandler = function(result){
                done();
            };

            dataManager.on('dataError', dataErrorHandler);
            dataManager.loadJsonData(fixturePath + 'fake.json', function(d){
                d = d;
            });

            expect(dataManager.on).toHaveBeenCalled();
            expect(dataManager.on).toHaveBeenCalledWith('dataError', dataErrorHandler);
        });

        it('returns loaded data', function(done){
            var newData;

            dataManager.on('dataReady', function(result){
                newData = result;
                expect(newData).toHaveLength(12);
                done();
            });
            dataManager.loadJsonData(fixturePath + 'dummyData.json', function(d){
                d = d;
            });
        });

    });

});