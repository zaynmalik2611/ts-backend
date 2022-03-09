import { NextFunction, Request, Response, Router } from "express";
import PostsController from "../../controllers/PostsController";

class PostsRouter {
    private _router = Router();
    private _controller = PostsController;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }


    private _configure() {
        this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json(this._controller.defaultMethod());
        });
        
        this._router.post('/postAPost', (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json(this._controller.postAPost(req));
        });

        this.router.get('/new', (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = this._controller.anotherMethod();
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        })
    }
}

export = new PostsRouter().router;