import Cabecalho from '../components/Cabecalho';
import listaPalavras from '../local-json/lista-palavras.json';
import Palavra from '../components/Palavra';
import style from './App.module.scss';
import Teclado from '../components/Teclado';
import { useState } from 'react';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const palavraSecreta = sorteiaPalavra();

export default function App() {  
  const [palavras, setPalavras] = useState(criaStatePalavra());

  return (
    <div className={style.app}>

      <Cabecalho />

      <ToastContainer 
        position='top-center' 
        hideProgressBar={true}
        pauseOnHover={false}
        draggable={false}
        pauseOnFocusLoss={false}
        theme='colored'
        transition={Zoom} />

      <section className={style.palavras}>

        {Array(6).fill(true).map((_, i) => (
          <Palavra 
          key={'palavra'+i} 
          linha={i} 
          palavra={(palavras as any)[`palavra${i}`]} />))}

      </section>

      <Teclado palavraSecreta={palavraSecreta} setPalavras={setPalavras} />

    </div>
  );
}


function criaStatePalavra(): Record<string, Record<string, Record<string, string>>> {
  let palavras: Record<string, Record<string, Record<string, string>>> = {};
  
  for(let i = 0; i < 6; i++) {
    let palavra: Record<string, Record<string, string>> = {};

    for(let j = 0; j < 5; j++) palavra[`campoLetra${j}`] = {'classe': '', 'letra': ''};

    palavras[`palavra${i}`] = palavra;
  }

  palavras.palavra0.campoLetra0.classe = 'ativo';

  return palavras;
}


function sorteiaPalavra() {
  const indiceSorteado =Math.floor(Math.random() * listaPalavras.length);
  return 'NASAL'
  return listaPalavras[indiceSorteado];
}
