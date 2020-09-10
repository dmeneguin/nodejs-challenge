const ExceptionMessageMap = Object.freeze({
    TASK_NAME_VIOLATION: 'The task name is a required attribute',
    TASK_DESCRIPTION_VIOLATION: 'The task description is a required attribute',
    TASK_ID_VIOLATION: 'The task id is a required attribute',
    TASK_ID_INVALID: 'Invalid task id',
    TASK_UPDATE_NOT_FOUND: 'Task not found',
    TASK_DELETE_NOT_FOUND: 'Task not found',
})

export default ExceptionMessageMap;