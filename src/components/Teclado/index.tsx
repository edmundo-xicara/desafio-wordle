import deleteImg from '../../assets/img/delete.png';
import listaPalavras from '../../local-json/lista-palavras.json';
import listaPalavrasSemAcento from '../../local-json/lista-palavras-sem-acento.json';
import style from './Teclado.module.scss';
import { IPosicao } from '../../types/posicao';
import { useState } from 'react';
import { toast, Zoom } from 'react-toastify';



export default function Teclado({palavraSecreta}: {palavraSecreta: string}) {

    const imgApagar = <img src={deleteImg} width='25px' alt='Apagar'></img>;

    const teclas = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], 
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], 
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', imgApagar]
    ];

    const [posicao, setPosicao] = useState({'linha': 0, 'coluna': 0});

    return (
        <section className={style.teclado}>

            {Array(3).fill(true).map((_, i: number) => (
                <div className={style.linha} id={style['linha'+i]} key={'linha'+i}>

                    {teclas[i].map((tecla: string | JSX.Element, j: number) => (
                        <button className={`${style.tecla} ${style[typeof tecla === 'string' ? tecla : 'DELETE']}`} key={`tecla${i}-${j}`} onClick={evento => escreveLetra(evento, posicao, setPosicao, palavraSecreta)} id={typeof tecla === 'string' ? tecla : 'DELETE'}> 
                            {tecla} 
                        </button>
                    ))}

                </div>
            ))}

        </section>
    )
}


function escreveLetra(evento: React.MouseEvent<HTMLButtonElement>, posicao: IPosicao, setPosicao: React.Dispatch<React.SetStateAction<IPosicao>>, palavraSecreta: string) {
    let campoLetra = document.getElementById(`campo-letra${posicao.linha}-${posicao.coluna}`); 
    let letra = (evento.target as any).innerHTML;

    if(letra.length === 1) {

        if(campoLetra) campoLetra.innerHTML = letra;
        if(posicao.coluna < 5) setPosicao({...posicao, coluna: posicao.coluna+1});
        mostraCampoAtivo(posicao.linha, posicao.coluna+1);

    } else if(letra === 'ENTER') {

        if(posicao.coluna === 5) {

            let letrasDigitadas = document.getElementById(`palavra${posicao.linha}`)?.children;
            let palavraDigitada = '';
            if(letrasDigitadas) for(let i = 0; i < letrasDigitadas.length; i++) {
                palavraDigitada += letrasDigitadas[i].innerHTML;
            }

            let indexPalavraDigitada = listaPalavrasSemAcento.indexOf(palavraDigitada);
            if(indexPalavraDigitada !== -1) {
                
                acentuaPalavraDigitada(posicao.linha, indexPalavraDigitada);
                verificaPalavra(posicao.linha, palavraSecreta);

                if(posicao.linha === 6) return

                setPosicao({linha: posicao.linha+1, coluna: 0});
                mostraCampoAtivo(posicao.linha+1, 0);
                palavraDigitada = '';
                
            } else alertaErro('erro', 'Palavra não está na lista', posicao);
        
        } else alertaErro('erro', 'Preencha todas as letras', posicao);

    } else {

        if(posicao.coluna > 0) setPosicao({...posicao, coluna: posicao.coluna-1}); 
        campoLetra = document.getElementById(`campo-letra${posicao.linha}-${posicao.coluna-1}`);
        if(campoLetra) campoLetra.innerHTML = '';
        mostraCampoAtivo(posicao.linha, posicao.coluna-1);

    }
}


function mostraCampoAtivo(linha: number, coluna: number) {
    const camposLetra = document.getElementById(`palavra${linha}`)?.children as HTMLCollectionOf<HTMLElement>;

    for(let i = 0; i < 5; i++) {
        let campo = camposLetra[i];
        campo.classList.remove('ativo');

        if(campo.innerHTML === '') campo.classList.remove('escrito'); 
        else campo.classList.add('escrito');
    }

    if(coluna < 0) coluna = 0;

    if(coluna < 5) camposLetra[coluna].classList.add('ativo');
}


function acentuaPalavraDigitada(linha: number, indicePalavraDigitada: number) {
    const palavraAcentuada = listaPalavras[indicePalavraDigitada];

    for(let i = 0; i < 5; i++) {
        let campoLetra = document.getElementById(`campo-letra${linha}-${i}`);
        if(campoLetra) campoLetra.innerHTML = palavraAcentuada[i];
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
            'Ç': 'C'
          };
        
        return str.split('').map(str => (mapaAcentos as any)[str] || str).join('');
    }

    for(let i = 0; i < 5; i++) {
        let campoLetra = document.getElementById(`campo-letra${linha}-${i}`);

        if(campoLetra) {
            let letra = campoLetra.innerHTML;
            let letraSecreta = palavraSecreta[i];
            let tecla = document.getElementById(letra);
            console.log(palavraSecreta)

            if(letra === removeAcento(letraSecreta)) {

                campoLetra.classList.add('acertou');
                campoLetra.innerHTML = letraSecreta;
                if(tecla) tecla.classList.add('acertou');

                palavraSecreta = palavraSecreta.replace(letraSecreta, ' ');

                letrasAcertadas++;

            } else if(removeAcento(palavraSecreta).indexOf(letra) !== -1) {

                campoLetra.classList.add('tem-na-palavra');
                if(tecla && !tecla.classList.contains('acertou')) tecla.classList.add('tem-na-palavra');

                let letraIndex = removeAcento(palavraSecreta).indexOf(letra);

                palavraSecreta = palavraSecreta.replace(palavraSecreta[letraIndex], ' ');

            } else {

                if(tecla && !tecla.classList.contains('tem-na-palavra') && !tecla.classList.contains('acertou')) {
                    (tecla as HTMLButtonElement).disabled = true;
                    tecla.classList.add('desabilitado');
                }

            }
        }
    }
}


async function alertaErro(tipo: string, texto: string, posicao: IPosicao) {    
    if(tipo === 'erro') {

        toast.error(texto, {
            autoClose: 800
        });

    } else if (tipo === 'sucesso') {
        toast.success(texto, {
            autoClose: false
        });
    }

    const campoPalavra = document.getElementById(`palavra${posicao.linha}`);
    campoPalavra?.classList.add('alerta');
    await new Promise((r) => setTimeout(r, 400));
    campoPalavra?.classList.remove('alerta');
}
