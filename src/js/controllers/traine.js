angular.module('Orbital').controller('TraineController', ['$scope', '$http', function ($scope, $http) {

    init();

    $scope.personName = "";
    $scope.gridOptions = {
        enableRowSelection: true,
        multiSelect: true,
        modifierKeysToMultiSelect: false,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        enableSorting: true,
        columnDefs: [
            { field: 'name', displayName: 'name' },
            { field: 'personId', displayName: 'personId' }
        ],
        data: $scope.persons
    };
    $scope.load = function ()
    {
        init();
    }

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

        //r.readAsBinaryString(data);
    }
    $scope.create = function () {
        //get group id

        $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = "e3884919baa54cd6ab7d16ac3f9fbf15";
        $http.post("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/Arash/persons",
            {
                "name": "Person1",
                "userData": "User-provided data attached to the person"
            }
        )
            .success(function (response) {
                $scope.details = response;
                console.log("success");
                console.log(response);

            }).error(function (e) {
                console.log("error");
            });

    };
    $scope.train = function () {
        //get group id
        //$http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = "e3884919baa54cd6ab7d16ac3f9fbf15";
        //$http.get("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/orbital_hackathon")
        //    .then(function (response) {
        //        $scope.details = response;
        //        console.log("success");
        //        console.log(response);

        //    }).catch(function (e) {
        //        console.log("error");
        //    });

        //list of people
        $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = "e3884919baa54cd6ab7d16ac3f9fbf15";
        $http.get("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/orbital_hackathon/persons?top=1000")
            .then(function (response) {
                $scope.details = response;
                console.log("success");
                console.log(response);

            }).catch(function (e) {
                console.log("error");
            });

        // face ids didn't w
        //$http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = "e3884919baa54cd6ab7d16ac3f9fbf15";
        //$http.post("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/group")
        //    .then(function (response) {
        //        $scope.details = response;
        //        console.log("success");
        //        console.log(response);

        //    }).catch(function (e) {
        //        console.log("error");
        //    });
        //var pics = [
        //    {
        //        url: "img/camera.png"
        //    },
        //    {
        //        url: "img/email.png"
        //    },
        //    {
        //        url: "img/person.png"
        //    }
        // ];
        // $scope.pictures = pics;

    };

    function init() {

        $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = "e3884919baa54cd6ab7d16ac3f9fbf15";
        $http.get("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/orbital_hackathon/persons?top=1000")
            .then(function(response) {
                $scope.details = response;
                $scope.persons = [];
                response.data.forEach(function(e) {
                    $scope.persons.push({ 'name': e.name, 'personId': e.personId });
                });
                $scope.gridOptions.data = $scope.persons;

            }).catch(function(e) {
                console.log("error");
            });
    }

}]);

