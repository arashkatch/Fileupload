'use strict';

/**
 * Route configuration for the Orbital module.
 */
angular.module('Orbital').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('upload', {
                url: '/upload',
                templateUrl: 'templates/upload.html',
                controller: 'UploadController'
            })
            .state('add', {
                url: '/add',
                templateUrl: 'templates/traine.html',
                controller: 'TraineController'
            })
             .state('search', {
                 url: '/',
                 templateUrl: 'templates/search.html',
                 controller: 'SearchController'
             })
           
    }
]);