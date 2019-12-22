/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        transpiler: "plugin-babel",
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            'app': 'app',
            'services:': 'app/Services/',
            'modules:': 'app/Modules/',
            'shared:': 'app/Shared/',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
            '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@swimlane/ngx-datatable': 'npm:@swimlane/ngx-datatable/release/index.js',
            'ngx-bootstrap': 'npm:ngx-bootstrap/bundles/ngx-bootstrap.umd.js',
            'ngx-toastr': 'npm:ngx-toastr/toastr.umd.js',
            '@agm/core': 'npm:@agm/core/core.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'ng-lottie': 'npm:ng-lottie/dist/umd/LottieAnimationView.js',
            'ngx-scrollspy':'npm:ngx-scrollspy/bundles/ngx-scrollspy.umd.js',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',

            'plugin-babel': 'npm:systemjs-plugin-babel/plugin-babel.js',
            'systemjs-babel-build': 'npm:systemjs-plugin-babel/systemjs-babel-browser.js',

        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                defaultExtension: 'js',
                meta: {
                    './*.js': {
                        loader: 'systemjs-angular-loader.js'
                    }
                }
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'ng-lottie':{
                defaultExtension: 'js'
            },
            'ngx-scrollspy': {
                defaultExtension: 'js'
            }
        }
    });
}) (this);
