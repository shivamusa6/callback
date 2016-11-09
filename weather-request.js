var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 8080);
var http = require('http');
var options = {
  host: 'w1.weather.gov',
  path: '/xml/current_obs/KSFO.xml',
  headers: {'user-agent': 'Mozilla/5.0'}
 };
var server = http.createServer( function(request, response) {
var weatherCallback = function(weatherResponse) {
var buffer = '';
weatherResponse.on('data', function(chunk){
buffer += chunk;
});
weatherResponse.on('end', function() {
var body = buffer;
var matches = buffer.match(/\<temp_f\>.+\<\/temp_f\>/g);
if ( null != matches && matches.length > 0 ) {
body = matches[0].replace(/\<temp_f>/, "")
.replace(/\<\/temp_f\>/, "");
}
response.writeHead( 200, {
'Content-Length': body.length,
'Content-Type': 'text/plain'
});
response.write(body);
response.end();
});
};
var weatherRequest = http.request( options, weatherCallback );
weatherRequest.end();
weatherRequest.on('error', function(e) {
response.writeHead( 500, {
'Content-Length': e.message.length,
'Content-Type': 'text/plain'
});
response.write(e.message);
response.end();
});
});
server.listen(port, host);