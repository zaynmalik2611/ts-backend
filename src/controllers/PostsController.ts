import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../models/ErrorHandler";
import Post from '../models/Post';

class PostsController {
    async getPosts(res: Response, next: NextFunction) {
        try {
            const result = await Post.find({});
            res.status(200).json(result);
        } catch (error) {
            return next(new ErrorHandler(500, "Server Error"));
        } 
    }

    postAPost(req:Request, res: Response, next: NextFunction) {
        let postInput = req.body;
        console.log(postInput);
        const post = new Post(postInput);
        post.save(function (err: object) {
            if (err) {
                return next(new ErrorHandler(400, "Bad Request Error"));
            }
        });
        res.status(200).json({"message": "post created"});
    }
    
    deleteAPost(req: Request, res: Response, next: NextFunction) {
        let id = req.params.id;
        Post.deleteOne({_id: id}, (err: object) => {
            if (err) {
                return next(new ErrorHandler(500, "Server Error"));
            }
        });
        res.status(200).json({"message": "post deleted"});
    }

    anotherMethod() {
        throw new ErrorHandler(501, 'Method not implemented');
    }
}

export = new PostsController();