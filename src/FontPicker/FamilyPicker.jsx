import { motion, useDragControls } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect, useMemo } from 'react'
import measureScrollbar from 'measure-scrollbar'

const FamilyPicker = ({
  familyPickerVisibility,
  setFamilyPickerVisibility,
  family,
  setFamily,
  sort,
  fontNumber,
}) => {
  const defaultConfig = {
    sort: 'popularity',
    fontNumber: 10,
  }
  if (typeof sort == 'undefined') {
    sort = defaultConfig.sort
  }
  if (typeof fontNumber == 'undefined') {
    fontNumber = defaultConfig.fontNumber
  }

  const defaultScrollSize = useMemo(measureScrollbar, [])

  const getFonts = async () => {
    const data = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDjhkweWT7xAh83BqLHHUc4c_ijN14xl9I&sort=${sort}`
    ).then((response) => response.json())
    return data
  }
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const dragControls = useDragControls()
  const { data, status, isLoading, isFetching } = useQuery(['fonts'], getFonts)
  const fonts = useMemo(() => data?.items || [], [data])

  useEffect(() => {
    if (status !== 'success' || fontsLoaded) {
      return
    }
    fonts.slice(0, fontNumber).forEach((font, index, array) => {
      const fontFace = new FontFace(font.family, `url(${font.files.regular})`)
      fontFace
        .load()
        .then(function (loadedFface) {
          document.fonts.add(loadedFface)
          if (index === array.length - 1) {
            setFontsLoaded(true)
          }
        })
        .catch(function (error) {
          throw error
        })
    })
  }, [fonts, data, status, isLoading, isFetching, fontsLoaded, fontNumber])

  return (
    <motion.div
      className="popup widget widget--family-picker"
      style={{ visibility: familyPickerVisibility }}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragStart={(e) => {
        e.target.offsetParent.classList.add('popup__dragged')
      }}
      onDragEnd={(e) => {
        e.target.offsetParent.classList.remove('popup__dragged')
      }}
      onMouseDown={(e) => {
        var scrollBarWidth =
          e.currentTarget.lastChild.offsetWidth -
          e.currentTarget.lastChild.clientWidth
        const resizerSize =
          scrollBarWidth === 0 ? defaultScrollSize : scrollBarWidth
        let currentTargetRect = e.currentTarget.getBoundingClientRect()
        if (
          currentTargetRect.right - e.clientX > resizerSize ||
          currentTargetRect.bottom - e.clientY > resizerSize
        ) {
          dragControls.start(e)
        }
      }}
    >
      <div className="widget__draghandle">
        <button
          className="popup__close"
          onClick={() => setFamilyPickerVisibility('hidden')}
        >
          <FaTimes />
        </button>
      </div>
      <div
        className="widget--family-picker__content"
        onKeyDown={(e) => {
          if (['w', 'W', 'ArrowUp'].includes(e.key)) {
            e.target.previousElementSibling?.focus()
          } else if (['s', 'S', 'ArrowDown'].includes(e.key)) {
            e.target.nextElementSibling?.focus()
          }
        }}
      >
        {fonts.slice(0, fontNumber).map((font, i) => {
          return (
            <div
              key={font.family}
              tabIndex={i}
              className={`widget--family-picker__font-name${
                family !== font.family
                  ? ''
                  : ' widget--family-picker__font-name--selected'
              }`}
              style={{ fontFamily: font.family }}
              onFocus={() => {
                setFamily(font.family)
              }}
            >
              {font.family}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default FamilyPicker
