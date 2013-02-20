/*
 * Module dependencies
 */
var app = require("..");

/*
 * Index Controller
 *
 * Landing page for authenticated
 */
function IndexController($scope) {
  
};

/*
 * Register it with angular
 */
app.controller(IndexController.name, [
  '$scope',
  IndexController
]);

/*
 * Let others know where to find it
 */
module.exports = IndexController.name;
