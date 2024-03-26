import React from 'react'

const CarouselSlide = (props) => {   
  // deconstructoring of props
  const { id, slideBg, slideTitle, slideDescription, slideLink, smallLogo, homepageLink } = props
  return (
    <div className="slideWrap" style={{ backgroundImage: `url(${slideBg})`}}>
      <div className='textWrap'>
        <h2>{slideTitle}</h2>
        <p>{slideDescription}</p>
        <div><a href={slideLink} className='btn'>Learn More</a></div>
        <div><a href={homepageLink}><img src={smallLogo} alt='System Pavers' className='smallLogo' /></a></div>
      </div>
    </div>
  )
}

export default CarouselSlide