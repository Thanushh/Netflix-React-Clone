import React,{useState} from 'react'
import './Homescreen.css';
import Row from '../components/Row/Row';
import requests from '../requests';
import Banner from '../components/Banner/Banner'
import Nav from '../components/Nav/Nav';
import Search from '../components/Search/Search'


function Homescreen() {
  const [searchData, setSearchData] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isModified, setIsModified] = useState(false)
  

  function handleChange(text) {
    setInputValue( `${requests.searchMovies}${text}&page=1&include_adult=false`)
    
    text.length > 1 ? setSearchData(true) : setSearchData(false)
    setIsModified(true)
  }

  return (
    <div className= " app">
      <Nav handleChange={handleChange} isModified={isModified}/>
      { searchData ? 
      <Search  fetchUrl= {inputValue}/> : 
        <>
          <Banner />
          <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals}/>
          <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>
        </>
      }
    </div>
  );
}

export default Homescreen;
