--run only one migration sequelize
npx sequelize-cli db:migrate --to filename.js

--revert only one migration sequelize
npx sequelize-cli db:migrate:undo --name filename

npx sequelize-cli db:migrate:undo:all --to -create-posts.js

"development": {
"username": "root",
"password": "123456",
"database": "shopshoes",
"host": "127.0.0.1",
"dialect": "mysql",
"logging": false, không cho log ra thông tin rác
"timezone": "+07:00" 
