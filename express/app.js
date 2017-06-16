
const fs = require( 'fs' )

const bodyParser = require( 'body-parser' )
const engines    = require( 'consolidate' )
const express    = require( 'express' )

const db = require( './db' )

const app = express( )

// setup
app.engine( 'hbs', engines.handlebars )
app.set( 'view engine', 'hbs' )

// middleware
app.use( bodyParser.urlencoded( ) )

// routes
app.get( '/', ( req, res ) => res.redirect( '/list.html' ) )

app.get( '/list.html', ( req, res ) => {
    app.render( 'pages/list', db, ( err, html ) => {
        if( ! err ) {
            res.render( 'layout', {
                pageHTML: html
            } )
        }
    } )
} )

app.get( '/join.html', ( req, res ) => {
    app.render( 'pages/join', ( err, html ) => {
        if( ! err ) {
            res.render( 'layout', {
                pageHTML: html
            } )
        }
    } )
} )

app.post( '/register', ( req, res ) => {
    const { name } = req.body
    if( name ) {
        db.people.push( name )
    }
    res.redirect( '/list.html' )
} )


// start the server
app.listen( 1337 )
