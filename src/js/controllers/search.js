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
        $scope.pictures = [];
        $scope.showFaces = false;
        console.log("search");
        console.log($scope.searchText);
        $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = "e3884919baa54cd6ab7d16ac3f9fbf15";
        $http.get("http://localhost:55556/api/images/tag=" + $scope.searchText)
            .then(function(response) {
                console.log(response.data);
                $scope.pictures = response.data;
                

            }).catch(function(e) {
                console.log("error");
            });



    };
    $scope.detectAndIdentify = function () {
        $scope.showFaces = true;

        // detect faces ids 
        $scope.facePictures = [];
        console.log($scope.allPictures);

        if ($scope.searchText != "any") {
            console.log($scope.searchText);
            $scope.allPictures.forEach(function (pic) {

                console.log("https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/" + pic.name);

                $http.defaults.headers.common["Ocp-Apim-Subscription-Key"] = "e3884919baa54cd6ab7d16ac3f9fbf15";
                $http.defaults.headers.common["Content-Type"] = "application/json";
                $http.post("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false",
                    {
                        "url": "https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/" + pic.name
                    }
                )
                    .success(function (response) {
                        $scope.details = response;
                        console.log("success first loop check next log");
                        console.log(response);
                        var data = response;


                        // identify each face
                        var detectedFaces = [];
                        data.forEach(function (face) {
                            var faceId = face.faceId;
                            detectedFaces.push(faceId);
                        });

                        //data.forEach(function (face) {

                        console.log(detectedFaces);
                        $http.post("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify",
                            {
                                "personGroupId": "orbital_hackathon",
                                "faceIds": detectedFaces,
                                "maxNumOfCandidatesReturned": 1,
                                "confidenceThreshold": 0.7
                            }
                        )
                            .success(function (response) {
                                $scope.details = response;
                                console.log("success inside loop");
                                console.log(response);
                                response.forEach(function (face) {
                                    //|| $scope.searchText!="any"
                                    if (face.candidates.length > 0) {
                                        console.log("success inside if statement");
                                        console.log($scope.pictures);
                                        if ($scope.facePictures.indexOf("https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/" + pic.name) == -1) {
                                            $scope.facePictures.push("https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/" + pic.name);
                                        }

                                    }
                                });


                            }).error(function (e) {
                                console.log("error second try");
                            });
                        // });

                    }).error(function (e) {
                        console.log("error");
                    });


                console.log($scope.pictures);

            });
        }
        else {
            $scope.allPictures.forEach(function (pic) {
                console.log("not ");
                console.log($scope.searchText);
                $scope.facePictures.push("https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/" + pic.name);
            });
        }

    };

    function init() {

        $scope.files = getFiles("/data");
        console.log($scope.files);
     
    }

    function getFiles(dir) {
        $scope.allPictures = [{ name: "detection1.jpg" }, { name: "detection2.jpg" }, { name: "detection3.jpg" }, { name: "detection4.jpg" }, { name: "detection5.jpg" }, { name: "identification1.jpg" }, { name: "identification2.jpg" }, { name: "identification3.jpg" }];
        console.log($scope.allPictures);
    }

}]);

