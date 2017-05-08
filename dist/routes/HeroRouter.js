"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express_1 = require("express");
const Heroes = require('../data');
class HeroRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.delete('/:id', this.deleteOne);
    }
    getAll(req, res, next) {
        res.send(Heroes);
    }
    getOne(req, res, next) {
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
    deleteOne(req, res, next) {
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
exports.HeroRouter = HeroRouter;
const heroRoutes = new HeroRouter();
//heroRoutes.init();
exports.default = heroRoutes.router;
//# sourceMappingURL=HeroRouter.js.map