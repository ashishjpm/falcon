/**
 * Main module for the applications
 * @namespace falcon
 * @author Ashish Mishra <ashishjpm@gmail.com>
 */
'use strict';

var falcon = angular.module('falcon', ['ui.router','720kb.datepicker']);

falcon.run(function($state, $rootScope){
    $rootScope.$on('$stateChangeSuccess', function(){
        $(document).ready(function(){
        	$.material.init();
        });
    });
    $rootScope.$state = $state;
})
