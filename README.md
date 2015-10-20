# Uber Price Estimate

Price Estimate and requesting rides example with map.

This demo uses the following libraries

#### Server Side

1. [express](http://expressjs.com/api.html) for routing and serving static files
1. [request](https://www.npmjs.com/package/request) for simpler async https requests to uber api
1. [body-parser](https://www.npmjs.com/package/body-parser) middleware for parsing POST body requests
1. [oauth](https://www.npmjs.com/package/oauth) for authorizing users with uber api through OAuth2
    - [OAuth2 module source](https://github.com/ciaranj/node-oauth/blob/master/lib/oauth2.js) because the readme docs are too light
    - [github example](https://github.com/ciaranj/node-oauth/blob/master/examples/github-example.js) _take care to modify url configurations to use uber endpoints_


#### Client Side

All libraries are imported using [cdnjs](https://cdnjs.com)

1. [leaflet](http://leafletjs.com/) for maps
    - [OpenStreetMap](http://wiki.openstreetmap.org/wiki/Tile.openstreetmap.org/Usage_policy) as a source for map tiles
1. [backbone](http://backbonejs.org/) for client side models, views, templates and routing
1. [handlebars](http://handlebarsjs.com/) for rendering dynamic templates
1. [jquery](https://api.jquery.com/jquery.get/) for dom selecting, some manipulation, and async http requests
1. [underscore](http://underscorejs.org/#extend) mainly used for extending classes and objects
1. [skeleton](http://getskeleton.com/) lightweight responsive css framework


### LiveCode demo

For presenting this project as a live tutorial, here are the steps along with links and source.

First, you must [register](https://developer.uber.com) as a developer with uber, and create an uber app.

It's simpler to have an uber account, and if you don't have one, download the app on your smartphone, create an account, and you do not have to enter in your credit card info at this time. [login](https://developer.uber.com) to the uber developer panel using the uber account you just created.

1. create a `package.json` file
2. install the `express` module, setup your `server.js`
    - [server.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/6974ff9cbc08b99d03b16fa38ce4076768d87dff/server.js)
3. setup static middleware in `server.js`, add boilerplate `index.html`
    - [server.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/511d4701c22171f8af2950edf76a39a7f52c10b3/server.js)
    - [public/index.html](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/511d4701c22171f8af2950edf76a39a7f52c10b3/public/index.html)
4. add leaflet
    1. editing `index.html`
        1. include the leaflet js library from cdnjs
        1. include the leaflet css file from cdnjs
        1. include your main `js/app.js` file (doesn't exist yet)
        1. include your main `css/styles.css` file (doesn't exist yet)
        1. add a `h1{Hello Uber}` to the body
        1. add a `div#map` container to the body
        - [public/index.html](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/01c022f6a8111e03ced58631d0039f9a29963ead/public/index.html)
    1. create and edit `js/app.js`
        1. _do a sanity check_
        1. create an iife
        1. _use strict_
        1. create an `origin` array of lat/lng of some location
        1. create a new `map` object and set it's view to `origin`, with a zoom level of `17`
        1. add a TileLayer using OpenStreetMap
        1. add a new `marker` object and `addTo` your `map`
        - [public/js/app.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/01c022f6a8111e03ced58631d0039f9a29963ead/public/js/app.js)
    1. create and edit `css/styles.css`
        1. add `#map` height of `600px`
        - _without this, your map will not show_
5. add _destination_ marker on map click
    - [public/js/app.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/279d6ffe1b8e4f43fcf645972ac2ff7047f6fec9/public/js/app.js)
6. use jquery to `GET` price estimates from your api
    1. include jquery library
    1. create a `getPriceEstimates()` function in `app.js`
        - [public/js/app.js](https://github.com/devleague/Uber-Price-Estimate/blob/02bbcbb8ba5b5d950d7f111c55af6379e08f890e/public/js/app.js)
    - _this request should fail_
7. create an `api` Router and mount it on the `/api` path using express
    1. `server.js`
        - mount `api.js` onto `/api`
    1. create and edit `api.js`
        1. setup an express Router
        1. create a GET `/estimates` route handler
        1. respond with a "hello world" json
        - [api.js](https://github.com/devleague/Uber-Price-Estimate/blob/6527e7842a82486962e2e5a068d8a54cfb95e05f/api.js)
8. pass `source` and `destination` from jquery to api
    1. `public/js/app.js`
        1. add GET query params by stringifying `source` and `destination`
        - [public/js/app.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/1e9b19064ae643e7128ffb131a4cdae88c155855/public/js/app.js)
    1. `api.js`
        1. console.log `req.query`
9. get price estimates from the uber api
    1. install the `request` module
    1. `api.js` creating an http GET request to uber api
        - [api.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/e2260c17e6a477ca1ec8011679d16f7bbff9fb6a/api.js)
        - **note** changed the path to `/estimates/price`
    1. `public/js/app.js` update the endpoint url, parse the data, log it
10. add backbone, underscore, handlbars, models, views, templates and render all the price estimate results to browser.
    1. [public/index.html](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/d12c5462181a8e71c5682a3140e82530741faf28/public/index.html)
    1. [public/js/models/price.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/d12c5462181a8e71c5682a3140e82530741faf28/public/js/models/price.js) create a Price model, and a Prices collection
    1. [public/js/template_manager.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/d12c5462181a8e71c5682a3140e82530741faf28/public/js/template_manager.js) create a template manager for asynchronously loading external handlebars template with caching
    1. [public/js/views/price.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/d12c5462181a8e71c5682a3140e82530741faf28/public/js/views/price.js) create a `PricesView` to render the Prices collection
    1. [public/templates/prices.hbs](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/d12c5462181a8e71c5682a3140e82530741faf28/public/templates/prices.hbs) create a handlebars template to render the `PricesView`
    1. [public/js/app.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/d12c5462181a8e71c5682a3140e82530741faf28/public/js/app.js) create an instance of `Prices` collection, a new instance of `PricesView`, add `prices` to `pricesView`, then render it
11. add price estimate detail view, add skeleton css
    1. [public/index.html](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/07495dda3a1e63701a81c44092c614b11343ec22/public/index.html) add skeleton css, restructure divs, add container for `#price-detail`
    1. [public/js/views/price.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/07495dda3a1e63701a81c44092c614b11343ec22/public/js/views/price.js) create a new `PriceView` to render an estimate detail, add a click event to `PricesView` that will render a new instance of `priceView`
    1. [public/templates/price.hbs](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/07495dda3a1e63701a81c44092c614b11343ec22/public/templates/price.hbs) create new `price.hbs` template for `PriceView` _detail_
    1. `public/templates/prices.hbs` add a data attribute to each li, `data-id="{{@index}}"`
12. interact with OAuth2 uber endpoints to authorize the user with your app, add popup window to let user authenticate, get the `access_token` from uber, add `/api/get_ride` endpoint that will interact with uber's `/request` api
    1. install the `oauth` module
    1. install the 'body-parser' module
    1. `server.js` add `bodyParser.urlencoded` middleware
    1. `api.js` stub out a POST `/get_ride` route handler
    1. [public/js/app.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/25f32266bf1bd0ece0e951799485c7bc48d50f7d/public/js/app.js) extend the price model to add `source` and `destination` attributes
    1. [public/js/views/price.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/25f32266bf1bd0ece0e951799485c7bc48d50f7d/public/js/views/price.js) add a `.get-ride` event handler that will post to the `/api/get_ride` endpoint and opens up new browser for authenticating with uber
    1. [api.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/25f32266bf1bd0ece0e951799485c7bc48d50f7d/api.js) create an instance of `OAuth2`, generate authorization url to send back to the client. create oauth callback endpoint, handle errors, stub out success. gets the `access_token`
    1. create a `.env` file for secret uber keys
    1. read `.env` and restart `nodemon`
13. send the access token back to the client, add backbone router to extract the access_token, store it in `localStorage`, use the token for authorized requests
    1. [public/js/routes.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/669782895ea3caa1e3f85d901824de5f5adae3f8/public/js/routes.js) create a router
    1. include the `/js/routes.js` file in `public/index.html`
    1. `public/js/app.js` create an instance of `router`
        - `var router = new Router();`
        - `Backbone.history.start();`
    1. [api.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/669782895ea3caa1e3f85d901824de5f5adae3f8/api.js) when receiving the access_token tell the popup window to give the token to the main window, and close
14. authorized requests post to uber `/requests` to call an uber driver. add status view, model, and template for displaying status
    1. `app.js` use the correct uber path `requests`
    1. `app.js` send `success = true` attribute with the response body
    1. [public/index.html](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/7417893afdc25d62d9cfbcb8d4ab4ac62ac89d52/public/index.html) add `#ride-status` container, and include `js/models/status.js` and `js/views/status.js`
    1. create a bare `public/models/status.js`
    1. create a [public/views/status.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/7417893afdc25d62d9cfbcb8d4ab4ac62ac89d52/public/js/views/status.js) view
    1. create a [public/templates/status.hbs](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/7417893afdc25d62d9cfbcb8d4ab4ac62ac89d52/public/templates/status.hbs) template
    1. [public/js/views/price.js](https://raw.githubusercontent.com/devleague/Uber-Price-Estimate/7417893afdc25d62d9cfbcb8d4ab4ac62ac89d52/public/js/views/price.js) on successful `/api/get-ride` request, create a new instance of `statusView`
