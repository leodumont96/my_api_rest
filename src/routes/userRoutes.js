import { Router } from 'express';
import userController from '../controllers/UserController';

const router = new Router();

router.post('/', userController.store);

export default router;

/*
Cada controller tem até 5 regras/métodos

- index -> lista todos os usuários -> GET
- store/create -> cria um novo usuário -> POST
- delete -> apaga um usuário -> DELETE
- show -> que mostra um usuário -> GET
- update -> atualiza um usuário -> PATCH ou PUT
*/
