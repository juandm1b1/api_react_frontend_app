import React, {useEffect, useState} from 'react'

import {useCookies} from 'react-cookie'

import {APIservice} from './APIservice'


export default function Form(props) {
    // Como se recibe el article como props, se debe pasar a state para poder ser editado
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [token] = useCookies(['myToken'])

    // INTENTO DE PASAR PROPS:ARTICLE A STATE
    const [articulo, setArticulo] = useState(props.article)

    // Este useEffect permite que al dar click en otro btn editar y que se actualice el Form
    // IMPORTANTE: DESPUÉS DE setArticle(null) al actualizar e insertar para esconder el form, 
    // se pone setArticulo(props.article) en useEffect() paa que cuando el componentDidUnmount, ya no esté null
    // articulo y se pueda mostrar nuevamente el form al presionar Editar e Insertar también
    useEffect(() => {
        setTitle(props.article.title)
        setDescription(props.article.description)
        setArticulo(props.article)      
    }, [,props.article])

    const updateArticle = () => {
        APIservice.updateArticle(props.article.id,{title, description}, token['myToken'])
        .then(response => props.updatedInfo(response)) 
        setArticulo(null)//QUITAR SI NO FUNCIONA SETARTICULO
    }

    const insertArticle = () => {
        APIservice.insertArticle({title, description}, token['myToken'])
        .then(response => props.insertedInfo(response))
        setArticulo(null) //QUITAR SI NO FUNCIONA SETARTICULO
    }    
    // DEBO CAMBIAR CONDICIONAL PARA QUE EL FORM NO SOLO SE DEJE DE MOSTRAR SINO QUE DEJE HABILITADOS LOS BOTONES EDITAR-INSERTAR
    return (
        <div>
            {articulo ? ( //Acá iba props.article en vez de artículo
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input 
                    type="text" className="form-control mb-3" id="title" 
                    placeholder="Ingrese el título"
                    value={title} onChange={e => setTitle(e.target.value)}
                    />
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea 
                    className="form-control mb-3" id="description" rows="5"
                    value={description} onChange={e => setDescription(e.target.value)}
                    ></textarea>

                    {props.article.id ? 
                        <button onClick={updateArticle} className="btn btn-success">Actualizar Artículo</button>
                        : <button onClick={insertArticle} className="btn btn-success">Insertar Artículo</button>
                    }                    
                </div>
            ) : null}
            {/* {props.article && props.article.title} -> Así 1ro de verifica si hay article, y si lo hay se imprime el title */}
        </div>
    )
}
