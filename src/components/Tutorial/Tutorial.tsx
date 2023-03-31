import exemploAcerto from '../../assets/img/exemplo-acerto.png';
import exemploTemNaPalavra from '../../assets/img/exemplo-tem-na-palavra.png';
import exemplo from '../../assets/img/exemplo.png';
import XIcone from '../../assets/img/x-icone.png';
import style from './Tutorial.module.scss';
import { useCallback, useEffect } from 'react';

export default function Tutorial() {
    const trataEvento = useCallback((evento: KeyboardEvent) => {
        if(evento.key === 'Escape') fecharTutorial(evento)
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', trataEvento);
    
        return () => {
          document.removeEventListener('keydown', trataEvento);
        }
    }, []);


    return (
        <section className={style['tutorial-container']} id='tutorial' onClick={(evento) => fecharTutorial(evento)}>
            <div className={style.tutorial}>
                
                <button className={style['btn-fechar']} id='fechar-tutorial' onClick={(evento) => fecharTutorial(evento)}> 
                    <img src={XIcone} /> 
                </button>

                <h2>COMO JOGAR</h2>

                <p className={style.resumo}> O jogo consiste em descobrir uma palavra de 5 letras em até 6 tentativas. Cada letra digitada é verificada e, caso a letra esteja presente na palavra e na posição correta, ela é exibida em verde. Caso a letra esteja presente na palavra, porém na posição incorreta, ela é exibida em amarelo. O jogador pode usar essas informações para adivinhar a palavra secreta e ganhar o jogo. </p>

                <figure>
                    <img src={exemploAcerto} />
                    <figcaption>Neste caso a letra <b>E</b> está na palavra secreta e na posição correta.</figcaption>
                </figure>

                <figure>
                    <img src={exemploTemNaPalavra} />
                    <figcaption>Neste caso a letra <b>R</b> está na palavra secreta, mas em outra posição.</figcaption>
                </figure>

                <figure>
                    <img src={exemplo} />
                    <figcaption>Ou seja, neste exemplo, a letra <b>E</b> está na palavra secreta e na posição correta, as letras <b>R</b> e <b>T</b> estão na palavra, mas em outra posição e a palavra secreta não possui as letras <b>S</b> e <b>A</b></figcaption>
                </figure>      

            </div>
        </section>
    )
}


export function fecharTutorial(evento: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) {
    const tutorialContainer = document.getElementById('tutorial') as HTMLElement;
    const btnFechar = document.getElementById('fechar-tutorial') as HTMLButtonElement;
    const btnAbrir = document.getElementById('abrir-tutorial');
    const body = document.querySelector('body');

    const camposPermitidos = [tutorialContainer, btnFechar, btnFechar.firstElementChild, btnAbrir, body];

    if(camposPermitidos.includes(evento.target as HTMLElement)) tutorialContainer.style.display = 'none';
}