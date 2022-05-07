import Link from 'next/link'
import { useState } from 'react';
import { Col, Row, Button, Container } from "react-bootstrap"
import { VscMenu } from "react-icons/vsc";
import styles from './nav.module.css'
import {LinksManu} from './LinksManu'

const listsData = [
  {
    title: 'World',
    path: 'world'
  },
  {
    title: 'Business',
    path: 'business'
  },
  {
    title: 'US Politics',
    path: 'us politics'
  },
  {
    title: 'Health',
    path: 'health'
  },
]

export const Nav = ({articles}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isSearchList, setIsSearchList] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const handlerSearch = (ev) => {

    const newArticles = articles.filter(article => {
      if ( ((article.title)?.toLowerCase())?.includes(ev.target.value.toLowerCase()) )  {
        console.log('1')
        return true
      }
      
      if ( ((article.author)?.toLowerCase())?.includes(ev.target.value.toLowerCase()) ) {
        console.log('2')
        return true
      }
      
      if ( ((article.description)?.toLowerCase())?.includes(ev.target.value.toLowerCase()) ) {
        console.log('3')
        return true
      }
      
      console.log('4')
      return false;
    })

    if ( ev.target.value !== '' ) {

      setIsSearchList(true)

      setSearchData(newArticles)

    } else { setIsSearchList(false) }

    console.log(articles)
  }

  return (
    <div className='position-fixed w-100'>
    <nav className='bg-dark text-light'>
        <Container className='d-flex align-center justify-content-between py-3'>
          <Col className="d-flex gap-3 col-6 col-md-9">
            <div className={styles.menu} onClick={() => {setIsOpenMenu(!isOpenMenu)}}><VscMenu /></div>
            <div className={styles.logo}><a href='/'><img src='cnn_icon.png' alt='logo/cnn' /></a></div>
            <div className={styles.links}>
              {listsData.map(list => <div key={list.title} className={styles.list}><a href={`/${list.path}`}>{list.title}</a></div>)}
            </div>
          </Col>
          <div className={`${styles.searchContainer}`}>
            <input 
            className={`${styles.search} ${isSearchList ? styles.active : ''} col-6 col-md-3`}
            type='text'
            placeholder='Search'
            onChange={(ev) => {handlerSearch(ev)}}
            > 
            </input>
            <div className={`${styles.searchFeild} ${isSearchList ? '' : styles.active}`}>
              {/* <li className={styles.searchList}>hello world</li> */}
              {searchData?.map(data => <li key={data.title} className={`${styles.searchList}`} ><a href={`#${data.title}`}>{data.title}</a></li>)}
            </div>
            <div className={isSearchList ? styles.overlay : ''} onClick={() => {setIsSearchList(false)}}></div>
          </div>
        </Container>
    </nav>
    {isOpenMenu && <LinksManu />}
    </div>
  )
}
