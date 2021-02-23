import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';

import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'

import ArticlesList from './components/ArticlesList'
import Form from './components/Form'

function App() {
  // Para Listar todos los artículos:
  const [articles, setArticles] = useState([])
  // Para Editar un artículo:
  const [editArticle, setEditArticle] = useState(null)
  // const [deleteArticle, setDeleteArticle] = useSate(null)

  const [token, setToken, removeToken] = useCookies(['myToken'])
  let history = useHistory()


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles/', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Token ${token['myToken']}`
      }
    })
    .then(response => response.json())    
    .then(data => setArticles(data) ? setArticles(data) : 'Loading...')    
    .catch(error => console.log(error))
    // console.log(articles)
  },[])

  useEffect(() => {
    // Si NO hay un token en Cookies (se remueve al presionar logoutBtn), mandar a la página de logueo:
    if(!token['myToken']) {
        history.push('/')
        // Otra opción: window.location.href = '/'
    }
  },[token])

  // Con el siguiente código se recibe la info del artículo a editar desde ArticleList.js
  // para enviarla al Form.js
  const editBtn = (article) => {
    setEditArticle(article)
  }
 

  const updatedInfo = (article) => {
    const newArticles = articles.map(myArticle => {
      if(myArticle.id === article.id) {
        return article;
      } else {
        return myArticle;
      }
    })
    setArticles(newArticles);
  }

  // Se utiliza el mismo método setEditArticle para traer el form y crear un nuevo artículo
  const articleForm = () => {
    setEditArticle({title:'', description:''})
  }

  const insertedInfo = (article) => {
    const newArticles = [...articles, article]
    setArticles(newArticles)
  }

  const deleteInfo = (article) => {
    const remainingArticles = articles.filter(myArticle => {
      if(myArticle.id === article.id){
        return false
      }
      return true
    })
    setArticles(remainingArticles)
  }

  const logoutBtn = () => {
    if(window.confirm("Confirmas que deseas cerrar sesión?")){
      removeToken(['myToken'])
    }
  }

  return (
    <div className="App">    

    <div className="row">
      <div className="col">
        <h1>Django & ReactJS Blog App</h1>
      </div>
      <div className="col">
        <button onClick={articleForm} className="btn btn-primary mr-4">Agregar Artículo</button>
        <button onClick={logoutBtn} className="btn btn-danger">Salir</button>
      </div>      

    </div>      
      <br/>
      <br/>
      <ArticlesList articles={articles} editBtn={editBtn} deleteInfo={deleteInfo} /> {/* updatedInfo={updatedInfo} */}

      {editArticle ? <Form article={editArticle} updatedInfo={updatedInfo}  insertedInfo={insertedInfo}/> : null}   {/* updatedInfo={updatedInfo} */}  
           
    </div>
  );
}

export default App;