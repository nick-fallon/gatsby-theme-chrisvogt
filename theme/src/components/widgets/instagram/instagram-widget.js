/** @jsx jsx */
import { jsx } from 'theme-ui'

import { Grid } from '@theme-ui/components'
import { RectShape } from 'react-placeholder/lib/placeholders'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import ReactPlaceholder from 'react-placeholder'
import VanillaTilt from 'vanilla-tilt'

import fetchDataSource from '../../../actions/fetchDataSource'
import { getInstagramUsername, getInstagramWidgetDataSource } from '../../../selectors/metadata'
import { SUCCESS, FAILURE, getInstagramWidget } from '../../../reducers/widgets'
import useSiteMetadata from '../../../hooks/use-site-metadata'

import Button from '../../button'
import CallToAction from '../call-to-action'
import ProfileMetricsBadge from '../profile-metrics-badge'
import Widget from '../widget'
import WidgetHeader from '../widget-header'
import WidgetItem from './instagram-widget-item'

const MAX_IMAGES = {
  default: 8,
  showMore: 16
}

const getHasFatalError = state => getInstagramWidget(state).state === FAILURE
const getIsLoading = state => getInstagramWidget(state).state !== SUCCESS
const getMedia = state => getInstagramWidget(state).data?.collections?.media || []
const getMetrics = state => getInstagramWidget(state).data?.metrics || []

export default () => {
  const dispatch = useDispatch()

  const metadata = useSiteMetadata()
  const instagramUsername = getInstagramUsername(metadata)
  const instagramDataSource = getInstagramWidgetDataSource(metadata)

  const hasFatalError = useSelector(getHasFatalError)
  const isLoading = useSelector(getIsLoading)
  const media = useSelector(getMedia)
  const metrics = useSelector(getMetrics)

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchDataSource('instagram', instagramDataSource))
    }
  }, [dispatch, instagramDataSource, isLoading])

  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  const [isShowingMore, setIsShowingMore] = useState(false)

  useEffect(() => {
    if (isShowingMore || !isLoading) {
      VanillaTilt.init(document.querySelectorAll('.instagram-item-button'), {
        glare: true,
        max: 21,
        perspective: 1500,
        reverse: true,
        speed: 300
      })
    }
  }, [isLoading, isShowingMore])

  const openLightbox = useCallback((event, { index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  const callToAction = (
    <CallToAction
      title={`${instagramUsername} on Instagram`}
      url={`https://www.instagram.com/${instagramUsername}`}
      isLoading={isLoading}
    >
      Visit Profile
      <span className='read-more-icon'>&rarr;</span>
    </CallToAction>
  )

  const countItemsToRender = isShowingMore ? MAX_IMAGES.showMore : MAX_IMAGES.default

  return (
    <Widget id='instagram' hasFatalError={hasFatalError}>
      <WidgetHeader aside={callToAction} icon={faInstagram}>
        Instagram
      </WidgetHeader>

      <ProfileMetricsBadge metrics={metrics} isLoading={isLoading} />

      <div className='gallery'>
        <Grid
          sx={{
            gridGap: [3, 3, 3, 4],
            gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(3, 1fr)', '', 'repeat(4, 1fr)']
          }}
        >
          {(isLoading ? Array(countItemsToRender).fill({}) : media).slice(0, countItemsToRender).map((post, idx) => (
            <ReactPlaceholder
              customPlaceholder={
                <div className='image-placeholder'>
                  <RectShape
                    color='#efefef'
                    sx={{
                      borderRadius: '8px',
                      boxShadow: 'md',
                      width: '100%',
                      paddingBottom: '100%'
                    }}
                  />
                </div>
              }
              key={isLoading ? idx : post.id}
              ready={!isLoading}
              showLoadingAnimation
              type='rect'
            >
              <WidgetItem handleClick={openLightbox} index={idx} post={post} />
            </ReactPlaceholder>
          ))}
        </Grid>
      </div>

      {!isLoading && (
        <div sx={{ my: 4, textAlign: 'center' }}>
          <Button onClick={() => setIsShowingMore(!isShowingMore)}>{isShowingMore ? 'Show Less' : 'Show More'}</Button>
        </div>
      )}

      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeLightbox}>
            {!isLoading && (
              <Carousel
                currentIndex={currentImage}
                styles={{
                  // NOTE(cvogt): these styles were copy + pasted from craigrich/ruff-guide
                  // as a temporary fix for the `autoSize` feature not working as intended.
                  container: base => ({
                    ...base,
                    height: '100vh'
                  }),
                  view: base => ({
                    ...base,
                    alignItems: 'center',
                    display: 'flex ',
                    height: 'calc(100vh - 54px)',
                    justifyContent: 'center',
                    '& > img': {
                      maxHeight: 'calc(100vh - 94px)'
                    }
                  })
                }}
                views={media.map(x => ({
                  ...x,
                  source: {
                    download: `${x.cdnMediaURL}?auto=format`,
                    fullscreen: `${x.cdnMediaURL}?auto=format`,
                    regular: `${x.cdnMediaURL}?auto=format`,
                    thumbnail: `${x.cdnMediaURL}?h=280&w=280&fit=crop&crop=faces,focalpoint&auto=format`
                  }
                }))}
              />
            )}
          </Modal>
        )}
      </ModalGateway>
    </Widget>
  )
}
