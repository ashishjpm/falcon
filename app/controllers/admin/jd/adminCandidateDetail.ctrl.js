/**
* @ngdoc function
* @name falcon.controller.AdminCandidateDetailCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
  .controller('AdminCandidateDetailCtrl', ['$scope', '$state', 'CommonService', 'AdminService', '$stateParams', '$timeout',
    function($scope, $state, CommonService, AdminService, $stateParams, $timeout) {
    $scope.candidateDetail = {};

    function init(){
    	$scope.root.admin.showAddBtn = false;
        $scope.root.adminSelected = "Candidate Details";
        $scope.candidateDetail.showDetail = false;
        $scope.candidateDetail.type = ['Naukri', 'Github', 'Linkedin'];
        $scope.candidateDetail.typeSelected = 'Naukri';
        $scope.candidateDetail.data = [];
        $scope.candidateDetail.loader = false;
        getCandidateDetails();
    }
    function getCandidateDetails() {
        $scope.candidateDetail.data = {
          "githubUserDetails": {
            "githubUserId": "mojombo",
            "username": "mojombo",
            "followers": 21063,
            "languages": [
              "CSS",
              "Scheme",
              "C",
              "JavaScript",
              "Perl",
              "Erlang",
              "Ruby"
            ],
            "gitHubScore": 155.78545,
            "repositories": 60,
            "reposByLanguage": {
              "CSS": 2,
              "Scheme": 1,
              "C": 1,
              "JavaScript": 2,
              "Perl": 1,
              "Erlang": 4,
              "Ruby": 12
            }
          },
          "linkedInProfileResponse": {
            "firstname": "Anand",
            "lastname": "Sharma",
            "linkedinIdentifier": "anand-sharma-2542a1167",
            "workExperiences": [],
            "qualifications": [],
            "skillsAndEndorsement": {
              "Business Strategy": "83",
              "Product Marketing": "9",
              "E-commerce": "75",
              "Digital Marketing": "32",
              "Strategic Planning": "6",
              "Corporate Development": "1",
              "Marketing": "28",
              "Retail": "7",
              "Business Planning": "2",
              "Sales": "7",
              "Management Consulting": "57",
              "Start-ups": "42",
              "Business Development": "33",
              "Project Planning": "3",
              "Market Research": "11",
              "Venture Capital": "6",
              "Analytics": "11",
              "Customer Relationship Management (CRM)": "2",
              "Entrepreneurship": "39",
              "Online Marketing": "6",
              "Strategy": "96",
              "Strategic Consulting": "15",
              "Market Analysis": "7",
              "Supply Chain Management": "5",
              "CRM": "10"
            }
          },
          "naukriProfileDto": {
            "user": null,
            "email": null,
            "name": "Yash Rastogi",
            "gender": null,
            "maritalStatus": null,
            "skills": "Fresher,Design Engineering,Project Management,Plant Engineering,Electrical Engineering,Detail Engineering,New Product Development,Quality Assurance,Product Designing,Process Enhancement,Physical Designing,AutoCAD, MS Office Word",
            "summary": null,
            "lastActive": null,
            "jobSummary": "A focused professional in Design Engineering,Project Management,Plant Engineering,Electrical Engineering,Detail Engineering,New Product Development,Quality Assurance,Product Designing,Process Enhancement,Physical Designing,AutoCAD",
            "currentPackage": null,
            "totalExperience": null,
            "currentDesignation": "N/A",
            "currentOrganization": "N/A",
            "previousDesignation": "N/A",
            "previousOrganization": "N/A",
            "currentLocation": "Moradabad",
            "preferredLocation": null,
            "role": "Fresher",
            "industry": null,
            "noticePeriod": null,
            "functionalArea": "Engineering Design / R&D",
            "highestDegree": "B.Tech/B.E. [Electrical]",
            "qualifications": [
              {
                "endYear": "(2017)",
                "qualification": "B.Tech/B.E.",
                "college": "AKTU Lucknow",
                "startYear": null
              }
            ],
            "workExperiences": null,
            "unOrganizedData": null
          }
        }
        $scope.candidateDetail.data.naukriProfileDto.skills = $scope.candidateDetail.data.naukriProfileDto.skills.split(',');
        // AdminService.getCandidateDetails($stateParams.id).then(
        //     function(response){
        //         $scope.candidateDetail.data = response.data.responseObject;
        //         $scope.candidateDetail.loader = false;
        //     },
        //     function(err){
        //         $scope.candidateDetail.loader = false;
        //     }
        // );
    }

    init();

  }]);
}());
