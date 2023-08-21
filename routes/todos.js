"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    return res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    return res.status(200).json({ todos: todos });
});
router.delete('/delete-todo/:id', (req, res, next) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todos[todoIndex]) {
        todos.splice(todoIndex, 1);
        return res.status(200).json({ success: `todo Item with ${id} deleted succesfully` });
    }
    else {
        return res.status(404).json({ error: `todo Item not found.` });
    }
});
router.post('/edit-todo', (req, res, next) => {
    const todo = {
        id: req.body.id,
        text: req.body.text
    };
    const todoIndex = todos.findIndex((result) => result.id === todo.id);
    if (todos[todoIndex]) {
        todos[todoIndex].text = todo.text;
        return res.status(200).json({ success: `Todo Item with ID ${todo.id} edited successfully` });
    }
    else {
        return res.status(404).json({ error: `Todo Item not found.` });
    }
});
exports.default = router;
