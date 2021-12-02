angular.module('myApp', [
	'ui.router',
	'LocalStorageModule',
	'angularUtils.directives.dirPagination',
	'ui.bootstrap',
	'ngJsonExportExcel',
	'toastr',
	'chart.js',
	'ja.qr',
	'ngCookies',
	'ui.tinymce',
	'ngRoute',
	'ngMaterial',
	
	'myApp.main',
	'myApp.home',
	'myApp.login',
	'myApp.generic',
	'myApp.spindleServiceRequest',
	'myApp.myDestails',
	
,
])

.value('_', window._)

.constant('ApiEndpoint', {
	//url: 'http://allstatenew.cloudjiffy.net//',
	//url: 'http://assetmanagement.adp.ind.in:8085/',
	url: 'http://localhost:8085/',
	//url: 'http://skf1.adp.ind.in:8085/',
	//url: 'http://asseterp.adp.ind.in:8082/',
userKey : 'allState',
	headerKey : ''
})
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }else if($location.path() == '/login' && $rootScope.globals.currentUser){
            	$location.path('/main/home');
            }
        });
    }])

.config(function($urlRouterProvider,$locationProvider) {
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/main/home');
	 // use the HTML5 History API
	
	 $locationProvider.hashPrefix('');
}); 