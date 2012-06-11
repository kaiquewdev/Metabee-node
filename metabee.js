var Metabee = (function () {
    var _ = function () {};
    // Core environment
    var core = {};
        core.assert = require('assert');
        // Http node to the core
        core.http = require('http');

    // internal unit tests
    core.test = {};
    // Core object utils
    core.object = {};
    core.object.merge = function ( left, right ) {
        var output = {};

        if ( left && right ) {
            output = left;
            for ( var r in right ) {
                for ( var l in left ) {
                    if ( l === r ) {
                        output[ l ] = right[ r ];   
                    } if ( l !== r ) {
                        output[ r ] = right[ r ]; 
                    }
                }    
            }   
        }

        return output;
    };
    // Test merge
    core.test.mergeObject = (function () {
        var assert = core.assert;
        var obj = core.object.merge({a: 5, b: 10, c: 15}, {a: 10, b: 20, d: 25});

        assert.deepEqual( obj, {a: 10, b: 20, c: 15, d: 25}, 'Object merge, test 1' );
    } ());

    // access the url and get content
    _.prototype.connect = function ( settings ) {
        var output = {},
            self = this,
            options = {
                path: '/',
                method: 'GET'    
            },
            request;
        
        if ( settings ) {
            settings = core.object.merge( settings, options );

            request = core.http.request( settings, function ( response ) {
                if ( response.statusCode === 200 ) {
                    console.log('Connection in progress')
                    output.headers = response.headers;
                    // Set utf-8
                    response.setEncoding('utf-8');
                    response.on('data', function ( chunk ) {
                        output.content = chunk;

                        response.end()
                    });
                }
            });
        }

        return output;
    };

    return new ( _ );
} ());

exports.activate = Metabee;
