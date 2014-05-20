// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the Apache License, Version 2.0 (the "License"); you may not use these files except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
angular.module('statusieApp')
    .directive('termfilter', function () {
        return {
            templateUrl: '/templates/termfilter.html',
            restrict: 'E',
            replace: true,
            controller: function ($scope) {
                'use strict';

                var filterFunction = function (term) {
                    return function (acum, item) {
                        if(_.isUndefined(term) || term === ''){
                            acum.push(item);
                            return acum;
                        }

                        var termRegex = new RegExp(term, 'gi');

                        if (termRegex.test(item.name) || termRegex.test(item.summary)) {
                            acum.push(item);
                        }

                        return acum;
                    };
                };

                $scope.termChange = function(){
                    $scope.$emit('filterupdated', {
                        name: 'term',
                        filterFunction: filterFunction($scope.term)
                    });
                };
            }
        };
    });
