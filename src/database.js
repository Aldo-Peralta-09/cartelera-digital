const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cartelera-digital',{
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
}).then(db => console.log('DB is connected')).catch(err => console.error(err));


//'mongodb://localhost/cartelera-digital'
