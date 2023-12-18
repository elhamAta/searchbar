import React,{ useCallback, useEffect, useState }  from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import useDebounce from './useDebounce';

function SearchEngine() {
  console.log("env",process.env.REACT_APP_API_KEY)
  const [value,setValue] = useState("");
  const [list, setList] = useState([]);
  const[pageCounts, setPageCounts] = useState(0)
  const[activePageNumber, setActivePageNumber] = useState(1)

  const debounceValue = useDebounce(value)
  const SearchReq = useCallback(
    async() => {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}?title=${debounceValue}`);
      const data =await response.json();
      setList(data)
    },
    [debounceValue]
  );

  useEffect(() => {
    SearchReq();
  },[debounceValue])

  useEffect(() => {
    setPageCounts(calculatePageCount());
  },[list])

  const calculatePageCount = () => {
    if(list.length / 5 > 0){
      return parseInt(list.length / 5 )
    }
    return parseInt(list.length / 5 )
  }

  const handleOnPages = useCallback((pageNumber) => {
    setActivePageNumber(pageNumber)
  },[])
  
  return (
    <div className="container">
      <div className='search--box'>
        <input
            type="text"
            placeholder="Type to search... "
            className="txt"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
      </div>
      <ul className="results--box">
        {list.slice(5*activePageNumber,5 * (activePageNumber+1)).map((item) => {
            return(
                <li key={item.id}>
                    <Link to={"/"} className='title'>{item.title}</Link>
                    <p className='info'>
                        {item.description}
                    </p>
                </li>
            );
        })}
      </ul>
      <ul className="pagination">
        {new Array(pageCounts).fill(0).map((item,index) => (
          <li className={activePageNumber === index+1 ? 'active' : ''}>
            <button className='button' onClick={() => handleOnPages(index+1)}>{index+1}</button>
          </li>
        ))}
      </ul>
  </div>
  )
}

export default SearchEngine