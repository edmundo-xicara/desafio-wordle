import { useState } from 'react';
import Palavra from '../components/Palavra';
import Teclado from '../components/Teclado';
import style from './App.module.scss';

export default function App() {
  return (
    <div className={style.app}>

      <section className='palavras'>
        {Array(6).fill(true).map((_, i) => <Palavra key={'palavra'+i} linha={i} />)}
      </section>

      <Teclado />

    </div>
  );
}
