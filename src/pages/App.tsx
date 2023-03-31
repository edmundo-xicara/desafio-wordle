import Cabecalho from '../components/Cabecalho/Cabecalho';
import JogarNovamente from '../components/JogarNovamente/JogarNovamente';
import listaPalavras from '../banco-de-palavras/lista-palavras.json';
import Palavra from '../components/Palavra/Palavra';
import style from './App.module.scss';
import Teclado from '../components/Teclado/Teclado';
import Tutorial, { fecharTutorial } from '../components/Tutorial/Tutorial';
import { IPalavras, IPalavra } from '../types/palavras';
import { ToastContainer, Zoom } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';


const palavraSecreta = sorteiaPalavra();

export default function App() {  
  const [palavras, setPalavras] = useState(criaStatePalavra());

  return (
    <div className={style.app} >

      <Tutorial />

      <Cabecalho />

      <ToastContainer 
        position='top-center' 
        hideProgressBar={true}
        pauseOnHover={false}
        draggable={false}
        pauseOnFocusLoss={false}
        theme='colored'
        transition={Zoom}
        role='alert' />

      <section className={style.palavras}>

        {Array(6).fill(true).map((_, i) => (
          <Palavra 
          key={'palavra'+i} 
          linha={i} 
          palavra={(palavras as any)[`palavra${i}`]} />))}

      </section>

      <Teclado palavraSecreta={palavraSecreta} setPalavras={setPalavras} />

      <JogarNovamente />

    </div>
  );
}


function criaStatePalavra(): IPalavras {
  let palavras: IPalavras = {} as IPalavras;
  
  for(let i = 0; i < 6; i++) {
    let palavra: IPalavra = {} as IPalavra;

    for(let j = 0; j < 5; j++) palavra[`campoLetra${j}`] = {'classe': '', 'letra': ''};

    palavras[`palavra${i}`] = palavra;
  }

  palavras.palavra0.campoLetra0.classe = 'ativo';

  return palavras;
}


function sorteiaPalavra() {
  const indiceSorteado =Math.floor(Math.random() * listaPalavras.length);
  return 'TERMO'
  return listaPalavras[indiceSorteado];
}
