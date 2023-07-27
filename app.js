import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import mongoose from 'mongoose';
import * as AdminJSMongoose from '@adminjs/mongoose';
import {Category} from './models/category.model.js';
import 'dotenv/config';

const mongoUrl = process.env.MONGO_URL ;
const PORT = process.env.PORT || 5000;

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
})

const start = async () => {
    const app = express()
    // connect to the database
    
    const db = mongoose.connection;
    db.on('connecting', () => { 
        console.log('connecting')
        // console.log(db.readyState); 
      });
    db.on('connected', () => {
        console.log('connected');
      });
    db.on('disconnecting', () => {
        console.log('disconnecting');
      });
    db.on('disconnected', () => {
        console.log('disconnected');
      });
    await mongoose.connect(mongoUrl,
        {
            useNewUrlParser: true,
        }
    );
    const adminOptions = {
        resources: [Category],
    }
    const admin = new AdminJS(adminOptions)

    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)

    app.listen(PORT, () => {
        console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
}

start()