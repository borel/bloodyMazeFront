var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BLOODY_MAZE_API_URL: '"http://localhost:8080"',
})
