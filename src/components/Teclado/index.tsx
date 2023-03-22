import style from './Teclado.module.scss';
import deleteImg from '../../assets/img/delete.png';


export default function Teclado({palavraSecreta}: {palavraSecreta: string}) {
    const imgApagar = <img src={deleteImg} width='25px' alt='Apagar'></img>;

    const teclas = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], 
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], 
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', imgApagar]
    ];

    let linha:number, coluna: number;
    linha = coluna = 0;
    const escreveLetra = (evento: React.MouseEvent<HTMLButtonElement>) => {   
        let campoLetra = document.getElementById(`campo-letra${linha}-${coluna}`); 
        let letra = (evento.target as any).innerHTML;

        if(letra.length === 1) {

            if(campoLetra) campoLetra.innerHTML = letra;

            if(coluna < 5) coluna++;

        } else if(letra === 'ENTER') {

            if(coluna === 5) {
                verificaPalavra(linha, palavraSecreta);

                coluna = 0;
                linha++;
            }

        } else {

            if(coluna > 0) coluna--; 
            campoLetra = document.getElementById(`campo-letra${linha}-${coluna}`);

            if(campoLetra) campoLetra.innerHTML = '';

        }

    };

    return (
        <section className={style.teclado}>

            {Array(3).fill(true).map((_, i: number) => (
                <div className={style.linha} id={style['linha'+i]} key={'linha'+i}>

                    {teclas[i].map((tecla: string | JSX.Element, j: number) => (
                        <button className={`${style.tecla} ${style[typeof tecla === 'string' ? tecla : 'DELETE']}`} key={`tecla${i}-${j}`} onClick={evento => escreveLetra(evento)} id={typeof tecla === 'string' ? tecla : 'DELETE'}> 
                            {tecla} 
                        </button>
                    ))}

                </div>
            ))}

        </section>
    )
}


function verificaPalavra(linha: number, palavraSecreta: string) {
    let letrasAcertadas = 0;

    for(let i = 0; i < 5; i++) {
        let campoLetra = document.getElementById(`campo-letra${linha}-${i}`);

        if(campoLetra) {
            let letra = campoLetra.innerHTML;
            let tecla = document.getElementById(letra);
            console.log(tecla)

            if(letra === palavraSecreta[i]) {

                campoLetra.classList.add('acertou');
                if(tecla) tecla.classList.add('acertou');

                palavraSecreta = palavraSecreta.replace(letra, ' ');

                letrasAcertadas++;

            } else if(palavraSecreta.indexOf(letra) !== -1) {

                campoLetra.classList.add('tem-na-palavra');
                if(tecla && !tecla.classList.contains('acertou')) tecla.classList.add('tem-na-palavra');

                palavraSecreta = palavraSecreta.replace(letra, ' ');

            } else {

                if(tecla && !tecla.classList.contains('tem-na-palavra') && !tecla.classList.contains('acertou')) {
                    (tecla as HTMLButtonElement).disabled = true;
                    tecla.classList.add('desabilitado');
                }

            }
        }
    }
}
