import { IAlerta } from '../../types/alerta';
import style from './Alerta.module.scss';

export default function Alerta({alerta}: {alerta: IAlerta}) {
    return (
        <div className={style['alerta-container']}>
            <span className={style[alerta.tipo]}>{alerta.texto}</span>
        </div>
    )
}