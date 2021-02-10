const mongoose = require('mongoose');

const dbConnection =  async () => {
     try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        // await mongoose.connect('mongodb://localhost:27017/mern_calendar', {
        //     useNewUrlParser: true, 
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });

        console.log('DB online')
        

     } catch (error) {
         console.log(error);
        throw new Error('Error inicializando base de datos');
     }
};

module.exports = {
    dbConnection
};
