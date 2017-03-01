global.config = process.env.NODE_ENV === 'production'
    ? require('./production.json')
    : require('./development.json')
