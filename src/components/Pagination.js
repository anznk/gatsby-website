import React from 'react'
import { navigate, Link } from 'gatsby'
import styled from '@emotion/styled'
import SelectIcon from '../icons/SelectIcon'

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

const Button = styled(Link)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem;
  border-radius: 2px;
  margin: 0 0 0 0.5rem;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s all;
  &:hover {
    background: ${props => props.theme.colors.highlight};
  }
  @media (hover: none) {
    background: ${props => props.theme.colors.primary} !important;
  }
`

const Numbers = styled.div`
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 2px;
  display: inline-block;
  float: left;
  color: ${props => props.theme.colors.text};
  padding: 1rem;
  background: white;
  position: relative;
  transition: 0.3s all;
  svg {
    fill: ${props => props.theme.colors.text};
    margin: 0 0 0 0.25rem;
    transition: 0.3s all;
  }
  &:hover {
    background: ${props => props.theme.colors.tertiary};
  }
  @media (hover: none) {
    background: white !important;
  }
`

const Select = styled.select`
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: transparent;
  option {
    color: black;
  }
`

const Pagination = props => {
  function changePage(e) {
    console.log("e.target.value", e.target.value);
  
    let page = parseInt(e.target.value, 10);
    if(e.target.value === -1){
      page = parseInt(props.context.paginationPath, 10) - 1
      if(page <= 1){
        page = "";
      }
    } else if(e.target.value === +1){
      console.log("in!!")
      page = props.context.paginationPath + 1;

        console.log("page!!", page);
      if(page > props.context.paginationPath){
        page = props.context.paginationPath;
      }
      console.log("page", page);
    }

    
    navigate(
      page
        ? `${props.context.paginationPath}/${page}`
        : `${props.context.paginationPath}/`
    )
  }

  return (
    <>
      {props.context.numberOfPages > 2 ? (
        <div className="pager">
          <ul class="pagination">
            {props.context.previousPagePath && (
              <Button to={`${props.context.previousPagePath}`}>« </Button>
            )}
            <li onClick={changePage} value="" className="active">1</li>
            <li onClick={changePage} value="2">2</li>
            <li onClick={changePage} value={props.context.numberOfPages}>{props.context.numberOfPages}</li>
            {props.context.nextPagePath && (
              <Button to={`${props.context.nextPagePath}`}>»</Button>
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
                <Button to={`${props.context.previousPagePath}`}>« </Button>
              )}
              <li onClick={changePage} value="" className="active">1</li>
              <li onClick={changePage} value="2">2</li>
              {props.context.nextPagePath && (
                <Button to={`${props.context.nextPagePath}`}>»</Button>
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
