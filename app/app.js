angular.module('app', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state({
                name: 'init'
            })
            .state({
                name: 'home',
                url: '/home',
                template: 'home state',
                controller: function () {
                    console.log('home ctrl')
                }
            })
            .state({
                name: 'fail',
                url: '/fail',
                template: 'fail state'
                // this resolve fail will log via stateChangeError message, but will NOT forward to otherwise state
                // resolve: {
                //     fail: function() {
                //         throw 'lala';
                //     }
                // }
            })
            .state({
                name: 'test',
                url: '/test/:id',
                template: 'test state',
                controller: function () {
                    console.log('test ctrl')
                }
            })
            .state({
                name: 'parent',
                url: '/parent',
                template: '<div>parent state</div><ui-view></ui-view>',
                controller: function ($rootScope, $state, Global) {
                    console.log('parent ctrl');
                }
            })
            .state({
                name: 'parent.child1',
                url: '/parent/child1',
                template: '<div>child1 state</div>',
                controller: function () {
                    console.log('child1 ctrl')
                }
            })
            .state({
                name: 'parent.child2',
                url: '/parent/child2',
                template: '<div>child2 state</div>',
                controller: function () {
                    console.log('child2 ctrl')
                }
            })
            .state({
                name: 'other',
                url: '/other',
                template: 'other state'
            });

        $urlRouterProvider
            .otherwise('/parent');


    })
    .value('Global', {val: undefined})

    .run(function ($rootScope, $stateParams, Global, $state, $timeout) {

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.error('Failed to change to state: %s\nError: %s', toState.name, error);
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
            console.log('$stateChangeSuccess', toState.name, $stateParams);
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            console.log('$stateChangeStart', toState.name, toParams);



            // if (toState.name === 'fail') {
            //     console.log('preventDefault()');
            //     event.preventDefault();
            // }

            if (toState.name === 'init') {
                return;
            }

            if (!Global.init) {
                console.log('init preventDefault()');
                event.preventDefault();
                $state.go('init');

                $timeout(function() {
                    Global.init = true;
                    $state.go(toState.name, toParams);
                },1000);
                return;
            }


            if (toState.name == 'parent') {
                console.log('parent preventDefault()');
                event.preventDefault();

                $timeout(function() {
                    if (Global.val == '1')
                        $state.go('parent.child1');
                    else
                        $state.go('parent.child2');
                }, 1000);
            }

        });


    })

    .controller('mainCtrl', function ($scope, Global) {

        $scope.Global = Global;

    })