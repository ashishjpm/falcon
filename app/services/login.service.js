/**
 * Service of the falcon app
 *
 * @class falcon.service.LoginService
 * @memberOf falcon.LoginService
 * @author Ashish Mishra <ashishjpm@gmail.com>
 */

;
(function() {
    falcon
        .factory('LoginService', function($http, AppConstant) {

        	function postLogin(username, password){
        		var form = new FormData();
        		form.append('username', username);
        		form.append('password', password);

                $.ajax({
                   type: 'POST',
                   url: AppConstant.base + 'login',
                   data: {
                        username: username,
                        password: password
                   },
                   dataType: 'json',
                   success: function(res) {
                    console.log('hello');
                   }
                });

        	}

            return {
            	postLogin: postLogin
            };
        });
}());
