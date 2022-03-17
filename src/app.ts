import dotenv from 'dotenv';
import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import multer from "multer";
const cors = require('cors');
const morgan = require('morgan');

import MasterRouter from './routers/MasterRouter';
import ErrorHandler from './models/ErrorHandler';


dotenv.config({
    path: '.env'
});
const mongo_uri = process.env.MONGO_URI || "";
class Server {
    public app = express();
    public router = MasterRouter;
    public dbMain = async () => {
        await mongoose.connect(mongo_uri);
    }
}


const server = new Server();
server.app.use(cors()); 
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());
server.app.use(morgan('dev'));
server.app.use(express.static("public"));
server.app.use('/api', server.router);
server.app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
        status: 'error',
        statusCode: err.statusCode,
        message: err.message
    })
})
server.dbMain()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log(err));

((port = process.env.PORT || 5000) => {
    server.app.listen(port, () => console.log(`Listening on port ${port}`));
})();

