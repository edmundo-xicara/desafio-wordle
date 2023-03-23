import { useState } from 'react';
import { IPosicao } from '../../types/posicao';
import { IAlerta } from '../../types/alerta';
import listaPalavras from '../../local-json/lista-palavras-sem-acento.json';
import style from './Teclado.module.scss';
import deleteImg from '../../assets/img/delete.png';


export default function Teclado({palavraSecreta, setAlerta}: {palavraSecreta: string, setAlerta: React.Dispatch<React.SetStateAction<IAlerta>>}) {

    const imgApagar = <img src={deleteImg} width='25px' alt='Apagar'></img>;

    const teclas = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], 
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'], 
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', imgApagar]
    ];

    const [posicao, setPosicao] = useState({'linha': 0, 'coluna': 0});

    return (
        <section className={style.teclado}>

            {Array(3).fill(true).map((_, i: number) => (
                <div className={style.linha} id={style['linha'+i]} key={'linha'+i}>

                    {teclas[i].map((tecla: string | JSX.Element, j: number) => (
                        <button className={`${style.tecla} ${style[typeof tecla === 'string' ? tecla : 'DELETE']}`} key={`tecla${i}-${j}`} onClick={evento => escreveLetra(evento, posicao, setPosicao, setAlerta, palavraSecreta)} id={typeof tecla === 'string' ? tecla : 'DELETE'}> 
                            {tecla} 
                        </button>
                    ))}

                </div>
            ))}

        </section>
    )
}


function escreveLetra(evento: React.MouseEvent<HTMLButtonElement>, posicao: IPosicao, setPosicao: React.Dispatch<React.SetStateAction<IPosicao>>, setAlerta: React.Dispatch<React.SetStateAction<IAlerta>>, palavraSecreta: string) {
    let campoLetra = document.getElementById(`campo-letra${posicao.linha}-${posicao.coluna}`); 
    let letra = (evento.target as any).innerHTML;

    if(letra.length === 1) {

        if(campoLetra) campoLetra.innerHTML = letra;

        if(posicao.coluna < 5) setPosicao({...posicao, coluna: posicao.coluna+1});

    } else if(letra === 'ENTER') {

        if(posicao.coluna === 5) {

            let letrasDigitadas = document.getElementById(`palavra${posicao.linha}`)?.children;
            let palavraDigitada = '';
            if(letrasDigitadas) for(let i = 0; i < letrasDigitadas.length; i++) {
                palavraDigitada += letrasDigitadas[i].innerHTML;
            }

            if(listaPalavras.includes(palavraDigitada.toLowerCase())) {

                verificaPalavra(posicao.linha, palavraSecreta);
                setPosicao({linha: posicao.linha+1, coluna: 0})
                palavraDigitada = '';
                setAlerta({'tipo': 'escondido', 'texto': ''});
                
            } else setAlerta({'tipo': 'erro', 'texto': 'Palavra não está na lista'});
        
        } else setAlerta({'tipo': 'erro', 'texto': 'Preencha todas as letras'}); 

    } else {

        if(posicao.coluna > 0) setPosicao({...posicao, coluna: posicao.coluna-1}); 

        campoLetra = document.getElementById(`campo-letra${posicao.linha}-${posicao.coluna-1}`);
        
        if(campoLetra) campoLetra.innerHTML = '';

    }
}


function verificaPalavra(linha: number, palavraSecreta: string) {
    let letrasAcertadas = 0;

    const removeAcento = (str: string) => {
        const mapaAcentos = {
            'Á': 'A',
            'À': 'A',
            'Ã': 'A',
            'Â': 'A',
            'É': 'E',
            'Ê': 'E',
            'Í': 'I',
            'Ó': 'O',
            'Ô': 'O',
            'Õ': 'O',
            'Ú': 'U',
          };
        
        return str.split('').map(str => (mapaAcentos as any)[str] || str).join('');
    }

    for(let i = 0; i < 5; i++) {
        let campoLetra = document.getElementById(`campo-letra${linha}-${i}`);

        if(campoLetra) {
            let letra = campoLetra.innerHTML;
            let letraSecreta = palavraSecreta[i];
            let tecla = document.getElementById(letra);

            if(letra === removeAcento(letraSecreta)) {

                campoLetra.classList.add('acertou');
                campoLetra.innerHTML = letraSecreta;
                if(tecla) tecla.classList.add('acertou');

                palavraSecreta = palavraSecreta.replace(letraSecreta, ' ');

                letrasAcertadas++;

            } else if(removeAcento(palavraSecreta).indexOf(letra) !== -1) {

                campoLetra.classList.add('tem-na-palavra');
                if(tecla && !tecla.classList.contains('acertou')) tecla.classList.add('tem-na-palavra');

                palavraSecreta = palavraSecreta.replace(letraSecreta, ' ');

            } else {

                if(tecla && !tecla.classList.contains('tem-na-palavra') && !tecla.classList.contains('acertou')) {
                    (tecla as HTMLButtonElement).disabled = true;
                    tecla.classList.add('desabilitado');
                }

            }
        }
    }
}
