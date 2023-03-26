export interface IPalavra extends Record<string, {classe: string, letra: string}> {
    campoLetra0: {classe: string, letra: string},
    campoLetra1: {classe: string, letra: string},
    campoLetra2: {classe: string, letra: string},
    campoLetra3: {classe: string, letra: string},
    campoLetra4: {classe: string, letra: string}
}

export interface IPalavras extends Record<string, IPalavra> {
    palavra0: IPalavra,
    palavra1: IPalavra,
    palavra2: IPalavra,
    palavra3: IPalavra,
    palavra4: IPalavra,
    palavra5: IPalavra,
}