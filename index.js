'use strict'
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/useInputValue.js')
} else {
  module.exports = require('./src/useInputValue.js')
}
