import ErrorHandler from "../models/ErrorHandler";
import Post from '../models/Post';

class PostsController {
    defaultMethod() {
        return {
            text: `I am in this ${this.constructor.name} default method`
        };
    }
    postAPost(req: any) {
        const post = new Post({content: 'new', date: new Date()});

        post.save((err: any) => {
            if(err) {
                console.log('error occured: ', err);
                return err;
            }
        });
        return "new post saved";
    }
    anotherMethod() {
        throw new ErrorHandler(501, 'Method not implemented');
    }
}

export = new PostsController();