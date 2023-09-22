import multer from 'multer';
import { extname, resolve } from 'path';

// vamos gerar um número aleatório para acrescentar no nome do arquivo
// e garantir que não seja possível mais de uma foto com o mesmo nome
// a função vai gerar um número entre 10000 e 20000

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  // fileFilter vai receber detalhes que vão filtrar os arquivos enviados
  // recebe uma callback
  fileFilter: (req, file, cb) => {
    // vamos utilizar o mimetype no arquivo 'file', esse método é disponível no fileFilter
    // e checar o tipo do arquivo
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      // retornamos o erro usando o constructor MulterError localizado no multer
      return cb(new multer.MulterError('Arquivo inválido'));
    }
    // passando pelo filtro retornamos
    return cb(null, true);
  },
  // storage é uma propriedade que vai receber detalhes do armazenamento do arquivo
  storage: multer.diskStorage({
    // vamos definir o destino do arquivo
    destination: (req, file, cb) => {
      // uso '..' para voltar um diretório até chegar na pasta raiz do projeto
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    // vamos determinar o nome do arquivo
    filename: (req, file, cb) => {
      // definimos o nome sendo a data atual + _ + numero aleatório gerado +
      // a extensão do nome original do arquivo
      // ex 1631536800_20000.jpg
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
