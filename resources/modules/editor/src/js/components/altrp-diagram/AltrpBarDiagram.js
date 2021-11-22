import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";

import { getDataByPath, isEditor } from "../../../../../front-app/src/js/helpers";
import moment from "moment";
import DynamicBarChart from "../../../../../admin/src/components/dashboard/widgets/DynamicBarChart";

const AltrpBarDiagram = props => {
  const { settings, id } = props;

  const customColorSchemeChecker = settings?.isCustomColor;

  const customColors = settings?.customScheme?.map(item =>
    _.get(item, "color.colorPickedHex")
  );

  const {
    isMultiple,
    sort,
    tickRotation,
    enableGridX,
    enableGridY,
    colorScheme,
    layout,
    groupMode,
    reverse,
    borderRadius,
    borderWidth,
    enableLabel,
    padding,
    useCustomTooltips,
    margin,
    datasource_title,
    subTitle,
    markersRepeater,
    useSymlogScale,
    group_name, 
    key_name, 
    data_name
  } = settings

  const sql = settings.query?.dataSource?.value;
  const keyIsDate = settings.key_is_date;

  //data variable
  let data = [];
  let keys = []

  //funciton for formattion data for all types
  const formatData = (data, groupName, keyName, dataName) => {
    let hierarhed = {}

    data.forEach(el => {
      hierarhed[el.type] = hierarhed[el.type] || []
      hierarhed[el.type].push(el)
    })

    let formatted = []

    Object.keys(hierarhed).forEach(key => {
      const keyv = {}

      hierarhed[key].map(el => {
        keyv[el[keyName]] = el[dataName]
      })

      keyv[groupName] = key 
      formatted.push(keyv)
    })

    return formatted;
  };

  if (isEditor()) {
    data = [
      {
        key: 'key1',
        title: 61,
        title1: 60,
      },
      {
        key: 'key2',
        title1: 50,
        title: 60,
      },
    ]
  } else {
    try {
      data = getDataByPath(settings.datasource_path, []);

      keys = [
        ...new Set(data.map(el => el[key_name]))
      ]

      data = formatData(data, group_name, key_name, data_name);
    } catch (error) {
      console.log("====================================");
      console.error(error);
      console.log("====================================");
      data = [];
    }
  }

  if (!sql && data.length === 0) {
    return (
      <div className={`altrp-chart ${settings.legendPosition}`}>
        Идет загрузка данных...
      </div>
    );
  }

  const parseQueryParams = (qs = "") => {
    if (!qs) return "";
    const keyValues = qs.split("\n");
    const result = keyValues.map(item => item.replace("|", "=")).join("&");
    return `?${result}`;
  };

  const queryString = parseQueryParams(settings.query?.defaultParams);

  const widget = {
    source: sql + queryString,
    options: {
      colorScheme: settings.colorScheme,
      animated: settings.animated,
      isVertical: settings.isVertical
    },
    filter: {}
  };

  console.log("====================================");
  console.log(data);
  console.log("====================================");
  
  return (
    <DynamicBarChart
      widgetID={id}
      margin={margin}
      customColorSchemeChecker={customColorSchemeChecker}
      customColors={customColors}
      isMultiple={isMultiple}
      colorScheme={colorScheme}
      dataSource={data}
      widget={widget}
      enableLabel={enableLabel}
      width={`${settings.width?.size}${settings.width?.unit}`}
      height={settings.height?.size}
      layout={layout}
      groupMode={groupMode}
      reverse={reverse}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      padding={padding}
      sort={sort}
      tickRotation={tickRotation}
      enableGridX={enableGridX}
      enableGridY={enableGridY}
      useCustomTooltips={useCustomTooltips}
      keys={keys}
      indexBy={group_name}
      legend={!settings.use_legend && {
        anchor: settings.legend_anchor,
        direction: settings.legend_direction,
        itemDirection: settings.legend_item_direction,
        translateX: settings.legend_translate_x,
        translateY: settings.legend_translate_y,
        itemsSpacing: settings.legend_items_spacing,
        itemWidth: settings.legend_item_width,
        itemHeight: settings.legend_item_height,
        itemOpacity: settings.legend_item_opacity,
        symbolSize: settings.legend_symbol_size,
        symbolShape: settings.legend_symbol_shape
      }}
      title={datasource_title}
      subTitle={subTitle}
      markers={markersRepeater?.map(el => ({
        ...el,
        axis: 'y', 
        legendOrientation: el.legendOrientation || 'horizontal',
        lineStyle: {stroke: el.stroke.color}
      }))}
    />
  )
};
const mapStateToProps = state => ({
  currentDataStorage: state.currentDataStorage
});
export default connect(mapStateToProps)(AltrpBarDiagram);
