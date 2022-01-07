import './DraggableScroll.scss'
import {useEffect, useState} from "react";
import { FreeMode } from 'swiper';
import { Swiper } from 'swiper/react';
import axios from "axios";
import 'swiper/scss';
import "swiper/scss/free-mode";

function DraggableScroll(props) {
  const [length, setLength] = useState(1)


  useEffect(async () => {
    const getCategories = async () => {
      let { data } = await axios.get('/admin/ajax/category/options')
      getLength(data.data)
    }

     await getCategories()
  }, [])

  const getLength = (data) => {
    if (data.length + 1 === 2) {
      setLength(2)
    } else if (data.length + 1 === 3 || data.length + 1 > 3) {
      setLength(3)
    }
  }


  return (
    <div
      className="draggable-scroll__container"
      style={{width: (length === 2 && 263.32 + 'px') || (length === 3 && 400 + 'px') }}
    >
      <Swiper
        slidesPerView={length}
        spaceBetween={length > 1 ? 10 : 0}
        freeMode={true}
        modules={[FreeMode]}
      >

        {props.children}
      </Swiper>
    </div>
  )
}

export default DraggableScroll;
