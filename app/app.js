

angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state({
            name: 'home',
            url: '/home',
            template: 'home state'
        })
        .state({
            name: 'about',
            url: '/about',
            template: 'about state'
            // this resolve fail will log via stateChangeError message, but will NOT forward to otherwise state
            // resolve: {
            //     fail: function() {
            //         throw 'lala';
            //     }
            // }
        })
        .state({
            name: 'other',
            url: '/other',
            template: 'other state'
        });

    $urlRouterProvider
        .otherwise('/other');


})
.run(function($rootScope) {

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        console.error('Failed to change to state: %s\nError: %s', toState.name, error);
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
        console.log('$stateChangeSuccess', toState.name);
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        console.log('$stateChangeStart', toState.name, toParams);
        if (toState.name === 'about') {
            event.preventDefault();
        }
    });

})
.controller('mainCtrl', function() {



})