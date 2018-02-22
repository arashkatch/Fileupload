//angular.module('Orbital').controller('loginController', ['$scope', SearchCtrl])
//{
//    $scope.login = function () {
//        //var pics = [
//        //    {
//        //        url: "svg/camera.png";
//        //    }, {
//        //        url: "svg/email.png";
//        //    }, {
//        //        url: "svg/person.png";
//        //    }
//        $scope.pictures = "d";
//        console.log("test");
//    };
//}

angular.module('Orbital').controller('SearchController', ['$scope', '$http', function ($scope, $http) {

    $scope.loginData = {
        searchText: "",
    };

    $scope.login = function () {
        $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = "e3884919baa54cd6ab7d16ac3f9fbf15";
        $http.get("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/orbital_hackathon")
            .then(function (response) {
                $scope.details = response;
                console.log("success");
                console.log(response);

            }).catch(function (e) {
                console.log("error");
            });

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
            console.log($scope.details );
     };
}]);

