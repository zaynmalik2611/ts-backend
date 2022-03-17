import { NextFunction, Request, Response, Router } from "express";
import PostsController from "../../controllers/PostsController";
import StorageUtil from "../../utils/StorageUtil";


class PostsRouter {
    private _router = Router();
    private _controller = PostsController;
    private _storage = StorageUtil;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }
    

    private _configure() {
        this._router.get('/',(req: Request, res: Response, next: NextFunction) => {
            this._controller.getPosts(res, next);
        });
        
        this._router.post('/postAPost', (req: Request, res: Response, next: NextFunction) => {
            this._controller.postAPost(req, res, next);   
        });
        
        this._router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
            this._controller.deleteAPost(req, res, next);
        });

        this._router.get('/new', (req: Request, res: Response, next: NextFunction) => {
            try {
                this._controller.anotherMethod();
            } catch (error) {
                next(error);
            }
        });

        this._router.post('/postAnImage', this._storage.upload.single('file'), async (req: Request, res: Response, next: NextFunction)=> {
            this._controller.uploadFile(req, res, next);
        })
    }
}

export = new PostsRouter().router;