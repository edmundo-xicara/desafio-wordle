import style from './Palavra.module.scss';
import './style.scss';


export default function Palavra({linha}: {linha: number}) {
    return (
        <article className={`${style.palavra} palavra`} id={'palavra'+linha}>
            
            {Array(5).fill(true).map((_, coluna) => (
                <div className={style.letra} id={`campo-letra${linha}-${coluna}`} key={`campo-letra${linha}-${coluna}`}></div>
            ))}

        </article>
    )
}
