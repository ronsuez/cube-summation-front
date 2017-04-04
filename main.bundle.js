webpackJsonp([0,3],{

/***/ 400:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 400;


/***/ },

/***/ 401:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(500);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_23" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/ronsuez/Code/grability/cube-front/cube-cli/src/main.js.map

/***/ },

/***/ 499:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_service__ = __webpack_require__(501);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var async = __webpack_require__(528);
var AppComponent = (function () {
    function AppComponent(appService) {
        this.appService = appService;
        this.commands = [];
        this.testCases = [
            {
                dimension: 4,
                operations: 5,
                init: '/create-cube 4',
                commands: [
                    '/update-cube -cubeid- 2 2 2 4',
                    '/query-cube -cubeid- 1 1 1 3 3 3',
                    '/update-cube -cubeid- 1 1 1 23',
                    '/query-cube -cubeid- 2 2 2 4 4 4',
                    '/query-cube -cubeid- 1 1 1 3 3 3'
                ]
            },
            {
                dimension: 2,
                operations: 4,
                init: '/create-cube 2',
                commands: [
                    '/update-cube -cubeid- 2 2 2 1',
                    '/query-cube -cubeid- 1 1 1 1 1 1',
                    '/query-cube -cubeid- 2 2 2 2 2 2',
                    '/query-cube -cubeid- 2 2 2 2 2 2'
                ]
            }
        ];
        this.title = 'Cube cli v1';
        this.command = '';
        this.commands.push({
            id: 0,
            action: 'help',
            params: [],
            command: "\n\n          Welcome to the Cube-Cli... \n\n\n          This is a simple command line tool intended to run test cases to the Cube API.\n\n          ### Commands:\n            * /create-cube [dimension]\n            * /update-cube [cube-id] [x y z value]\n            * /query-cube [cube-id] [x1 y1 z1 x2 y2 z2]\n            * /list-cubes\n            * /run-test-cases [1,2]\n\n        "
        });
    }
    AppComponent.prototype.clicked = function (event) {
        var _this = this;
        if (!this.command.length)
            return;
        var expression = this.createCommand(this.command);
        this.command = '';
        console.log(expression);
        if (expression.action === 'runTestCases') {
            this.runTestCases(expression);
        }
        else {
            this.runCommand(expression)
                .then(function (resp) { return _this.serverCommand(expression, resp); })
                .catch(function (err) { return console.log(err); });
        }
    };
    AppComponent.prototype.createCommand = function (command) {
        return Object.assign(this.parseCommand(command), {
            id: 1,
            command: command,
            date: new Date(),
            isClient: true
        });
    };
    AppComponent.prototype.parseCommand = function (command) {
        var params = command.split(" ").filter(function (a) { return a.length; });
        var options = {
            '/create-cube': 'createCube',
            '/update-cube': 'updateCube',
            '/query-cube': 'queryCube',
            '/list-cubes': 'getCubes',
            '/run-test-cases': 'runTestCases'
        };
        if (options.hasOwnProperty(params[0])) {
            return {
                action: options[params[0]],
                params: params.slice(1, params.length)
            };
        }
        return { action: 'not-available', params: [] };
    };
    AppComponent.prototype.runCommand = function (command) {
        console.log(command);
        this.commands.push(command);
        if (!command)
            return Promise.reject('command not available on cli');
        if (!this.appService[command.action])
            return Promise.reject('command not available on service');
        return this.appService[command.action](command.params);
    };
    AppComponent.prototype.serverCommand = function (command, payload) {
        var options = {
            'createCube': function (data) { return ("Cube created with ID: " + data._id); },
            'updateCube': function (data) { return ("Cube with ID: " + data._id + " at position(" + data.position + ") updated with value " + data.value); },
            'queryCube': function (data) { return ("Cube with ID: " + data._id + " at position(" + data.position + ") has value " + data.value); },
            'getCubes': function (data) { return ("there are " + data.length + " cubes"); },
            'runTestCases': function (data) { return 'Running test cases'; }
        };
        var errors = {
            'updateCube': function (data) { return ("Could not find cube with ID: " + data._id); },
            'queryCube': function (data) { return ("Could not find cube with ID: " + data._id); }
        };
        this.commands.push({
            id: 1,
            command: command,
            date: new Date(),
            isServer: true,
            payload: payload.err ? payload.err : options[command.action](payload.data)
        });
    };
    AppComponent.prototype.renderCommand = function (message) {
        if (message.isServer) {
            return "$ server:  " + message.payload;
        }
        if (message.isClient) {
            return "$ me:  " + message.command;
        }
        return "$ system: " + message.command;
    };
    AppComponent.prototype.runTestCases = function (expression) {
        console.log('should run test cases', expression);
        var test = parseInt(expression.params[0]);
        if (test > 2)
            return;
        this.serverCommand(expression, { err: null, data: {} });
        this.runTestCommand(this.testCases[test - 1]);
    };
    AppComponent.prototype.runTestCommand = function (set) {
        var _this = this;
        var expression = this.createCommand(set.init);
        this.runCommand(expression)
            .then(function (resp) {
            _this.serverCommand(expression, resp);
            var commands = set.commands.map((function (command) { return command.replace('-cubeid-', resp.data._id); }));
            async.mapSeries(commands, function (command, next) {
                var expression = _this.createCommand(command);
                _this.runCommand(expression)
                    .then(function (resp) { return [_this.serverCommand(expression, resp), resp]; })
                    .then(function (resp) { return next(null, resp); })
                    .catch(function (err) { return next(err); });
            }, function (err, res) {
                console.log(err, res);
            });
        });
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(747),
            styles: [__webpack_require__(746)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=/Users/ronsuez/Code/grability/cube-front/cube-cli/src/app.component.js.map

/***/ },

/***/ 500:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(499);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* HttpModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/ronsuez/Code/grability/cube-front/cube-cli/src/app.module.js.map

/***/ },

/***/ 501:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(753);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppService = (function () {
    function AppService(http) {
        this.http = http;
        this.base = 'https://cube-summation-back.herokuapp.com/api/cube';
    }
    ;
    AppService.prototype.createCube = function (params) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.base, params, options)
            .toPromise()
            .then(function (resp) { return resp.json(); })
            .catch(function (err) { return console.log(err); });
    };
    AppService.prototype.getCubes = function (params) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.base, options)
            .toPromise()
            .then(function (resp) { return resp.json(); })
            .catch(function (err) { return console.log(err); });
    };
    AppService.prototype.updateCube = function (params) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]({ headers: headers });
        return this.http.post([this.base, params[0], 'update'].join('/'), {
            position: params.slice(1, params.length - 1),
            value: params.slice(4, params.length)
        }, options)
            .toPromise()
            .then(function (resp) { return resp.json(); })
            .catch(function (err) { return console.log(err); });
    };
    AppService.prototype.queryCube = function (params) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]({ headers: headers });
        return this.http.post([this.base, params[0], 'query'].join('/'), {
            position: params.slice(1, params.length),
        }, options)
            .toPromise()
            .then(function (resp) { return resp.json(); })
            .catch(function (err) { return console.log(err); });
    };
    AppService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], AppService);
    return AppService;
    var _a;
}());
//# sourceMappingURL=/Users/ronsuez/Code/grability/cube-front/cube-cli/src/app.service.js.map

