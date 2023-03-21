import style from './Teclado.module.scss';
import deleteImg from '../../assets/img/delete.png';
import { PassThrough } from 'stream';


export default function Teclado() {
    const imgApagar = <img src={deleteImg} width='25px' alt='Apagar'></img>;

    const teclas = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], 
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], 
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', imgApagar]
    ];

    let linha:number, coluna: number, palavra: string;
    linha = coluna = 0;
    palavra = '';
    const escreveLetra = (evento: React.MouseEvent<HTMLButtonElement>) => {   
        let campoLetra = document.getElementById(`campo-letra${linha}-${coluna}`); 
        let letra = (evento.target as any).innerHTML;

        if(letra.length == 1) {

            if(campoLetra != null) {
                campoLetra.innerHTML = letra;
                palavra += letra;
            }

            if(coluna < 5) coluna++;

        } else if(letra == 'ENTER') {

            if(coluna == 5) {
                coluna = 0;
                linha++;
            }

        } else {

            if(coluna > 0) coluna--; 
            campoLetra = document.getElementById(`campo-letra${linha}-${coluna}`);

            if(campoLetra != null) {
                campoLetra.innerHTML = '';
                palavra = palavra.slice(0, -1);
            }

        }
    };

    return (
        <section className={style.teclado}>

            {Array(3).fill(true).map((_, i: number) => (
                <div className={style.linha} id={style['linha'+i]} key={'linha'+i}>

                    {teclas[i].map((tecla: string | JSX.Element, j: number) => (
                        <button className={style.tecla} key={`tecla${i}-${j}`} onClick={evento => escreveLetra(evento)}> 
                            {tecla} 
                        </button>
                    ))}

                </div>
            ))}

        </section>
    )
}
