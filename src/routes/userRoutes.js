import { Router } from 'express';
import userController from '../controllers/UserController';
// importamos o middleware e passamos na rota que precisarmos
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', userController.store);
router.get('/', loginRequired, userController.index);
// recebe o parametro :id para acessar exatamente o usuário
router.get('/:id', userController.show);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;

/*
Cada controller tem até 5 regras/métodos

- index -> lista todos os usuários -> GET
- store/create -> cria um novo usuário -> POST
- delete -> apaga um usuário -> DELETE
- show -> que mostra um usuário -> GET
- update -> atualiza um usuário -> PATCH ou PUT
*/
