const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {PORT}=require('./config/severConfig');
const apiRoutes = require('./routes/index');

const  setupAndStartServer = ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
        if(process.env.DB_sync){
            db.sequelize.sync({alter:true}); 
        }
    });
}

setupAndStartServer();