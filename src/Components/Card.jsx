import { useEffect, useState } from "react";
import "./Card.css";

const Card = () => {
  const [list, setList] = useState([]);
  const [bookmarks, setBookmarks] = useState({});

  useEffect(() => {
    fetch("https://www.omdbapi.com/?s=bat&apikey=23b1be9f")
      .then((response) => response.json())
      .then((data) => {
        const { Search } = data;
        setList(Search);

        let getItems = JSON.parse(localStorage.getItem("bookmarks"));
        console.log("getitem", getItems);
        if (getItems !== null) {
          setBookmarks(getItems);
        }
        console.log("check1");
      });
  }, []);

  const clickFun = (item) => {
    const { imdbID } = item;
    const currentBookmark = { ...bookmarks };
    if (!currentBookmark.hasOwnProperty(imdbID)) {
      currentBookmark[imdbID] = true;
    } else {
      currentBookmark[imdbID] = !currentBookmark[imdbID];
    }
    setBookmarks(currentBookmark);
    localStorage.setItem("bookmarks", JSON.stringify(currentBookmark));
    console.log("check2");
  };

  const handleColor = (isActive) => {
    if (!isActive) {
      return (
        <svg
          aria-label="Like"
          className="_8-yf5 "
          fill={"black"}
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
        </svg>
      );
    } else {
      return (
        <svg
          aria-label="Unlike"
          className="_8-yf5 "
          color="#ed4956"
          fill="#ed4956"
          height="24"
          role="img"
          viewBox="0 0 48 48"
          width="24"
        >
          <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
        </svg>
      );
    }
    console.log("check3");
  };

  return (
    <>
      <div id="parent">
        {list.map((item, i) => {
          return (
            <div id="child" key={item.imdbID}>
              <div>
                <h3>{item.Title}</h3>
              </div>
              <div>
                <img src={item.Poster} alt="" />
              </div>
              <div id="bookmark">
                <h4>
                  {bookmarks[item.imdbID] ? "Bookmarked" : "Click to bookmark"}
                </h4>
                <button
                  onClick={() => {
                    clickFun(item);
                  }}
                >
                  {handleColor(bookmarks[item.imdbID])}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Card;
