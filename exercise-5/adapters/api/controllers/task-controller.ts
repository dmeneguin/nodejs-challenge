import express from 'express';
import log4js from 'log4js';
import TaskService from '../../../application/services/task-service';

class TaskController{
    private logger:log4js.Logger;

    public constructor(){
        this.logger = log4js.getLogger('task-controller');
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async get(req:express.Request, res:express.Response) {
        try {
            this.logger.info('GET /task/<id?>');
            const match = {
                id: req.params.id?req.params.id.toString():undefined,
                name: req.query.name?req.query.name.toString():undefined,
                description: req.query.description?req.query.description.toString():undefined,
            }
            const sort:string | undefined = req.query.sortBy?req.query.sortBy.toString():undefined;
            const order:string | undefined = req.query.orderBy?req.query.orderBy.toString():undefined;
            const tasks = await TaskService.get(match, sort, order);
            res.json(tasks);
        } catch (ex) {
            const status = ex.status?ex.status:500;
            this.logger.error(ex);
            res.status(status).json({message: ex.message});
        }
    }
    public async create (req:express.Request, res:express.Response) {
        try {
            this.logger.info('POST /task');
            const taskInfo = req.body;
            await TaskService.create(taskInfo);
            res.json({message: 'Task successfully created'});
        } catch (ex) {
            const status = ex.status?ex.status:500;
            this.logger.error(ex);
            res.status(status).json({message: ex.message});
        }
    }
    public async update (req:express.Request, res:express.Response) {
        try {
            this.logger.info('PUT /task/<id>');
            const taskId = req.params.id;
            const taskInfo = req.body;
            await TaskService.update(taskId, taskInfo);
            res.json({message: 'Task successfully updated'});
        } catch (ex) {
            const status = ex.status?ex.status:500;
            this.logger.error(ex);
            res.status(status).json({message: ex.message});
        }
    }
    public async delete (req:express.Request, res:express.Response) {
        try {
            this.logger.info('DELETE /task/<id>');
            const taskId = req.params.id;
            await TaskService.delete(taskId);
            res.json({message: 'Task successfully deleted'});
        } catch (ex) {
            const status = ex.status?ex.status:500;
            this.logger.error(ex);
            res.status(status).json({message: ex.message});
        }
    }
}

export default new TaskController();