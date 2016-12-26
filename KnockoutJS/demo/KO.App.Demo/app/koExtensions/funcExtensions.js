var koExtender = (function () {
        var disposables = [];

        function subscribe(target, params) {
            var stateAccessor = params.stateAccessor;
            var subs = target.subscribe(function (value) {
                if (stateAccessor !== undefined && !stateAccessor()) {
                    console.log('viewModel has been changed');
                    stateAccessor(true);
                }
                if (typeof subs !== "undefined") {
                    subs.dispose();
                }
            });
            disposables.push(subs);
        }
        function disposeAllSubs() {
            disposables.forEach(function (subs) {
                if (subs && typeof subs.dispose !== "undefined") {
                    subs.dispose();
                }
            });
            disposables = [];
        }
        function checkStateAccessor(stateAccessor) {
            if (!ko.isObservable(stateAccessor)) {
                throw new Error("sp.app: Parameter stateAccessor for function trackChange should be an observable.");
            }
        }
        function subsStateAccessor(accessor, callback) {
            checkStateAccessor(accessor);
            if (callback === undefined) {
                return;
            }
            if (typeof callback !== 'function') {
                throw new Error("sp.app: Parameter callback for function trackChange should be a function.");
            } else {
                var subs = accessor.subscribe(function (isChanged) {
                    if (isChanged) {
                        // callback.bind(null,'changed prop name','path')();
                        callback();
                    }
                    if (typeof subs !== 'undefined') {
                        subs.dispose();
                    }
                    //if user do some change , dispose all subscribe and do not track form field any more.
                    disposeAllSubs();
                });
            }
        }

        function trackChange(target, value, callback) {
            //@params target: an observable or observableArray;
            //@params value: initial value of target;
            //@params callback: call this function when observables are changed;
            var stateAccessor = ko.observable(false);
            subsStateAccessor(stateAccessor, callback);

            function checkObs(obs) {
                if (!ko.isObservable(obs)) {
                    throw new Error("sp.app: Parameter target for function trackChange should be observable.");
                }
            }
            if (target instanceof Array && target.length > 0) {
                target.forEach(function (obs) {
                    checkObs(obs);
                    subscribe(obs, {
                        stateAccessor: stateAccessor
                    });
                });
            } else {
                checkObs(target);
                if (value !== undefined) {
                    target(value);
                }
                subscribe(target, {
                    stateAccessor: stateAccessor
                });
            }
        }

        function trackLeafNodesChange(root, callback) {
            var stateAccessor = ko.observable(false);
            subsStateAccessor(stateAccessor, callback);

            function extend(root) {
                for (var prop in root) {
                    if (ko.isObservable(root[prop])) {
                        subscribe(root[prop], {
                            stateAccessor: stateAccessor
                        });
                    } else if (typeof root[prop] === 'object') {
                        extend(root[prop]);
                    }
                }
            }
            extend(root);
        }

        function trackAllObs(root, callback) {
            var stateAccessor = ko.observable(false);
            subsStateAccessor(stateAccessor, callback);
            function extend(obj) {
                if (ko.isObservable(obj)) {
                    subscribe(obj, {
                        stateAccessor: stateAccessor
                    });
                    extend(ko.utils.unwrapObservable(obj));
                } else {
                    if (obj !== null && typeof obj === 'object') {
                        if (obj instanceof Array) {
                            obj.forEach(function (item) {
                                extend(item);
                            });
                        } else {
                            for (var prop in obj) {
                                extend(obj[prop]);
                            }
                        }
                    }
                }
            }

            extend(root);
        }

        function track(root, fullTracking, callback) {
            disposeAllSubs();
            if (fullTracking) {
                trackAllObs(root, callback);
            } else {
                trackLeafNodesChange(root, callback);
            }
        };
        return {
            trackChange: trackChange,
            track: track
        };
    })();
ko['watch'] = koExtender.track;