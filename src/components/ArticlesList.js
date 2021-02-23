import React from 'react'

import {useCookies} from 'react-cookie'

import {APIservice} from './APIservice'


export default function ArticlesList(props) {

    const [token] = useCookies(['myToken'])

    const editBtn = (article) => {
        // Para notificar al padre App.js de que se presionó el botón de tal artículo,
        // se recibe el método editBtn como props desde App.js
        props.editBtn(article)
    }
        
    const deleteArticle = (article) => {        
        const confirmacion = window.confirm("Confirma que desea eliminar el artículo?");
        if(confirmacion) {
            APIservice.deleteArticle(article.id, token['myToken'])
            .then(response => {
            props.deleteInfo(article)
            console.log(response)            
        })
        }     
        
    }
    
    return (
        <div>
        {props.articles && props.articles.map(article => {
            return(
            <div key={article.id}>
                <h2>{article.title}</h2>
                <p>Creado por <mark>{article.author}</mark></p>
                <h4>{article.description}</h4><br/>
                <p>Creado el {article.date}</p>
                <div className="row">
                    <div className="col-md-1">
                        <button onClick={() => editBtn(article)} className="btn btn-primary">Editar</button>                        
                    </div> 
                    <div className="col-md-1">                        
                        <button onClick={() => deleteArticle(article)} className="btn btn-danger">Eliminar</button>
                    </div>                   
                </div>                
                <hr className="hrclass"/>            
            </div>      
            )
        })}
            
        </div>
    )
}
