import * as debug from 'debug';
import { Router, Request, Response, NextFunction } from 'express';
const Heroes = require('../data');

export class HeroRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.delete('/:id', this.deleteOne);
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send(Heroes);
    }

    public getOne(req: Request, res: Response, next: NextFunction) {
        
        let query = parseInt(req.params.id);
        debug('get by id: ' + query);
        let hero = Heroes.find(hero => hero.id === query);
        if (hero) {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    hero
                });
        }
        else {
            res.status(404)
                .send({
                    message: 'No hero found with the given id.',
                    status: res.status
                });
        }
    }

    public deleteOne(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        let hero = Heroes.find(hero => hero.id === query);
        if (hero) {
            // Heroes.delete(hero.id);
            res.status(200)
                .send({
                    message: 'ok',
                    status: res.status
                });
        }
        else {
            res.status(404)
                .send({
                    message: 'No hero found with the given id.',
                    status: res.status
                });
        }
    }
}

const heroRoutes = new HeroRouter();
//heroRoutes.init();

export default heroRoutes.router;
