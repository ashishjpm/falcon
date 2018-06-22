/**
 * Service of the falcon app
 *
 * @class falcon.service.CommonService
 * @memberOf falcon.CommonService
 * @author Ashish Mishra <ashishjpm@gmail.com>
 */

;
(function() {
    falcon
        .factory('CommonService', function($http) {

        	function getTimeInSecs(){}
        	function tsToDateString(ts){
                var d = new Date(ts);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var year = d.getFullYear();
                var month = months[d.getMonth()];
                var date = d.getDate();
                return date + " " + month + " " + year;
            }

            return {
            	getTimeInSecs: getTimeInSecs,
            	tsToDateString: tsToDateString
            };
        });
}());
