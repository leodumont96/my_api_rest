import multer from 'multer';
import multerConfig from '../config/multer';

import Foto from '../models/Foto';

// atribuo a constante upload a função multer para receber o upload
// passo como argumento as configurações dele
// e uso o método single pra dizer que vai receber um único arquivo
// do 'fieldName' campo de nome 'foto' na requisição
const upload = multer(multerConfig).single('foto');

class FotoController {
  // método store pois estamos criando (put)
  async store(req, res) {
    // executamos a função upload configurada e que ao ser executada
    // vamos capturar algum possível erro, pra isso, passamos como parametro
    // a requisição e a resposta do pedido, em seguida uma função pra ser executada
    // se houver algum erro como já fizemos
    return upload(req, res, (error) => {
      if (error) {
        return res.status(400).json({
          // caso haja erro, será retornado um objeto que foi contruído pelo MulterError
          // (ver config/multer), mas queremos apenas a propriedade 'code', que contém
          // a mensagem de erro
          errors: [error.code],
        });
      }
      // precisamos desses campos que foram enviados na requisição ao enviar o arquivo
      const { originalname, filename } = req.file;
      // criamos a foto
      const foto = Foto.create({ originalname, filename });
      // e retornamos
      return res.json(foto);
    });
  }
}

export default new FotoController();
