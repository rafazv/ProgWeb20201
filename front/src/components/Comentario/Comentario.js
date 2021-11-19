import { memo } from 'react';

function Comentario({ comentario, setLike }) {
    return (
        <li className="list-group-item">
            {comentario.texto}
            <button className="btn btn-sm btn-primary float-end" onClick={() => setLike(comentario.id)}>
                {comentario.like ? 'Curtido' : 'Curtir'}
            </button>
        </li>
    );
}

export default memo(Comentario)