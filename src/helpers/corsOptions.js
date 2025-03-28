const whitelist = [
  'http://localhost:3000']

const corsOptions = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } 
  } else {
    corsOptions = { origin: false }
  }
    callback(null, corsOptions) // Pass the options to the callback
}

module.exports = corsOptions
