'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('upload', {
                url: '/',
                templateUrl: 'templates/upload.html'
            })
             .state('search', {
                 url: '/search',
                 templateUrl: 'templates/search.html'
             })
           
    }
]);