import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCommon from "../UI/ButtonCommon";
import InputCommon from "../UI/InputCommon";
import Logo from "./Logo";
import MenuBtn from "./MenuBtn";
import Search from "../icons/Search";

const NavSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [preventSubmit, setPreventSubmit] = useState(false);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const searchTimer = setTimeout(() => {

    // API 요청 보내기
    fetch("/api/autocomplete?search=" + searchTerm)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("API 요청 중");
        }
      })
      .then((suggestions) => setSuggestions(suggestions))
      .catch((error) => {
        console.error(error);
      });    
    }, 90);
    return () => clearTimeout(searchTimer);
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setIsSuggestionsVisible(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.item_name);
    setSuggestions([]);
    setPreventSubmit(true);
    setIsSuggestionsVisible(false);
    navigate(`/product/${suggestion.item_id}`);
    setSearchTerm('')
  };

  // 현재 검색 키워드로 상품이 나열되는 창이 구현이 되지않은 것으로 보입니다.. !!!
  const handleButtonClick = () => {
    // 인풋 창에 있는 내용을 이용하여 API 요청 보내기
    fetch("/api/items?search=" + searchTerm)
      .then((response) => {
        console.log("조회한 아이템:", searchTerm);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("API 요청 중");
        }
      })

      // 이 부분 완성해 주셔야 해요..!
      .then((searchTerm) => {
        // 조회된 아이템을 확인..
        for (var i = 0; i < searchTerm.length; i++){
          console.log("조회된 아이템:", searchTerm[i]);
        }

        // 어디로 보내야 하죠..
        navigate(`/product?search=${searchTerm}`);
        setSearchTerm('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDocumentClick = (event) => {
    // 클릭된 요소가 suggestions 영역 내에 있는지 확인
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setIsSuggestionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="navSearch__wrapper">
      <Logo />
      <div className="navSearch">
        <form onSubmit={(e) => preventSubmit && e.preventDefault()}>
          <InputCommon
            label=""
            id=""
            value={searchTerm}
            className="search"
            onChange={handleChange}
            placeholder="원하는 식재료를 입력하세요."
          />
          <ButtonCommon design="none" type="submit" onClick={handleButtonClick}>
            <Search />
          </ButtonCommon>
        </form>
        {isSuggestionsVisible && (
          <ul id="suggestions" className="suggestions" ref={suggestionsRef}>
            {suggestions.map((suggestion) => (
              <li key={suggestion.item_name} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.item_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <MenuBtn />
    </div>
  );
};

export default NavSearchBar;
