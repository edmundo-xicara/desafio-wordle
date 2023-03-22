import Palavra from '../components/Palavra';
import Teclado from '../components/Teclado';
import listaPalavras from '../local-json/lista-palavras.json';
import style from './App.module.scss';

export default function App() {  
  return (
    <div className={style.app}>

      <section className='palavras'>
        {Array(6).fill(true).map((_, i) => <Palavra key={'palavra'+i} linha={i} />)}
      </section>

      <Teclado palavraSecreta={sorteiaPalavra()} />

    </div>
  );
}

function sorteiaPalavra() {
  const indiceSorteado = Math.floor(Math.random() * listaPalavras.length);
  
  return listaPalavras[indiceSorteado].toUpperCase();
}
