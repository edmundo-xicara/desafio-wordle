import style from './Palavra.module.scss';


export default function Palavra({linha}: {linha: number}) {
    return (
        <article className={style.palavra}>

            {Array(5).fill(true).map((_, coluna) => (
                <div className={style.letra} id={`campo-letra${linha}-${coluna}`} key={`campo-letra${linha}-${coluna}`}></div>
            ))}

        </article>
    )
}
