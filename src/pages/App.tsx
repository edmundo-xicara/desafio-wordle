import { useState } from 'react';
import Alerta from '../components/Alerta';
import Palavra from '../components/Palavra';
import Teclado from '../components/Teclado';
import listaPalavras from '../local-json/lista-palavras.json';
import style from './App.module.scss';


const palavraSecreta = sorteiaPalavra();

export default function App() {  
  const [alerta, setAlerta] = useState({'tipo': 'escondido', 'texto': ''});

  return (
    <div className={style.app}>

      <Alerta alerta={alerta} />

      <section className='palavras'>
        {Array(6).fill(true).map((_, i) => <Palavra key={'palavra'+i} linha={i} />)}
      </section>

      <Teclado palavraSecreta={palavraSecreta} setAlerta={setAlerta} />

    </div>
  );
}

function sorteiaPalavra() {
  const indiceSorteado = Math.floor(Math.random() * listaPalavras.length);
  
  return listaPalavras[indiceSorteado].toUpperCase();
}
