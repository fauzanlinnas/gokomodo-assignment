import React from 'react'
import { useSelector } from 'react-redux'

import styles from './pagination.module.scss'

const Pagination = ({ className, onClickPreviousPage, onClickNextPage, isFirstPage, isLastPage }) => {
  const { nextURL, previousURL } = useSelector(state => state.pokemon)

  return (
    <div className={`${styles.pagination} ${className && className}`}>
      <button
        className={styles.buttonPrevious}
        onClick={() => onClickPreviousPage(previousURL)}
        disabled={previousURL === null}
      >
        {`<`} Previous Page
      </button>
      <button
        className={styles.buttonNext}
        onClick={() => onClickNextPage(nextURL)}
        disabled={nextURL === null}
      >
        Next Page {`>`}
      </button>
    </div>
  )
}

export default Pagination
