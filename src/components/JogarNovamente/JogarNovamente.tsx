import style from './JogarNovamente.module.scss';

export default function JogarNovamente() {
    return (
        <button 
        className={style['btn-jogar-novamente']} 
        id='btn-jogar-novamente'
        onClick={() => {reiniciarJogo()}}>

            Jogar Novamente
            
        </button>
    )
}


function reiniciarJogo() {
    window.location.reload();
}