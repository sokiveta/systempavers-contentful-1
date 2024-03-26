import React, { useState, useEffect, useCallback } from 'react'
import { client } from '../../client'
import CarouselSlide from './CarouselSlide'
import Loader from '../Loader/Loader'

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'; 

const Carousel = () => {
  const [isCarouselLoading, setIsCarouselLoading] = useState(false)
  const [carouselSlides, setCarouselSlides] = useState([])

  const cleanUpCarouselSlides = useCallback((rawData) => {
    const cleanSlides = rawData.map((slide) => {
      const {sys, fields} = slide
      const {id} = sys
      const slideTitle = fields.title
      const slideDescription = fields.description
      const slideBg = fields.image.fields.file.url
      const slideLink = fields.pageLink
      const smallLogo = fields.smallLogo.fields.file.url
      const homepageLink = fields.homepageLink
      const updatedSlide = { id, slideTitle, slideDescription, slideBg, slideLink, smallLogo, homepageLink }
      return updatedSlide 
    })

    setCarouselSlides(cleanSlides)
  }, [])

  const getCarouselSlides = useCallback(async () => {
    setIsCarouselLoading(true)
    try {
        const response = await client.getEntries({ content_type: 'systemPavers' })
        const responseData = response.items
        if (responseData) {
          cleanUpCarouselSlides(responseData)
        } else {
          setCarouselSlides ([])
        }
        setIsCarouselLoading(false)
    } catch (error) {
        console.log(error)
        setIsCarouselLoading(false)
    }
  }, [cleanUpCarouselSlides])

  useEffect(() => {
      getCarouselSlides()
  }, [getCarouselSlides])

  if(isCarouselLoading) {
    return <Loader />
  }

  if (!Array.isArray(carouselSlides) || !carouselSlides.length) {
    return null
  }

  SwiperCore.use([Navigation]);
  
  return (
    <div className='carousel'>
      <Swiper modules={[Navigation]} navigation>
      {carouselSlides.map((item) => {
        const { id, slideBg, slideTitle, slideDescription, slideLink, smallLogo, homepageLink } = item
        return (
          <SwiperSlide key={id}>
            <CarouselSlide slideBg={slideBg} slideTitle={slideTitle} slideDescription={slideDescription} slideLink={slideLink} smallLogo={smallLogo} homepageLink={homepageLink} />
          </SwiperSlide> 
        )
      })}
      </Swiper>
      

    </div>
  )
}

export default Carousel
