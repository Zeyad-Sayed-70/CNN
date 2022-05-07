import { useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import styles from './news.module.css'

export const Newz = ({articles}) => {
    let isBig = false
    let n = 0
    return (
    <div className={styles.grid}>
        <Container className='d-flex flex-wrap'>
            {articles?.map((news, ind) => {
                
                if ( ind % 6 === 0) {
                    isBig = true

                    return (
                        <Col key={ind} id={news.title} className={`col-12 mt-5`}>
                            <div className={`${styles.news}`}>
                                <h2 className={`${styles.title} text-center mb-3`}>{news.title}</h2>
                                <img className={styles.image} src={news.urlToImage ? news.urlToImage : 'news.jpg'} alt="news_photo"/>
                                <Row className='d-flex flex-wrap'>
                                    <Col className='col-12 col-md-6'>
                                        <span className={styles.source}>{news.source.name}</span>
                                        <p className={`${styles.description} my-3`}>{news.description}</p>
                                    </Col>
                                    <Col className='col-12 col-md-6'>
                                        <hr />
                                        <p className={styles.author}>Publish By: - {news.author ? news.author : 'Anonymous'}</p>
                                        <hr />
                                        <p className={styles.publish}>Publish At: {news.publishedAt ? news.publishedAt : 'Anonymous Time!'}</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        
                    );
                }

                if ( isBig && n < 3 ) {
                    n++;
                    return (
                        <Col key={ind} id={news.title} className={`col-12 col-md-6 col-lg-4 px-3 my-3`}>
                            <div className={styles.news}>
                                <h2 className={`${styles.title} text-center mb-3`}>{news.title}</h2>
                                <img className={styles.image} src={news.urlToImage ? news.urlToImage : 'news.jpg'} alt="news_photo"/>
                                <span className={styles.source}>{news.source.name}</span>
                                <p className={`${styles.description} my-3`}>{news.description}</p>
                                <hr />
                                <p className={styles.author}>Publish By: - {news.author ? news.author : 'Anonymous'}</p>
                                <hr />
                                <p className={styles.publish}>Publish At: {news.publishedAt ? news.publishedAt : 'Anonymous Time!'}</p>
                            </div>
                        </Col>
                    );
                }
                isBig = false
                n = 0
                return (
                    <Col key={ind} id={news.title} className='col-12 col-md-6 px-3 my-3'>
                        <div className={`${styles.news}`}>
                            <h2 className={`${styles.title} text-center mb-3`}>{news.title}</h2>
                            <img className={styles.image} src={news.urlToImage ? news.urlToImage : 'news.jpg'} alt="news_photo"/>
                            <span className={styles.source}>{news.source.name}</span>
                            <p className={`${styles.description} my-3`}>{news.description}</p>
                            <hr />
                            <p className={styles.author}>Publish By: - {news.author ? news.author : 'Anonymous'}</p>
                            <hr />
                            <p className={styles.publish}>Publish At: {news.publishedAt ? news.publishedAt : 'Anonymous Time!'}</p>
                        </div>
                    </Col>
                );
            })}
        </Container>
    </div>
  )
}
