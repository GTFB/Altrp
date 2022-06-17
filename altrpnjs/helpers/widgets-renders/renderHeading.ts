import getResponsiveSetting from "../getResponsiveSetting"
import parseURLTemplate from "../parseURLTemplate"
import AltrpLink from "./components/AltrpLink"
import objectToStylesString from "../objectToStylesString"
import * as _ from 'lodash'

export default function renderHeading(settings, device) {

  let heading = ''

  switch (getResponsiveSetting(settings, "type", device, 'heading')) {
    default:

      const background_image = getResponsiveSetting(settings, 'background_image', device, {})

      const textStrokeSwitch = getResponsiveSetting(settings, 'style_text_stroke_switcher', device, {})
      let text = getResponsiveSetting(settings,'text', device)
      let link
      const className = "altrp-heading altrp-heading--link " +
         (background_image?.url ? ' altrp-background-image' : '') + (textStrokeSwitch ? "text-stroke-included" : "")
      // @ts-ignore
      let wrapperClasses = "altrp-heading-wrapper"

      //sub heading
      const subTag = settings.sub_heading_settings_html_tag || "h2"
      let subHeading = ""
      if (settings.text_sub_switch) {
        const subText = getResponsiveSetting(settings, 'text_sub', device)

        switch (getResponsiveSetting(settings, "sub_heading_settings_position", device)) {
          case "top":
            wrapperClasses += " altrp-heading-wrapper-sub-top"
            break
          case "left":
            wrapperClasses += " altrp-heading-wrapper-sub-left"
            break
          case "right":
            wrapperClasses += " altrp-heading-wrapper-sub-right"
            break
          default:
            wrapperClasses += " altrp-heading-wrapper-sub-bottom"
        }
        subHeading = `<${subTag} class="altrp-heading-sub">${subText}</${subTag}>`

      }

      if (settings.link_link && settings.link_link?.url) {
        let linkProps: any = {
          rel: settings.link_link.noFollow ? "nofollow" : null,
          // href: settings.link_link.url,
          href: `mailto:mail@gmail.com`,
          className: 'altrp-inherit altrp-inherit_wo-border',
        }

        linkProps.tag = settings.link_link.tag
        linkProps.creativelink = getResponsiveSetting(settings, "heading_settings_html_tag", device) !== "p" ? getResponsiveSetting(settings, "creative_link_controller",device) : null

        if (settings.link_link.openInNew) {
          linkProps.target = '_black'
        }
        if ((settings.link_link.tag === 'Link')) {
          linkProps.to = settings.link_link?.url.replace(':id', '{{id}}' )
          linkProps.href = settings.link_link?.url.replace(':id', '{{id}}' )
        }
        linkProps.to = parseURLTemplate(settings.link_link?.url)
        linkProps.href = parseURLTemplate(settings.link_link?.url)

        link = AltrpLink(text, linkProps)
      }

      let advancedHeading = ""
      if (settings.switch_advanced_heading_content) {
        let styles = {}

        let xOffset = getResponsiveSetting(settings, "horizontal_offset_advanced_heading_content", device)
        let yOffset = getResponsiveSetting(settings, "vertical_offset_advanced_heading_content", device)
        let rotate = getResponsiveSetting(settings, "rotate_offset_advanced_heading_content", device)
        let transformOrigin = getResponsiveSetting(settings, "transform_origin_offset_advanced_heading_content", device)

        if (xOffset.size === "") {
          xOffset.size = "0"
        }
        if (yOffset.size === "") {
          yOffset.size = "0"
        }
        if (rotate.size === "") {
          rotate.size = "0"
        }

        let origin = "0 0"

        switch (transformOrigin) {
          case "topLeft":
            origin = "0 0"
            break
          case "topCenter":
            origin = "50% 0"
            break
          case "topRight":
            origin = "100% 0"
            break
          case "centerLeft":
            origin = "0 50%"
            break
          case "center":
            origin = "50% 50%"
            break
          case "centerRight":
            origin = "100% 50%"
            break
          case "bottomLeft":
            origin = "0 100%"
            break
          case "bottomCenter":
            origin = "50% 100%"
            break
          case "bottomRight":
            origin = "100% 100%"
            break
        }

        let pos = {
          transform: `translate(${xOffset.size + xOffset.unit}, ${yOffset.size + yOffset.unit}) rotate(${rotate.size}deg)`,
          transformOrigin: origin
        }

        styles = {...pos}

        let classes = "altrp-heading-advanced"

        if (getResponsiveSetting(settings, "main_fill_advanced_heading_style", device)) {
          classes += " altrp-heading-advanced-main-fill"
        }
        advancedHeading = `<div class="altrp-heading-advanced-wrapper">
<${settings.heading_settings_html_tag || 'h2'} class="${classes}" style="${objectToStylesString(styles)}">
${getResponsiveSetting(settings, "text_advanced_heading_content", device)}</${settings.heading_settings_html_tag || 'h2'}></div>`

        let currentBreakpoint: {
          type?: string,
          size?: number,
        } = {}
        switch (getResponsiveSetting(settings, "hide_at_offset_advanced_heading_content", device)) {
          case "never":
            currentBreakpoint = {
              type: "never",
              size: 0
            }
            break
          case "mobile":
            currentBreakpoint = {
              type: "mobile",
              size: 768
            }
            break
          case "tablet":
            currentBreakpoint = {
              type: "tablet",
              size: 1025
            }
            break
          default:
        }

        if (getResponsiveSetting(settings, "hide_at_offset_advanced_heading_content", device) !== "never") {
          let bodyWidth = document.body.offsetWidth

          // @ts-ignore
          if ((typeof currentBreakpoint === 'object') && bodyWidth <= currentBreakpoint.size) {
            advancedHeading = ""
          }
        }
      }

      let headingContainer = link ? `<${settings.heading_settings_html_tag || 'h2'} id="${settings.position_css_id || ""}" class="${className}">
${link}</${settings.heading_settings_html_tag || 'h2'}>
${settings.text_sub_switch ?
        `<${subTag} class="altrp-heading-sub-container-link altrp-heading-sub" >${
          AltrpLink(settings.text_sub, {link: settings.link_link, className: "altrp-inherit altrp-inherit_wo-border"})
        }</${subTag} >`
        : ''}`
        :
        `<${settings.heading_settings_html_tag || 'h2'} id="${settings.position_css_id || ""}" class="${className}">${text}</${settings.heading_settings_html_tag || 'h2'}>${
          subHeading
        }`
      heading = `<div class="${wrapperClasses}">${
        advancedHeading
      }${
        headingContainer
      }</div>`
      break
  }
  return heading
}
