import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'

interface PaginationProps {
  items: Array<any>
  currentPage: number
  pageSize: number
  setItems: (arg0: any[]) => void
}

export function Pagination({ items, currentPage, pageSize, setItems }: PaginationProps) {

  const totalPages = Math.ceil(items.length / pageSize)
  const pagesArray = Array.from(Array(totalPages + 1).keys()).slice(1,)
  // console.log(pagesArray)
  let isNextButton = totalPages > currentPage ? true : false
  let isPrevButton = currentPage > 1 ? true : false

  const pagelinksOnPage = 5

  const pageEdge = Math.floor(pagelinksOnPage / 2)

  let startPage;
  // Стартовая страница равна текущей минус граница
  if (totalPages <= pagelinksOnPage) {
    startPage = 1
    // } else if (currentPage >= totalPages - pagelinksOnPage) {
    //   startPage = totalPages - pagelinksOnPage
  } else if (currentPage > pageEdge) {
    startPage = currentPage - pageEdge
  } else {
    startPage = 1
  }
  let endPage = currentPage >= totalPages - pageEdge ? totalPages : startPage + pagelinksOnPage - 1

  // console.log(`pagelinksOnPage=${pagelinksOnPage} totalPages=${totalPages} startPage=${startPage} endPage=${endPage} currentPage=${currentPage}`)

  const pagesPagination = pagesArray.slice(startPage - 1, endPage)

  // console.log(pagesPagination)


  useEffect(() => {
    if (currentPage <= 0 || currentPage > totalPages) {
      setItems([])
    } else {
      const startItemIndex0 = (currentPage - 1) * pageSize
      const endItemIndex0 = (currentPage) * pageSize
      setItems(items.slice(startItemIndex0, endItemIndex0))
    }
  }, [items, currentPage, pageSize, setItems, totalPages]);


  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {isPrevButton && <Link to={`?page=${currentPage - 1}`}
          className={`page-link`}>Предыдущая</Link>}
        {
          pagesPagination.map(page => (
            <li className='page-item' key={page}>
              <Link to={`?page=${page}`}
                className={`page-link ${page === currentPage ? 'active' : ''}`}>
                {page}
              </Link>
            </li>
          ))
        }
        {isNextButton && <Link to={`?page=${currentPage + 1}`}
          className={`page-link`}>
          Следующая
        </Link>}
      </ul>
    </nav>
  )
}