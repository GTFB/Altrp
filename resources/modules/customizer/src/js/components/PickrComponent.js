import {useEffect, useRef} from "react";
import Pickr from "@simonwep/pickr";
import '@simonwep/pickr/dist/themes/nano.min.css';

function PickrComponent({saveCallback, colorControlled}) {
  const element = useRef()

  const saveColor = (color) => {
    saveCallback(color.toHEXA().toString())
  }

  useEffect(() => {
    let pickr = Pickr.create({
      el: element.current,
      theme: 'nano',
      default: colorControlled || "#8E94AA",
      components: {
        preview: true,
        hue: true,
        interaction: {
          hex: false,
          rgba: false,
          hsla: false,
          hsva: false,
          cmyk: false,
          input: true,
          clear: false,
          save: true
        }
      },
    });

    pickr.on('save', saveColor)

    return () => {
      pickr.off('save', saveColor)
    }
  }, [])

  return (
    <div ref={element}/>
  )
}

export default PickrComponent;
