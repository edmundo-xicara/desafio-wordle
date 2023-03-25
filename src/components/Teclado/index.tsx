import deleteImg from '../../assets/img/delete.png';
import listaPalavras from '../../local-json/lista-palavras.json';
import listaPalavrasSemAcento from '../../local-json/lista-palavras-sem-acento.json';
import style from './Teclado.module.scss';
import { IPosicao } from '../../types/posicao';
import { useState } from 'react';
import { toast } from 'react-toastify';



export default function Teclado({palavraSecreta, setPalavras}: {
    palavraSecreta: string, 
    setPalavras: React.Dispatch<React.SetStateAction<Record<string, Record<string, Record<string, string>>>>>}) {

    const imgApagar = <img src={deleteImg} width='25px' alt='Apagar'></img>;

    const teclas = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], 
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], 
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', imgApagar]
    ];

    const [posicao, setPosicao] = useState({'linha': 0, 'coluna': 0});

    return (
        <section className={style.teclado} id='teclado'>

            {Array(3).fill(true).map((_, i: number) => (
                <div className={style.linha} id={style['linha'+i]} key={'linha'+i}>

                    {teclas[i].map((tecla: string | JSX.Element, j: number) => (
                        <button 
                        className={style.tecla} 
                        key={`tecla${i}-${j}`} 
                        onClick={evento => escreveLetra(evento, posicao, setPosicao, setPalavras, palavraSecreta)} 
                        id={typeof tecla === 'string' ? tecla : 'DELETE'}> 
                            {tecla} 
                        </button>
                    ))}

                </div>
            ))}

        </section>
    )
}


function escreveLetra(
    evento: React.MouseEvent<HTMLButtonElement>, 
    posicao: IPosicao, 
    setPosicao: React.Dispatch<React.SetStateAction<IPosicao>>, 
    setPalavras: React.Dispatch<React.SetStateAction<Record<string, Record<string, Record<string, string>>>>>, 
    palavraSecreta: string) {
 
    let letra = (evento.target as Element).innerHTML;

    if(letra.length === 1) {

        setPalavras((estadoAnterior) => {
            let novoEstado = Object.assign({}, estadoAnterior);

            if(posicao.coluna < 5) {
                novoEstado[`palavra${posicao.linha}`][`campoLetra${posicao.coluna}`].letra = letra;
            }
            
            return novoEstado;
        });

        if(posicao.coluna < 5) setPosicao({...posicao, coluna: posicao.coluna+1});
        mostraCampoAtivo(posicao.linha, posicao.coluna+1, setPalavras);

    } else if(letra === 'ENTER') {

        if(posicao.coluna === 5) {

            let letrasDigitadas = document.getElementById(`palavra${posicao.linha}`)?.children;
            let palavraDigitada = '';
            if(letrasDigitadas) for(let i = 0; i < letrasDigitadas.length; i++) {
                palavraDigitada += (letrasDigitadas[i].firstElementChild as Element).innerHTML;
            }

            let indexPalavraDigitada = listaPalavrasSemAcento.indexOf(palavraDigitada);
            if(indexPalavraDigitada !== -1) {
                
                acentuaPalavraDigitada(posicao.linha, indexPalavraDigitada, setPalavras);
                verificaPalavra(posicao.linha, palavraSecreta, setPalavras);

                if(posicao.linha+1 === 5) return

                setPosicao({linha: posicao.linha+1, coluna: 0});
                mostraCampoAtivo(posicao.linha+1, 0, setPalavras);
                palavraDigitada = '';
                
            } else alertaErro('Palavra não está na lista', posicao);
        
        } else alertaErro('Preencha todas as letras', posicao);

    } else {

        if(posicao.coluna > 0) setPosicao({...posicao, coluna: posicao.coluna-1}); 

        setPalavras((estadoAnterior) => {
            let novoEstado = Object.assign({}, estadoAnterior);

            if(posicao.coluna > 0) {
                novoEstado[`palavra${posicao.linha}`][`campoLetra${posicao.coluna-1}`].letra = '';
            }

            return novoEstado;
        });

        mostraCampoAtivo(posicao.linha, posicao.coluna-1, setPalavras);

    }
}


