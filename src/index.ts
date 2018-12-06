import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
const config = require('../config/config');

// import routers
import { Wines } from './routes';

class App {

    public app: express.Application;
    public routePrv: Wines = new Wines();

    constructor() {
        this.app = express();
        this.config();    
        this.routePrv.routes(this.app);  
        this.mongoSetup();       
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void{
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(config.db);    
    }

}

export default new App().app;