/***/ },

/***/ 502:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ung build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/ronsuez/Code/grability/cube-front/cube-cli/src/environment.js.map

/***/ },

/***/ 503:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(570);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(765);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.
















//# sourceMappingURL=/Users/ronsuez/Code/grability/cube-front/cube-cli/src/polyfills.js.map

/***/ },

/***/ 746:
/***/ function(module, exports) {

module.exports = ".cli {\n  padding: 20px;\n}\n\n.command-list {\n  width: 85%;\n}\n\n.command {\n  margin-top: 10px;\n  min-height: 25px;\n}"

/***/ },

/***/ 747:
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\n  <section class=\"hero is-fullheight cli\">\n    <div class=\"hero-title\">\n      <h1 class=\"title\">\n        {{title}}\n      </h1>\n    </div>\n    <div class=\"hero-body\">\n\n      <ul class=\"command-list\">\n        <li class=\"command\" *ngFor=\"let item of commands\">\n          <pre>{{renderCommand(item)}}</pre>\n        </li>\n      </ul>\n    </div>\n\n    <div class=\"hero-foot\">\n\n      <div class=\"field is-grouped\">\n        <p class=\"control is-expanded\">\n          <input [(ngModel)]='command' class=\"input\" type=\"text\" placeholder=\"Type a command..\">\n        </p>\n        <p class=\"control\">\n          <a class=\"button is-info\" (click)=\"clicked()\">\n          Send command\n        </a>\n        </p>\n      </div>\n\n    </div>\n  </section>\n</div>"

/***/ },

/***/ 766:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(401);


/***/ }

},[766]);
//# sourceMappingURL=main.bundle.map