import React, { useEffect, useState } from 'react'
import './App.css'
import MovieRow from './components/MovieRow'
import FeaturedNovie from './components/FeaturedMovie'
import Tmdb from './Tmdb'

export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)

  useEffect(() => {
    const loadAll = async () => {
      // getting all list
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      // getting featured
      let spotlight = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random()*(spotlight[0].items.results.length -1))
      let chosen = spotlight[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }

    loadAll()
  }, [])

  return (
    <div className="page">

      {featuredData &&
        <FeaturedNovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  )
}