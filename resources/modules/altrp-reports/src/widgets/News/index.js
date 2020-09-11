import React from "react";

import "./news.scss";

const News = (props) => {
  console.log("News init");
  //const news = await axios.get(`/api/posts/${props.category}`).data;
  const news = [
    {
      image: "https://picsum.photos/seed/1/300/200",
      title: "Новость номер 1",
      text:
        "Текст новости почти без форматирования и тэгов! <b>Но они понадобяться.</b>",
    },
    {
      image: "https://picsum.photos/seed/2/300/200",
      title: "Новость номер 2",
      text:
        "Текст новости почти без форматирования и тэгов! <b>Но они понадобяться.</b>",
    },
    {
      image: "https://picsum.photos/seed/3/300/200",
      title: "Новость номер 3",
      text:
        "Текст новости почти без форматирования и тэгов! <b>Но они понадобяться.</b>",
    },
  ];

  return news.map((item, index) => (
    <div className="news" key={index}>
      <div className="news__image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="news__body">
        <h2 className="news__body-title">{item.title}</h2>
        <div className="news__body-text">{item.text}</div>
      </div>
    </div>
  ));
};

export default News;
