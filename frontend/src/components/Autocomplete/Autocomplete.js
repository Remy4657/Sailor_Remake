import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Autocomplete.css";
import { INITIAL_LIST_PRODUCT } from "../../redux/actions/action";



function Autocomplete(props) {
  const { setIsShowSearch, isShowSearch } = props
  const dispatch = useDispatch()
  const listProduct = useSelector(state => state.user.listProduct)
  const refListProduct = useRef(listProduct)
  // dam bao refListProduct ko bi thay doi khi re render.
  // refListProduct.current = listProduct
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Event handlers and other methods will go here
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.length > 0) {
      const filteredSuggestions = refListProduct.current.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(
        filteredSuggestions.length > 0
          ? filteredSuggestions
          : ["No matches found"]
      );
    } else {
      setSuggestions([]);
    }
  };
  const handleSuggestionClick = (item) => {
    setInputValue(item.name);
    setSuggestions([]);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const filterListProduct = refListProduct.current.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()) === true)
      dispatch(INITIAL_LIST_PRODUCT(filterListProduct))
    }
  }
  const handleSearchBlur = () => {
    setIsShowSearch(isShowSearch)
  }

  return (
    <div className="autocomplete-wrapper" style={{ position: "absolute", width: "410px", right: "12%", top: "85px" }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
        placeholder="Search product..."
        style={{
          padding: "7px 10px",
          width: "100%",
          border: "none",
          borderBottom: "1px solid #000",
          borderRadius: "0px",
          outline: "none"
        }}
        onKeyUp={(e) => handleSearch(e)}
        // onBlur={() => { setIsShowSearch(false) }}
        autoFocus={true}
      // Additional props
      />
      {suggestions.length > 0 && (
        <ul id="autocomplete-list" className="suggestions-list" role="listbox">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item)}
              role="option"
            // Additional props
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
