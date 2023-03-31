import style from './Cabecalho.module.scss';


export default function Cabecalho() {
    return (
        <header className={style.cabecalho}>
            <a className={style.logo} href='https://www.nytimes.com/games/wordle/index.html' target='_blank'>W</a>

            <button className={style['btn-tutorial']} id={'abrir-tutorial'} onClick={() => abrirTutorial()}>
                ?
            </button>
        </header>
    )
}


function abrirTutorial() {
    (document.getElementById('tutorial') as HTMLElement).style.display = 'block';
}