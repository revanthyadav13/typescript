import {Router} from 'express'

import {Todo} from '../models/todo'

const todos:Todo[]=[];

const router = Router();

type requestBody={id:string,text:string};
type requestParams={id:string};

router.get('/', (req, res ,next)=>{
   return res.status(200).json({todos:todos})
});

router.post('/todo', (req, res, next)=>{
    const body=req.body as requestBody;
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:body.text
    };

    todos.push(newTodo);
    return res.status(200).json({todos:todos});
});

router.delete('/delete-todo/:id', (req, res ,next)=>{
    const params=req.params as requestParams;
const id=params.id;

const todoIndex = todos.findIndex((todo) => todo.id === id);

if(todos[todoIndex]){
    todos.splice(todoIndex,1);
    return res.status(200).json({success:`todo Item with ${id} deleted succesfully`})
}
else{
    return res.status(404).json({error:`todo Item not found.`})
}
    
 });
 router.post('/edit-todo', (req, res ,next)=>{
    const body= req.body as requestBody;
    const todo:Todo={
        id:body.id,
        text:body.text
    };
    const todoIndex = todos.findIndex((result) => result.id === todo.id);

  if (todos[todoIndex]) {
    todos[todoIndex].text = todo.text;
    return res.status(200).json({ success: `Todo Item with ID ${todo.id} edited successfully` });
  } else {
    return res.status(404).json({ error: `Todo Item not found.` });
  }
   
      
     });

export default router;