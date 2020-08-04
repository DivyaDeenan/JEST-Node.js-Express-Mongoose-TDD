const todoController = require('../../controllers/todo.controller');
const todoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const todo = require('../mockData/todo.json');
const todos = require('../mockData/all-todo.json');


todoModel.create = jest.fn();
todoModel.find = jest.fn();
todoModel.findById = jest.fn();
todoModel.findByIdAndUpdate = jest.fn();
todoModel.findByIdAndDelete = jest.fn();

let req,res,next;
const todoID='5f29b6a2cdd25564b44f65eb';
beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
   
});

describe("TODO Controller delete TODO By ID", ()=>{
    it("should have a delete to do by id function", async ()=>{
        expect(typeof todoController.deleteToDOByID).toBe("function");
    });
    it("should call todoModel.delete with route parameters", async ()=>{
        req.params.todoID = todoID;
        await todoController.deleteToDOByID(req,res,next);
        expect(todoModel.findByIdAndDelete).toHaveBeenCalledWith(todoID);
    });

    it("should return status code 200 and return the todo deleted by ID", async ()=>{
        todoModel.findByIdAndDelete.mockReturnValue(todo);
        await todoController.deleteToDOByID(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(todo);
    });
    it("should handle errors",async ()=>{
        const errorMessage = {message: "Error while deleting todo By Id"};
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await todoController.deleteToDOByID(req,res,next);
        expect(next).toHaveBeenCalledWith(errorMessage);

    });
    it("should handle error when the todo to be deleted does not exist in db",async ()=>{
        todoModel.findByIdAndDelete.mockReturnValue(null);
        await todoController.deleteToDOByID(req,res,next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();

    });
});

describe("TODO Controller update TODO By ID", ()=>{
    it("should have a update to do by id function", async ()=>{
        expect(typeof todoController.updateToDOByID).toBe("function");
    });
    it("should call todoModel.update with route parameters", async ()=>{
        req.params.todoID = todoID;
        req.body = todo;
        await todoController.updateToDOByID(req,res,next);
        expect(todoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoID,todo,{
            new : true,
            useFindAndModify : false
        });
    });

    it("should return status code 200 and return the todo updated by ID", async ()=>{
        //req.params.todoID = todoID;
        //req.body = todo;
        todoModel.findByIdAndUpdate.mockReturnValue(todo);
        await todoController.updateToDOByID(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(todo);
    });
    it("should handle errors",async ()=>{
        const errorMessage = {message: "Error while updating todo By Id"};
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await todoController.updateToDOByID(req,res,next);
        expect(next).toHaveBeenCalledWith(errorMessage);

    });
    it("should handle error when the todo to be updated does not exist in db",async ()=>{
        todoModel.findByIdAndUpdate.mockReturnValue(null);
        await todoController.updateToDOByID(req,res,next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();

    });
});

describe("TODO Controller get to do by ID", ()=>{
    it("should have a get to do by id function", async ()=>{
        expect(typeof todoController.getToDOByID).toBe("function");
    });
    it("should call todoModel.findById with route parameters", async ()=>{
        req.params.todoID = todoID;
        await todoController.getToDOByID(req,res,next);
        expect(todoModel.findById).toHaveBeenCalledWith(todoID);
    });

    it("should return status code 200 and return the todo requested by ID", async ()=>{
        todoModel.findById.mockReturnValue(todo);
        await todoController.getToDOByID(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(todo);
    });
    it("should handle errors",async ()=>{
        const errorMessage = {message: "Error while finding todo By Id"};
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.findById.mockReturnValue(rejectedPromise);
        await todoController.getToDOByID(req,res,next);
        expect(next).toHaveBeenCalledWith(errorMessage);

    });
    it("should handle error when the todo does not exist in db",async ()=>{
        todoModel.findById.mockReturnValue(null);
        await todoController.getToDOByID(req,res,next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();

    });
});
describe("TODO controller get to TODOs",()=>{
    it('should have a get to do function',()=>{
        expect(typeof todoController.getToDO).toBe("function");
    });
    it("should call todoModel.find({})", async ()=>{
        await todoController.getToDO(req,res,next);
        expect(todoModel.find).toHaveBeenCalledWith({});
    });

    it("should return status code 200 and return all todos", async ()=>{
        todoModel.find.mockReturnValue(todos);
        await todoController.getToDO(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(todos);
    });

    it("should handle errors",async ()=>{
        const errorMessage = {message: "Error while finding todos"};
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.find.mockReturnValue(rejectedPromise);
        await todoController.getToDO(req,res,next);
        expect(next).toHaveBeenCalledWith(errorMessage);

    })
});

describe("Todo Controller create todo",()=>{
    beforeEach(()=>{
        req.body = todo;
    });
    it('should have a create to do function',()=>{
        expect(typeof todoController.createToDo).toBe("function");
    });

    it('should call TodoModel.create',()=>{
      
        todoController.createToDo(req,res,next);
        expect(todoModel.create).toBeCalledWith(todo);
    });

    it('should return response code 201', async ()=>{
       
        await todoController.createToDo(req,res,null);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body',async ()=>{
        todoModel.create.mockReturnValue(todo);
        await todoController.createToDo(req,res,next);
        expect(res._getJSONData()).toStrictEqual(todo);

    });
    it("should handle errors", async () => {
        const errorMessage = { message: "Done property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.create.mockReturnValue(rejectedPromise);
        await todoController.createToDo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
      });
});





