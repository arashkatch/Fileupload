angular.module('Orbital').controller('traineController', ['$scope', '$http', function ($scope, $http) {

    $scope.add = function () {
        var f = document.getElementById('file').files[0],
            r = new FileReader();

        var xhr = new XMLHttpRequest()

        r.onloadend = function (e) {
            var data = e.target.result;
            //send your binary data via $http or $resource or do anything else with it
            xhr.open("POST", "/fileupload")
            xhr.send(fd)
        }

        r.readAsBinaryString(data);
    }


}]);

