/**
* Service of the falcon app
*
* @class falcon.service.AdminService
* @memberOf falcon.AdminService
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
    falcon
    .factory('AdminService', function($http, AppConstant) {
        function getContestList(){
            return $http({
                url: AppConstant.api + 'contest/view-contest-list',
                method: 'GET',
            })
        }

        function createContest(contest){
            return $http({
                url: AppConstant.api + 'contest/create',
                method : 'POST',
                data : contest
            })
        }

        function addQuestionToContestTemplate(contest, questions){
            return $http({
                url: AppConstant.api + 'contest/'+contest+'/add-questions',
                method : 'POST',
                data : questions
            })
        }

        function fetchContestQuestions(contest){
            return $http({
                url: AppConstant.api + 'question/getQuestions',
                method : 'GET'
            })
        }

        function saveConfiguration(contest, configs){
            return $http({
                url: AppConstant.api + 'contest/'+contest+'/add-contestant',
                method : 'POST',
                data : configs
            })
        }

        function getCategories(){
            return $http({
                url: AppConstant.api + 'question/getCategories',
                method : 'GET'
            })
        }
        function getAllQuestions(){
            return $http({
                url: AppConstant.api + 'question/getAllQuestions',
                method: 'GET'
            })
        }
        function createQuestion(data){
            return $http({
                url: AppConstant.api + 'question/save',
                method: 'POST',
                data: data
            })
        }
        function getQuestionDetails(id){
            return $http({
                url: AppConstant.api + 'question/getQuestion/'+id,
                method: 'GET'
            })
        }
        function getContestResult(id){
            return $http({
                url: AppConstant.api + '/quesstionresponse/view-contest/'+id,
                method: 'GET'
            })
        }

        function getJdList(){
            return $http({
                url: AppConstant.api_vishal + 'jd/list',
                method: 'GET'
            })
        }
        function createJdList(jd){
            return $http({
                url: AppConstant.api_vishal + 'jd/detail',
                method: 'POST',
                data : jd
            })
        }
        function getJdDetail(id){
            return $http({
                url: AppConstant.api_vishal + 'jd/detail/'+ id,
                method: 'GET'
            })
        }
        function getCandidateList(id){
            return $http({
                url: AppConstant.api_vishal + 'shortlist/getCandidates/'+ id,
                method: 'GET'
            })
        }

        return {
            getContestList: getContestList,
            completeFirstStep: createContest,
            completeSecondStep:addQuestionToContestTemplate,
            fetchContestQuestions : fetchContestQuestions,
            saveContestConfigration:saveConfiguration,
            getCategories : getCategories,
            getAllQuestions: getAllQuestions,
            createQuestion: createQuestion,
            getQuestionDetails: getQuestionDetails,
            getContestResult: getContestResult,
            getJdList: getJdList,
            createJdList: createJdList,
            getJdDetail: getJdDetail,
            getCandidateList: getCandidateList
        };
    });
}());
