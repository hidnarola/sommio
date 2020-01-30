#!/bin/sh
cd node_modules/formidable/lib/
sed -i '1s/^/\/\/ /' file.js
sed -i '1s/^/\/\/ /' incoming_form.js
sed -i '1s/^/\/\/ /' json_parser.js
sed -i '1s/^/\/\/ /' querystring_parser.js
