import Cabecalho from '../components/Cabecalho';
import listaPalavras from '../local-json/lista-palavras.json';
import Palavra from '../components/Palavra';
import style from './App.module.scss';
import Teclado from '../components/Teclado';
import { useState } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const palavraSecreta =sorteiaPalavra();

export default function App() {  
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
        {Array(6).fill(true).map((_, i) => <Palavra key={'palavra'+i} linha={i} />)}
      </section>

      <Teclado palavraSecreta={palavraSecreta} />

    </div>
  );
}

function sorteiaPalavra() {
  const indiceSorteado =Math.floor(Math.random() * listaPalavras.length);
  return 'BOATO'
  /* return listaPalavras[indiceSorteado]; */
}
