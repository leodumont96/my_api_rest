import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', userController.index);
// router.get('/:id', userController.show);

router.post('/', loginRequired, userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/:id', loginRequired, userController.delete);

export default router;

/*
Cada controller tem até 5 regras/métodos

- index -> lista todos os usuários -> GET
- store/create -> cria um novo usuário -> POST
- delete -> apaga um usuário -> DELETE
- show -> que mostra um usuário -> GET
- update -> atualiza um usuário -> PATCH ou PUT
*/
