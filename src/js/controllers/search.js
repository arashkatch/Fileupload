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


    init();

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
    $scope.searchObjects = function() {
        // detect faces ids 
        console.log("search");
        console.log($scope.searchText);
        $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = "e3884919baa54cd6ab7d16ac3f9fbf15";
        $http.get("http://10.211.70.102:5001/api/images/tag=" + $scope.searchText)
            .then(function(response) {
                console.log(response.data);
                $scope.pictures = response.data;
                

            }).catch(function(e) {
                console.log("error");
            });



    };
    $scope.detectAndIdentify = function () {
        // detect faces ids 
        $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = "e3884919baa54cd6ab7d16ac3f9fbf15";
        $http.defaults.headers.common["Content-Type"] = "application/json";
        $http.post("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false",
            {
                "url": "https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/identification1.jpg"
            }
            )
            .success(function (response) {
                $scope.details = response;
                console.log("success");
                console.log(response);
                var data =  response;


                // identify each face
                data.forEach(function (face) {

                    console.log(face.faceId);
                    $http.post("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify",
                        {
                            "personGroupId": "orbital_hackathon",
                            "faceIds": [
                                face.faceId,

                            ],
                            "maxNumOfCandidatesReturned": 1,
                            "confidenceThreshold": 0.5
                        }
                    )
                        .success(function (response) {
                            $scope.details = response;
                            console.log("success");
                            console.log(response);

                        }).error(function (e) {
                            console.log("error");
                        });
                });

            }).error(function (e) {
                console.log("error");
            });

      //  });
       
           

    };

    function init() {

        $scope.files = getFiles("/data");
        console.log($scope.files);
        //console.log("init");
        //$scope.searchText = "dd ";
        //console.log($scope.searchText);
    }

    function getFiles(dir) {
        $scope.allPictures = [{ name :"detection1.jpg", name: "detection2.jpg", name:  "detection3.jpg", name: "detection4.jpg",name: "detection5.jpg"}];
    }

}]);