function mostraCampoAtivo(
    linha: number, 
    coluna: number,
    setPalavras: React.Dispatch<React.SetStateAction<Record<string, Record<string, Record<string, string>>>>>) {

    if(coluna < 0) coluna = 0;

    setPalavras((estadoAnterior) => {
        let novoEstado = Object.assign({}, estadoAnterior);

        for(let i = 0; i < 5; i++) {
            let campoLetra = novoEstado[`palavra${linha}`][`campoLetra${i}`];

            if(campoLetra.letra !== '') campoLetra.classe = 'escrito';
            else campoLetra.classe = '';
        }

        if(coluna < 5) novoEstado[`palavra${linha}`][`campoLetra${coluna}`].classe = 'ativo';

        return novoEstado;
    });

}


function acentuaPalavraDigitada(
    linha: number, 
    indicePalavraDigitada: number,
    setPalavras: React.Dispatch<React.SetStateAction<Record<string, Record<string, Record<string, string>>>>>) {

    const palavraAcentuada = listaPalavras[indicePalavraDigitada];

    setPalavras((estadoAnterior) => {
        let novoEstado = Object.assign({}, estadoAnterior);

        for(let i = 0; i < 5; i++) {
            novoEstado[`palavra${linha}`][`campoLetra${i}`].letra = palavraAcentuada[i];
        }

        return novoEstado;
    });

}


async function verificaPalavra(
    linha: number, 
    palavraSecreta: string,
    setPalavras: React.Dispatch<React.SetStateAction<Record<string, Record<string, Record<string, string>>>>>) {

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
        document.getElementById(`campo-letra${linha}-${i}`)?.classList.add('verificado');
        await new Promise((r) => setTimeout(r, 400));


        setPalavras(estadoAnterior => {
            let novoEstado = Object.assign({}, estadoAnterior);
            let campoLetra = novoEstado[`palavra${linha}`][`campoLetra${i}`];
            let letra = campoLetra.letra;
            let letraIndex = removeAcento(palavraSecreta).indexOf(letra);
            let letraSecreta = palavraSecreta[i];
            let tecla = document.getElementById(letra) as HTMLButtonElement;
    
            if(letra === removeAcento(letraSecreta) && letraSecreta !== ' ') {

                campoLetra.classe = 'verificado acertou';
                campoLetra.letra = letraSecreta;
                tecla.classList.add('acertou');
    
                palavraSecreta = palavraSecreta.replace(letraSecreta, ' ');
    
                letrasAcertadas++;
    
            } else if(letraIndex !== -1 && letraSecreta !== ' ') {

                if(!campoLetra.classe.includes('acertou')) campoLetra.classe = 'verificado tem-na-palavra';
                if(!tecla.classList.contains('acertou')) tecla.classList.add('tem-na-palavra');
    
                palavraSecreta = palavraSecreta.replace(palavraSecreta[letraIndex], ' ');
    
            } else {
                if(!campoLetra.classe.includes('tem-na-palavra') && !campoLetra.classe.includes('acertou')) {
                    campoLetra.classe = 'verificado desabilitado';
                }

                if(!tecla.classList.contains('tem-na-palavra') && !tecla.classList.contains('acertou')) {
                    tecla.disabled = true;
                    tecla.classList.add('desabilitado');
                }
    
            }
    
            return novoEstado;
        });
    }

    await new Promise((r) => setTimeout(r, 400));

    if(letrasAcertadas === 5) terminaJogo(true, palavraSecreta);
    else if(linha === 5) terminaJogo(false, palavraSecreta);
}


async function alertaErro(texto: string, posicao: IPosicao) {    
    toast.error(texto, {
        autoClose: 800
    });

    const campoPalavra = document.getElementById(`palavra${posicao.linha}`);
    campoPalavra?.classList.add('alerta');
    await new Promise((r) => setTimeout(r, 400));
    campoPalavra?.classList.remove('alerta');
}


function terminaJogo(acertou: boolean, palavraSecreta: string) {
    const teclas = document.querySelectorAll('#teclado button') as NodeListOf<HTMLButtonElement>;
    teclas.forEach(tecla => tecla.disabled = true); 

    const palavras = document.querySelectorAll('.palavra');
    palavras.forEach(palavra => {
        let letras = palavra.children;
        for(let i = 0; i < letras.length; i++) letras[i].classList.remove('ativo');
    })

    if(acertou) {
        toast.success('Parabéns, você acertou a palavra!', {
            autoClose: false
        });

    } else {

        toast.error(`Acabaram seu palpites, sinto muito. A palavra era ${palavraSecreta}`, {
            autoClose: false
        });

    }
}
