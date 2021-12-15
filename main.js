angular.module('counter', [])

.constant('$quotes', quotes)

.controller('mainController', function($scope, $filter, $quotes) {

    $scope.Msg = new bootstrap.Modal(document.getElementById('modalMsg'), {keyboard: false});

    $scope.inProgress = false;

    $scope.settings = {
        mode: 'learn',
        maxTaskCount: 5
    }    

    $scope.task = {
        taskNumber: 0,
        v1: '',
        v2: '',
        answer: '',
        startTime: 0,
        answerTime: 0,
        result: undefined
    }
    $scope.tasks = [];

    $scope.scores = {
        taskCount: 0,
        successCount: 0,
        errorCount: 0,
        avgTime: 0
    }

    $scope.start = function() {
        $scope.inProgress = true;
        $scope.scores.taskCount = 0;
        $scope.scores.successCount = 0;
        $scope.scores.errorCount = 0;
        $scope.scores.avgTime = 0;
        $scope.tasks = [];        
        $scope.task.taskNumber = 0;
        $scope.nextTask();
    }

    $scope.stop = function() {
        $scope.inProgress = false;
        $scope.task.v1 = '';
        $scope.task.v2 = '';
        $scope.task.answer = '';
    }

    $scope.nextTask = function() {
        $scope.task.taskNumber++;
        $scope.task.v1 = Math.round(Math.random() * 7 + 2);
        $scope.task.v2 = Math.round(Math.random() * 7 + 2);
        $scope.task.answer = '';
        $scope.task.startTime = new Date();
        $scope.task.answerTime = 0;
        $scope.result = undefined;
    }

    $scope.pinPadClick = function(number) {
        $scope.task.answer += number;
    }

    $scope.backspaceClick = function() {
        $scope.task.answer = $scope.task.answer.substr(0, $scope.task.answer.length-1);
    }

    $scope.okClick = function() {
        
        let now = new Date();
        $scope.task.answerTime = now.getTime() - $scope.task.startTime.getTime();
        $scope.scores.taskCount = $scope.task.taskNumber;
        $scope.scores.avgTime = Math.round(($scope.scores.avgTime * ($scope.scores.taskCount-1) + $scope.task.answerTime) / $scope.scores.taskCount);

        if (($scope.task.v1*$scope.task.v2) == $scope.task.answer) {
            $scope.scores.successCount++;
            $scope.task.result = true;
        }
        else {
            $scope.scores.errorCount++;
            $scope.task.result = false;
        }
        
        $scope.tasks.push(angular.copy($scope.task));

        if ($scope.scores.taskCount < $scope.settings.maxTaskCount) {
            $scope.nextTask();    
        }
        else {
            $scope.stop();
            $scope.Msg.show();
        }
        
    }

    $scope.getQuote = function() {
        $scope.quote = $quotes[Math.round(Math.random() * ($quotes.length-1))]; 
    }

    $scope.getQuote();

})