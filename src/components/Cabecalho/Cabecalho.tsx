import style from './Cabecalho.module.scss';


export default function Cabecalho() {
    return (
        <header className={style.cabecalho}>
            <span className={style.logo}>W</span>

            <button className={style['btn-tutorial']} id={'abrir-tutorial'} onClick={() => abrirTutorial()}>
                ?
            </button>
        </header>
    )
}


function abrirTutorial() {
    (document.getElementById('tutorial') as HTMLElement).style.display = 'block';
}