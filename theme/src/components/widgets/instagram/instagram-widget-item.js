/** @jsx jsx */
import { jsx } from 'theme-ui'
import { faImages, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const InstagramWidgetItem = ({ handleClick, index, post: { caption, cdnMediaURL, id, mediaType } = {} }) => {
  const isCarousel = mediaType === 'CAROUSEL_ALBUM'
  const isVideo = mediaType === 'VIDEO'

  return (
    <button
      key={id}
      onClick={event => handleClick(event, { index, photo: { caption, id, src: cdnMediaURL } })}
      rel='noopener noreferrer'
      className='instagram-item-button'
      sx={{
        variant: 'styles.InstagramItem'
      }}
    >
      {(isCarousel || isVideo) && (
        <div
          data-testid={isVideo ? 'video-icon' : 'carousel-icon'}
          sx={{
            color: 'white',
            position: 'absolute',
            top: 2,
            right: 2
          }}
        >
          <FontAwesomeIcon icon={isVideo ? faVideo : faImages} />
        </div>
      )}

      <img
        crossOrigin='anonymous'
        className='instagram-item-image'
        loading='lazy'
        src={`${cdnMediaURL}?h=234&w=234&fit=crop&crop=faces,focalpoint&auto=compress&auto=enhance&auto=format`}
        height='280'
        width='280'
        alt='Instagram post thumbnail'
        sx={{
          width: '100%',
          height: '100%',
          transition: 'all 1.5s ease',
          objectFit: 'cover'
        }}
      />
    </button>
  )
}

export default InstagramWidgetItem
