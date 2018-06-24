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
            console.log("questions", questions);
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

        function activateContest(contestId) {
            return $http({
                url: AppConstant.api + 'contest/'+ contestId + '/status/active',
                method : 'GET'
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
                url: AppConstant.api_void + 'jd/list',
                method: 'GET'
            })
        }
        function createJdList(jd){
            return $http({
                url: AppConstant.api_void + 'jd/detail',
                method: 'POST',
                data : jd
            })
        }
        function getJdDetail(id){
            return $http({
                url: AppConstant.api_void + 'jd/detail/'+ id,
                method: 'GET'
            })
        }
        function getCandidateList(id){
            return $http({
                url: AppConstant.api_void + 'shortlist/getCandidates/'+ id,
                method: 'GET'
            })
        }
        function submitSelectedCandidate(candidateIdList, id){
            return $http({
                url: AppConstant.api_void + 'shortlist/selectCandidates/'+ id,
                method: 'POST',
                data : {'selectedIds': candidateIdList}
            })
        }
        function getSelectedCandidateList(id) {
            return $http({
                url: AppConstant.api_void + 'shortlist/getSelectedCandidates/'+ id,
                method: 'GET'
            })
        }
        function rejectCandidate(jdId,candidateId) {
            return $http({
                url: AppConstant.api_void + 'shortlist/rejectCandidate?jdId='+ jdId + '&candidateId=' + candidateId,
                method: 'GET',
            })
        }
        function candidateAction(jdId,candidateId,action) {
            return $http({
                url: AppConstant.api_void + 'action/'+ action,
                method: 'POST',
                data : {
                    'jdId': jdId,
                    'candidateId': candidateId
                }
            })
        }
        function getCandidateDetails(candidateId) {
            return $http({
                url: AppConstant.api_void + 'profile/getCandidateProfile?candidateId='+ candidateId,
                method: 'GET'
            })
        }

        function fetchSelectedQuestions(data) {
            return $http({
                url: AppConstant.api + 'question/getFixedQuestions',
                method: 'POST',
                data : data
            })
        }

        return {
            getContestList: getContestList,
            completeFirstStep: createContest,
            completeSecondStep:addQuestionToContestTemplate,
            fetchContestQuestions : fetchContestQuestions,
            saveContestConfigration:saveConfiguration,
            activateContest: activateContest,
            getCategories : getCategories,
            getAllQuestions: getAllQuestions,
            createQuestion: createQuestion,
            getQuestionDetails: getQuestionDetails,
            getContestResult: getContestResult,
            getJdList: getJdList,
            createJdList: createJdList,
            getJdDetail: getJdDetail,
            getCandidateList: getCandidateList,
            submitSelectedCandidate: submitSelectedCandidate,
            getSelectedCandidateList: getSelectedCandidateList,
            rejectCandidate: rejectCandidate,
            candidateAction: candidateAction,
            getCandidateDetails: getCandidateDetails,
            fetchSelectedQuestions: fetchSelectedQuestions
        };
    });
}());
