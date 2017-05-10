/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

angular.module('myApp.services', [])
        .value('guiEndpoint', 'http://192.168.1.99:8181/gui/')
        .value('auth', 'ZWhhbGNhOnJmeWJyZWtz')


        .factory('webGuiService', ['$http', '$q', 'guiEndpoint', 'auth', function ($http, $q, guiEndpoint, auth) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
                function isAlive(success, error) {
                    var deferred = $q.defer();

                    $http({
                        method: 'GET',
                        url: guiEndpoint
                    }).then(function successCallback(response) {
                        deferred.resolve();
                    }, function errorCallback(response) {
                        deferred.reject();
                    });
                    return deferred.promise;
                }

                return {
                    isAlive: isAlive
                };
            }])

        .factory('injectorService', ['webGuiService', function (webGuiService) {
                chrome.runtime.onConnect.addListener(function (port) {
                    console.assert(port.name == "injector");
                    port.onMessage.addListener(function (msg) {
                        if (msg.joke == "Knock knock")
                            port.postMessage({question: "Who's there?"});
                        else if (msg.answer == "Madame")
                            port.postMessage({question: "Madame who?"});
                        else if (msg.answer == "Madame... Bovary")
                            port.postMessage({question: "I don't get it."});
                    });
                });
                return {}
            }]);
