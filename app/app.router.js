/**
 * Main router for the applications
 * @namespace falcon
 * @author Ashish Mishra <ashishjpm@gmail.com>
 */
falcon
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    //$urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/partials/login/login.html',
            controller: 'LoginCtrl'
        })

    //=========  Home routes  =========    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/partials/home/home.html',
            abstract: true
        })
    $stateProvider
        .state('home.contestList', {
            url: '/contestList',
            templateUrl: 'app/partials/home/contestList/contestList.html',
            controller: 'ContestListCtrl'
        })
    $stateProvider
        .state('home.contestDetail', {
            url: '/contestDetail',
            templateUrl: 'app/partials/home/contestDetail/contestDetail.html',
            controller: 'ContestDetailCtrl'
        })
    $stateProvider
        .state('home.contestResult', {
            url: '/contestResult',
            templateUrl: 'app/partials/home/contestResult/contestResult.html',
            controller: 'ContestResultCtrl'
        })
    $stateProvider
        .state('home.contestAttempt', {
            url: '/contestAttempt',
            templateUrl: 'app/partials/home/contestAttempt/contestAttempt.html',
            controller: 'ContestAttemptCtrl'
        })

    //=========  Admin routes  =========
    $stateProvider
        .state('admin', {
            url: '/admin',
            templateUrl: 'app/partials/admin/admin.html',
            abstract: true
        })
    $stateProvider
        .state('admin.contest', {
            url: '/contest',
            templateUrl: 'app/partials/admin/contest/contest.html',
            controller: 'AdminContestCtrl'
        })
    $stateProvider
        .state('admin.contestCreate', {
            url: '/contestCreate',
            templateUrl: 'app/partials/admin/contestCreate/contestCreate.html',
            controller: 'AdminContestCreateCtrl'
        })
    $stateProvider
        .state('admin.question', {
            url: '/question',
            templateUrl: 'app/partials/admin/question/question.html',
            controller: 'QuestionCtrl'
        })
    $stateProvider
        .state('admin.questionDetail', {
            url: '/questionDetail',
            templateUrl: 'app/partials/admin/questionDetail/questionDetail.html',
            controller: 'QuestionDetailCtrl'
        })
    $stateProvider
        .state('admin.questionCreate', {
            url: '/questionCreate',
            templateUrl: 'app/partials/admin/questionCreate/questionCreate.html',
            controller: 'QuestionCreateCtrl'
        })
    $stateProvider
        .state('admin.result', {
            url: '/result',
            templateUrl: 'app/partials/admin/result/result.html',
            controller: 'ContestResultCtrl'
        })


    $stateProvider
        .state('admin.jd', {
            url: '/jd',
            templateUrl: 'app/partials/admin/jd/jd.html',
            controller: 'AdminJdCtrl'
        })    
    $stateProvider
        .state('admin.jdCreate', {
            url: '/jdCreate',
            templateUrl: 'app/partials/admin/jd/jdCreate.html',
            controller: 'AdminJdCreateCtrl'
        })
    $stateProvider
        .state('admin.jdDetail', {
            url: '/jdDetail/:id',
            templateUrl: 'app/partials/admin/jd/jdDetail.html',
            controller: 'AdminJdDetailCtrl'
        })
});
