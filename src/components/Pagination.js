import React from 'react'
import { navigate, Link } from 'gatsby'
import styled from '@emotion/styled'
import SelectIcon from '../icons/SelectIcon'
import "../styles/pager.scss"

const Wrapper = styled.div`
  width: 100%;
  margin: -1.5rem auto 2.5rem;
  max-width: ${props => props.theme.sizes.maxWidth};
  padding: 0 1.5rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: baseline;
`

const Li = styled.button`
 background: DarkGray;
  width: 50px;
  height: 50px;
  margin: 0 2px;
  color: white;
  text-align: center; 
  position: relative;
  border-radius: 50px;
  padding: 0;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  outline: none !important;
  &:hover {
    color: #000;
    background: #E7DDBD;
  }
  &:focus {
    outline: none !important;
  }
`
const Button = styled(Link)`
  background: DarkGray;
  width: 50px;
  height: 50px;
  margin: 0 2px;
  color: white;
  top 20px;
  text-align: center; 
  position: relative;
  border-radius: 50px;
  padding: 0;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  span{
    vertical-align: middle;
    position: absolute;
    top: 30%;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    display:table;
    color: #fff;
    text-decoration: none;
  }
`

const Pagination = props => {
  function changePage(e) {
    navigate(
      e.target.value
        ? `${props.context.paginationPath}/${e.target.value}`
        : `${props.context.paginationPath}/`
    )
  }


  return (
    <>
      {props.context.numberOfPages > 2 ? (
        <div className="pager">
          <ul class="pagination">
            {props.context.previousPagePath && (
              <Button to={`${props.context.previousPagePath}`}><span>«</span></Button>
            )}            
            <Li onClick={changePage} value="" className={props.context.humanPageNumber === 1 && "active"}>1</Li>
            <Li onClick={changePage} value="2" className={props.context.humanPageNumber === 2 && "active"}>2</Li>
            {props.context.humanPageNumber > 3 && props.context.humanPageNumber != props.context.numberOfPages &&
              <>
                ...
                <Li onClick={changePage} value={props.context.humanPageNumber} className="active">{props.context.humanPageNumber}</Li>
              </> 
            }
            <Li onClick={changePage} value={props.context.numberOfPages} className={props.context.humanPageNumber === props.context.numberOfPages ? "active" : ""}>{props.context.numberOfPages}</Li>
            {props.context.nextPagePath && (
              <Button to={`${props.context.nextPagePath}`}><span>»</span></Button>
            )}
          </ul>
        </div>
      ):
      (
        <>
        {props.context.numberOfPages > 1 && (
          <div className="pager">
            <ul class="pagination">
              {props.context.previousPagePath && (
                <Button to={`${props.context.previousPagePath}`}><span>«</span></Button>
              )}
              <Li onClick={changePage} value="" className={props.context.humanPageNumber === 1 && "active"}>1</Li>
              <Li onClick={changePage} value="2" className={props.context.humanPageNumber === 2 && "active"}>2</Li>
              {props.context.nextPagePath && (
                <Button to={`${props.context.nextPagePath}`}><span>»</span></Button>
              )}
            </ul>
          </div>
        )}
        </>
      )}
    </>
  )
}

export default Pagination
