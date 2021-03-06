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
                url: '/',
                templateUrl: 'templates/upload.html'
            })
            .state('add', {
                url: '/add',
                templateUrl: 'templates/add.html'
            })
             .state('search', {
                 url: '/search',
                 templateUrl: 'templates/search.html'
             })
           
    }
]);