import Head from 'next/head'
import { useRouter } from "next/router"
import styles from '../styles/Home.module.css'
import { Button, Col, Spinner } from 'react-bootstrap'

// Imports Components
import { Nav } from '../components/Nav/Nav'
import {Newz} from '../components/Newz/Newz'
import { useEffect, useState } from 'react'


async function getDataByPage(title, page) {
  const res = await fetch(`https://newsapi.org/v2/everything?q=${title}&from=2022-04-27&sortBy=popularity&page=${page}&apiKey=e5c0fba38cf448b0a5bf824c9ab12238`)
  const data = await res.json()

  console.log(data)
  return data;
}


const title = ({data: {articles}}) => {
    const router = useRouter()
    const {title} = router.query

    console.log(title)

    useEffect(() => {
        console.log('test')
    })

    useEffect(() => {
        getDataByPage(title, 1)
    })
    
    const [mainData, setMainData] = useState(articles)
    const [loadData, setLoadData] = useState([])
    const [page, setPage] = useState(2);
    const [isNextPage, setIsNextPage] = useState(true)
    const [loadMoreLoading, setloadMoreLoading] = useState(false)

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
            const {articles} = await getDataByPage(title, page)

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
};

export default title;


export async function getServerSideProps(context) {
    const {title} = context.query
    const res = await fetch(`https://newsapi.org/v2/everything?q=${title}&from=2022-04-27&sortBy=popularity&page=${1}&apiKey=e5c0fba38cf448b0a5bf824c9ab12238`)
    const data = await res.json()
    
    return {
        props: {data},
    }
}