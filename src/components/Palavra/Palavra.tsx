import style from './Palavra.module.scss';
import { IPalavra } from '../../types/palavras';
import './style.scss';


export default function Palavra({linha, palavra}: {linha: number, palavra: IPalavra}) {
    return (
        <article className={`${style.palavra} palavra`} id={'palavra'+linha}>
            
            {Array(5).fill(true).map((_, coluna) => (
                <div 
                className={`${style.letra} ${palavra[`campoLetra${coluna}`].classe}`} 
                id={`campo-letra${linha}-${coluna}`} 
                key={`campo-letra${linha}-${coluna}`}>

                    <span>{palavra[`campoLetra${coluna}`].letra}</span>

                </div>
            ))}

        </article>
    )
}
