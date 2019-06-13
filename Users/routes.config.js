const app = require('./../index');

const UserController = require('./controllers/UserController');

app.post('/users', [
    UserController.insert
]);

app.get('/users/:userId', [
    UserController.getUser
]);

app.get('/getAll',[
    UserController.getAllUsers
]);
app.get('/test'), function(req, resp){
    resp.send("Working");
}