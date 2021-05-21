ACCESS_TOKEN=APP_USR-8567416418689323-052113-879938a31233b00c2f0ebd825c8951b8-62636656
curl -X POST -H 'Authorization: Bearer $ACCESS_TOKEN' -H "Content-type: application/json" -d '{ "site_id":"MLA" }' 'https://api.mercadolibre.com/users/test_user'

