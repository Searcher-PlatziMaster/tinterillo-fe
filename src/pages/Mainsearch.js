import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Results from "../components/results";
import Nav from "../components/Nav";
import ResultContent from '../components/Result-content'
import logo from "../Images/logo-tinterillo-light-color.png";
import { FaSearch } from 'react-icons/fa';
import initialState from '../initialState';
// import Swal from 'sweetalert2';

export default function MainSearch() {
  const [show, setShow] = useState(false)
  const [style, setStyle] = useState('header')
  const [data, setData] = useState('colombia') // input
  const [dataDos, setDataDos] = useState('colombia'); // input
  const [change, setChange] = useState(false)
  const history = useHistory()
  const [dataApi, setDataApi] = useState(initialState)

  // const URL = 'https://searcher-col.herokuapp.com/api/es/search?index=prueba-de-carga&search=colombia'
  const URL = 'https://searcher-col.herokuapp.com/api/es/search'
  
  useEffect(() => {
    fetch(`${URL}?index=prueba-de-carga&search=${data}`)
      .then(response => response.json())
      .then(res => {
        console.log("res", );
        res.hits.hits.length > 0
          ? setDataApi(res)
          : setDataApi(initialState)
      })
      .catch(err => {
        console.log('[ERROR]');
      })
  }, [dataDos])

  //Muestra el primer componente que tiene las tarjetas de resultados de busqueda
  const handleSubmit = (e) => {
    e.preventDefault();
    // Search keywords in API
    if (data) {

      setStyle('header__all')
      setShow(true)
      setDataDos(data)
      // history.push('/search')
    }
  }
  //Asigna el valor del input al estado "data"
  const handleChange = (event) => {
    setData(event.target.value)
  }
  //Muestra el segundo componente con los resultados de la busqueda
  const handleClickResults = () => {
    setChange(true)
  }

  return (
    <>
      <form className={style} onSubmit={handleSubmit}>
        <header>
          <Nav />
          <main>
            <img src={logo} alt='Logo' />
            <h1>TINTERILLO APP</h1>
            <div>
              <section className="section__input">
                <input type="text" onChange={handleChange} />
                <button className='icon-search' type='submit'>
                  <FaSearch />
                </button>
              </section>
            </div>
          </main>
        </header>
      </form>
      <div className="result-content__main">
        {
          change
            ?
            <ResultContent info={dataApi} />
            :
            show &&
            dataApi.hits.hits.map(info => {
                
              return (
                <div className="results-container">
                  <Results key={info._id} click={handleClickResults} info={info} />

                </div>
              )
            })
        }
        
      </div>
    </>
  )
}
