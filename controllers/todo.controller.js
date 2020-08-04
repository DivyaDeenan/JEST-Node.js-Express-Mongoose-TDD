const TodoModel = require("../model/todo.model");
const todoModel = require("../model/todo.model");

exports.createToDo = async (req, res, next) => {
  try {
    const createdModel = await TodoModel.create(req.body);
    res.status(201).json(createdModel);
  } catch (err) {
    next(err);
  }
};

exports.getToDO = async (req, res, next) => {
  try {
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos);
  } catch (err) {
    next(err);
  }
};

exports.getToDOByID = async(req,res,next)=>{
  try{
    const todo = await todoModel.findById(req.params.todoID);
    if(todo)
    res.status(200).json(todo);
    else
    res.status(404).send();
    //res.status(404).json();

  }
  catch(err){
    next(err);
 }
};

exports.updateToDOByID = async(req,res,next)=>{
  try{
    const todo = await todoModel.findByIdAndUpdate(req.params.todoID,req.body,{new:true,useFindAndModify:false});
    if(todo)
    res.status(200).json(todo);
    else
    res.status(404).send();
    //res.status(404).json();*/

  }
  catch(err){
    next(err);
 }
};

exports.deleteToDOByID = async(req,res,next)=>{
  try{
    const todo = await todoModel.findByIdAndDelete(req.params.todoID);
    if(todo)
    res.status(200).json(todo);
    else
    res.status(404).send();
    //res.status(404).json();

  }
  catch(err){
    next(err);
 }
};