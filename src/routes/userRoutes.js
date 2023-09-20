import { Router } from 'express';
import userController from '../controllers/UserController';
// importamos o middleware e passamos na rota que precisarmos
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Não deveriam existir num sistema real
router.get('/', userController.index);
// router.get('/:id', userController.show);

router.post('/', userController.store);
// ambos seguintes por segurança devemos deixar o acesso restrito
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;

/*
Cada controller tem até 5 regras/métodos

- index -> lista todos os usuários -> GET
- store/create -> cria um novo usuário -> POST
- delete -> apaga um usuário -> DELETE
- show -> que mostra um usuário -> GET
- update -> atualiza um usuário -> PATCH ou PUT
*/
