import {useCookies} from 'react-cookie'

export class APIservice {

    static updateArticle(article_id, body, token) {
        return (
            fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
                'method':'PUT',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Token ${token}`        
                },
                body:JSON.stringify(body)
            }).then(response => response.json())
            
        )
    }

    static insertArticle(body, token) {
        return (
            fetch(`http://127.0.0.1:8000/api/articles/`, {
                'method':'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Token ${token}` 
                },
                body:JSON.stringify(body)
            }).then(response => response.json())            
        )
    }

    static deleteArticle(article_id, token) {
        return (
            fetch(`http://127.0.0.1:8000/api/articles/${article_id}/`, {
                'method':'DELETE',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Token ${token}`
                },                
            }).then(response => console.log(response)) //response.json()            
        )
    }

    static LoginUser(body) {
        return (
            fetch(`http://127.0.0.1:8000/auth/`, {
                'method':'POST',
                headers: {
                    'Content-Type':'application/json',                    
                },
                body:JSON.stringify(body)
            }).then(response => response.json())            
        )
    }

    static RegisterUser(body) {
        return (
            // Lo único que cambia respecto al logueo es el endpoint: de auth/ a api/users/
            fetch(`http://127.0.0.1:8000/api/users/`, {
                'method':'POST',
                headers: {
                    'Content-Type':'application/json',                    
                },
                body:JSON.stringify(body)
            }).then(response => response.json())            
        )
    }

}
