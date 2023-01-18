import getResponsiveSetting from "../getResponsiveSetting";

export default function renderInputRangeSlider(settings, device) {

  const vertical = getResponsiveSetting(settings,"vertical", device, false);
  const min = getResponsiveSetting(settings,"min", device, 0);
  const max = getResponsiveSetting(settings,"max", device, 100);
  const labelStepSize = getResponsiveSetting(settings, "label_step", device, 25);


 

  let sliderLabels: number[] = []

  for(let i = min; i <= max; i += labelStepSize) {
    sliderLabels.push(i)
  }


  return `<div value="${min + ',' + max}" max="${max}" class="${"altrp-field-slider-wrapper" + (vertical ? " altrp-field-slider-vertical" : " altrp-field-slider-horizontal")}">
            <div class="${"bp3-slider" + (vertical ? " bp3-vertical" : "") + " altrp-field-slider"}">
               <div class="bp3-slider-track">
                  <div class="bp3-slider-progress" style="${vertical ? "left: 0px; top: 100%; bottom: 0%;" : "left: 0; right: 100%; top: 0;"}"></div>
                  <div class="bp3-slider-progress bp3-intent-primary" style="${vertical ? "left: 0px; top: 0; bottom: 0;" : "left: 0; right: 0; top: 0;"}"></div>
                  <div class="bp3-slider-progress" style="${vertical ? "left: 0px; top: 0%; bottom: 100%;" : "left: 100%; right: 0%; top: 0px;"}"></div>
               </div>
               <div class="bp3-slider-axis">

               </div>
            </div>
           </div>`
}
