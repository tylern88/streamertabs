import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { HiOutlineSearch } from 'react-icons/hi'
import { useSearch } from '../views/hooks/useSearchProvider'
const StyledInput = styled.input`
  width: 100%;
  height: 24px;
  border-radius: 5px 0 0 5px;
  background-color: #26284a;
  color: #efefef;
  border: 1px solid transparent;
  :focus {
    outline: none;
    border: 1px solid #6d72d6;
  }
`

const StyledInputContainer = styled.div`
  display: flex;
`

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  color: #1b1b33;
  background: #6d72d6;
  border-radius: 0 5px 5px 0;
  border: none;
  margin: 0;
  outline: 0;

  :hover {
    cursor: pointer;
  }
  :active {
    background-color: #26284a;
    color: #6d72d6;
  }
`

const StyledForm = styled.form`
  display: inline-flex;
  width: 100%;
`

const Input = ({ placeholder, type = 'text', disabled, className }) => {
  const { handleSearchTwitch } = useSearch()
  const [searchTerm, setSearchTerm] = useState('')
  const history = useHistory()

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    history.push('/search')
    handleSearchTwitch({ query: searchTerm })
  }

  return (
    <StyledInputContainer className={className}>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          name="search"
          onChange={handleChange}
          value={searchTerm}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          autoComplete="off"
        />
        <StyledButton type="submit">
          <HiOutlineSearch />
        </StyledButton>
      </StyledForm>
    </StyledInputContainer>
  )
}

export default styled(Input)``
