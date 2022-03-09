import {Router } from 'express';
import PostsRouter from './posts/PostsRouter';

class MasterRouter {
    private _router = Router();
    private _subrouterPosts = PostsRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.use('/posts', this._subrouterPosts);
    }
}

export = new MasterRouter().router;