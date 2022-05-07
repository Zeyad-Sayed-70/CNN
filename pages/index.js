import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button, Col, Spinner } from 'react-bootstrap'

// Imports Components
import { Nav } from '../components/Nav/Nav'
import {Newz} from '../components/Newz/Newz'
import { useEffect, useState } from 'react'

let searchTitle = 'all'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'newslit-news-search.p.rapidapi.com',
		'X-RapidAPI-Key': '5b37912a49mshcf3eb65fa99dfe8p1c4924jsne1901b3f3200'
	}
};

async function getDataByPage(page) {
  const res = await fetch(`https://newsapi.org/v2/everything?q=${searchTitle}&from=2022-04-27&sortBy=popularity&page=${page}&apiKey=e5c0fba38cf448b0a5bf824c9ab12238`)
  const data = await res.json()

  // console.log(data)
  return data;
}

export default function Home({data: {articles}}) {
  const [mainData, setMainData] = useState(articles)
  const [loadData, setLoadData] = useState([])
  const [page, setPage] = useState(2);
  const [isNextPage, setIsNextPage] = useState(true)
  const [loadMoreLoading, setloadMoreLoading] = useState(false)
  // console.log(mainData)

  useEffect(() => {
    setloadMoreLoading(false)
    setMainData([...mainData, ...loadData])
  }, [loadData])

  return (
    <>
    <Head>
      <title>CNN News</title>
      <link rel="icon" type="image/png" href="/cnn_icon.png"/>
    </Head>
    <Nav articles={mainData}/>
    <Newz articles={mainData}/>
    <Col className='d-flex justify-content-center pb-5'>
      <Button 
      variant='primary'
      onClick={async () => {

        if ( isNextPage) {
          const {articles} = await getDataByPage(page)

          if ( articles ) {
            setloadMoreLoading(true)
            
            setPage(page + 1)
    
            setLoadData(articles)
          } else setIsNextPage(false)
        }
      }}
      disabled={!isNextPage}
      >{loadMoreLoading ?   <Spinner animation="border" variant="light" style={{width: '20px', height: '20px'}} /> : `Lead More`}</Button>
    </Col>

    </>
  )
}

// The Key: e5c0fba38cf448b0a5bf824c9ab12238
export async function getServerSideProps(context) {
    const res = await fetch('https://newsapi.org/v2/everything?q=all&from=2022-04-27&sortBy=popularity&page=1&apiKey=e5c0fba38cf448b0a5bf824c9ab12238')
    const data = await res.json()
  return {
    props: {data}
  }
}