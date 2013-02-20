/*
 * Module dependencies
 */
var app = require(".");

/**
 * Initialize the templates
 */
// var indexPartial = require("../partials/index");

/**
 * Initialize the directives used outside of the controllers
 */

/**
 * Initialize the controllers
 */
var IndexController = require("./controllers/index")
  // , FunnelsController = require("./controllers/funnels")
  // , SegmentationController = require("./controllers/segmentation")
  // , RetentionController = require("./controllers/retention")
  // , FormulasController = require("./controllers/formulas")
  // , StreamsController = require("./controllers/streams")
  // , BookmarksController = require("./controllers/bookmarks");

/*
 * Configure the app
 */
app.config([
  '$routeProvider',
  '$locationProvider',

  function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        // templateUrl: indexPartial,
        templateUrl: "/report/partials/index.nghtml",
        controller: IndexController
      })
      .when("/funnels", {
        templateUrl: "/report/partials/funnels.nghtml",
        // controller: FunnelsController
      })
      .when("/segmentation", {
        templateUrl: "/report/partials/segmentation.nghtml",
        // controller: SegmentationController
      })
      .when("/retention", {
        templateUrl: "/report/partials/retention.nghtml",
        // controller: RetentionController
      })
      .when("/formulas", {
        templateUrl: "/report/partials/formulas.nghtml",
        // controller: FormulasController
      })
      .when("/streams", {
        templateUrl: "/report/partials/streams.nghtml",
        // controller: StreamsController
      })
      .when("/bookmarks", {
        templateUrl: "/report/partials/bookmarks.nghtml",
        // controller: BookmarksController
      })
      .otherwise({
        redirectTo: "/"
      });
  }
]);
