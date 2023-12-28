import { Router } from 'express';
import { model } from 'mongoose';

const TodosModel = model('todos');

const route = Router();

route.get('/', async (req, res) => {
  try {
    const todos = await TodosModel.find({});
    res.json(todos);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

route.get('/:id', async (req, res) => {
  try {
    const todo = await TodosModel.findById(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

route.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    let newTodo = new TodosModel({ title, description });
    newTodo = await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await TodosModel.findByIdAndDelete(id);
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await TodosModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

route.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTodo = await TodosModel.findOneAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default route;
