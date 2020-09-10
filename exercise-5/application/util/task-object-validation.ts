import mongoose from 'mongoose';
import ExceptionMap from './exception-message-map';
import HttpRequestError from './errors/http-request-error';

class TaskValidation {
    isObjectIdValid = mongoose.Types.ObjectId.isValid;
    OnCreation (object:Record<string, string>) {
        if(!object.name) {
            throw new HttpRequestError(ExceptionMap.TASK_NAME_VIOLATION, 400);
        } 
        if(!object.description) {
            throw new HttpRequestError(ExceptionMap.TASK_DESCRIPTION_VIOLATION, 400);
        } 
        const validatedTaskInfo = {
            name: object.name,
            description: object.description,
        }
        return validatedTaskInfo;
    }
    OnUpdate (taskId:string, object:Record<string, string | undefined>) {
        const validatedTaskInfo:Record<string, string | mongoose.Types.ObjectId> = {};
        if(!taskId) {
            throw new HttpRequestError(ExceptionMap.TASK_ID_VIOLATION, 400);
        } else {
            if(!this.isObjectIdValid(taskId)){
                throw new HttpRequestError(ExceptionMap.TASK_ID_INVALID, 400);
            }
            validatedTaskInfo.id = mongoose.Types.ObjectId(taskId);
        }
        if(object.name) {
            validatedTaskInfo.name = object.name;
        }
        if(object.description) {
            validatedTaskInfo.description = object.description;
        }
        return validatedTaskInfo;
    }

}

export default new TaskValidation();