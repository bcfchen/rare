(function () {

    angular
        .module("rare")
        .factory("transformer", transformer);

    function transformer() {
        var service = {
            transform: transform
        };

        return service;

        /* method implementations */

        function transform(source, modelClass){
            if (angular.isArray(source)){
                return transformCollection(source, modelClass);
            }

            return transformSingleObj(source, modelClass);
        }

        function transformCollection(collection, modelClass){
            var transformedCollection = [];
            collection.forEach(function(item){
                var transformedObj = transformSingleObj(item, modelClass);
                transformedCollection.push(transformedObj);
            });

            return transformedCollection;
        }

        function transformSingleObj(sourceObj, modelClass){
            var modelObj = new modelClass();
            Object.keys(modelObj).forEach(function(key){
                modelObj[key] = sourceObj[key];
            });

            return modelObj;
        }
    }
}());