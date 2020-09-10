import mongoose from 'mongoose';
import log4js from 'log4js';
import TaskDomain from '../domain/task';
import ValidateTaskObject from '../util/task-object-validation';
import ExceptionMap from '../util/exception-message-map';
import HttpRequestError from '../util/errors/http-request-error';

class TaskService{
    private logger:log4js.Logger;

    public constructor(){
        this.logger = log4js.getLogger('task-service');
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }    
    private queryBuilder(match: Record<string, string | undefined>) {
        const query:Record<string, unknown> = {};
        if(match.id){
            const taskId = match.id.toString();
            if(!mongoose.Types.ObjectId.isValid(taskId)){
                throw new HttpRequestError(ExceptionMap.TASK_ID_INVALID, 400);
            } else {
                query._id = mongoose.Types.ObjectId(taskId);
            }
        }
        if(match.name){
            query.name = { $regex : new RegExp(`${match.name}`, "i") }; 
        }
        if(match.description){
            query.description = { $regex : new RegExp(`${match.description}`, "i") }; 
        }

        return query;               
    }
    private sortBuilder(sortParameter:string | undefined, order:string | undefined){
        const builtSort:Record<string, number> = {};
        const builtOrder = order === 'desc' ? -1:1;
        if(sortParameter){
            builtSort[sortParameter] = builtOrder;
        }
        return builtSort;
    }
    public async get(match:Record<string, string | undefined>, sort:string | undefined, order:string | undefined) {
        this.logger.info('Getting list of tasks');
        const findExpression = this.queryBuilder(match);
        const sortExpression = this.sortBuilder(sort, order);
        const foundTasks = await TaskDomain.find(findExpression).sort(sortExpression);
        return foundTasks;
    }
    public async create(taskInfo:Record<string, string>) {
        this.logger.info('Creating task');
        const validatedTaskInfo = ValidateTaskObject.OnCreation(taskInfo);
        const newTask = new TaskDomain(validatedTaskInfo);
        await newTask.save();
    }
    public async update(taskId:string, taskInfo:Record<string, string | undefined>) {
        this.logger.info('Updating task');
        const validatedTaskInfo = ValidateTaskObject.OnUpdate(taskId, taskInfo);
        const updateResult = await TaskDomain.findOneAndUpdate({ _id: validatedTaskInfo.id },validatedTaskInfo, { useFindAndModify: false });
        if(updateResult === null){
            throw new HttpRequestError(ExceptionMap.TASK_UPDATE_NOT_FOUND, 404);
        }
    }
    public async delete(taskId:string) {
        this.logger.info('Deleting task');
        const deleteResult = await TaskDomain.findByIdAndDelete(mongoose.Types.ObjectId(taskId));
        if(deleteResult === null){
            throw new HttpRequestError(ExceptionMap.TASK_DELETE_NOT_FOUND, 404);
        }
    }
}

export default new TaskService();