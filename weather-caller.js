var server = http.createServer( function(request, response) {
var temp_f = '';
weather.current(temp_f);
var body = 'The current weather reading is ' + temp_f +
' degrees Fahrenheit';
response.writeHead( 200, {
'Content-Length': body.length,
'Content-Type': 'text/plain'
});
response.write(body);
response.end();
});
server.listen(port, host);