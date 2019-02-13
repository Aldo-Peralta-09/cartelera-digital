const mongoose = require('mongoose');
mongoose.connect('mongodb://siec:INNOVACION2019=@ds133875.mlab.com:33875/cartelera-digital',{
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
}).then(db => console.log('DB is connected')).catch(err => console.error(err));


//'mongodb://localhost/cartelera-digital'
