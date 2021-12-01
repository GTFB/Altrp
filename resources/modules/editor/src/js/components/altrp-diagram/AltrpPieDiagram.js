import React, { useEffect } from "react";
import { changePageState } from "../../../../../front-app/src/js/store/altrp-page-state-storage/actions";
import { connect, useDispatch } from "react-redux";

import DynamicPieChart from "../../../../../admin/src/components/dashboard/widgets/DynamicPieChart";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";

import { getDataByPath, isEditor } from "../../../../../front-app/src/js/helpers";
import moment from "moment";

const AltrpPieDiagram = props => {
  const { settings, id } = props;

  const dispatch = useDispatch();
  const widgetName = settings?.widget_name || id;
  const customColorSchemeChecker = settings?.isCustomColor;

  const customColors = settings?.customScheme?.map(item =>
    _.get(item, "color.colorPickedHex")
  );

  const useCustomTooltips = settings?.customTooltip;

  const sql = settings.query?.dataSource?.value;
  const keyIsDate = settings.key_is_date;
  //line settings

  const {
    activeOuterRadiusOffset,
    margin,
    yScaleMax,
    colorScheme,
    isMultiple,
    isCustomColor,
    sort,
    tickRotation,
    bottomAxis,
    innerRadius,
    enableSliceLabels,
    padAngle,
    cornerRadius,
    sortByValue,
    enableRadialLabels,
    activeInnerRadiusOffset,
    useCenteredMetric,
    useLinkArcLabels,
    useProcent
  } = settings
  
  //data variable
  let data = [];

  //funciton for formattion data for all types
  const formatData = (data, r) => {
    return data.map((d, index) => {
      const currentKey = _.get(d, r.key);
      const keyFormatted = !moment(currentKey).isValid()
        ? currentKey
        : moment(currentKey).format("DD.MM.YYYY");
      const tooltip =
        typeof tooltipValues !== "undefined"
          ? tooltipValues?.map(item => {
              return {
                label: item?.label,
                value: _.get(d, item.field),
                color: item?.color
              };
            })
          : [];
        
        return {
            value: Number(_.get(d, r.data)),
            id: keyIsDate ? keyFormatted : currentKey,
            tooltip: tooltip
        };
    });
  };

  if (isEditor()) {
    data = [
      {
        id: 'Demo data 1',
        value: 60,
        tooltip: []
      },
      {
        id: 'Demo data 2',
        date: '2013-01',
        value: 200,
        tooltip: []
      },
      {
        id: 'Demo data 3',
        date: '2013-01',
        value: 20,
        tooltip: []
      },
      {
        id: 'Demo data 4',
        date: '2013-01',
        value: 10,
        tooltip: []
      },
      {
        id: 'Demo data 5',
        date: '2013-01',
        value: 50,
        tooltip: []
      },
    ]
  } else {
    if (isMultiple) {
      let repeater = _.cloneDeep(settings.rep, []);
      data = repeater.map((r, index) => {
        let innerData = getDataByPath(r.path, []);
        if (innerData.length > 0) {
          //Исключаем дублирование ключей, т.к. это приводит к ошибкам рендера всех диаграм
          innerData = _.uniqBy(innerData, r.key);
          
          innerData = formatData(innerData, r);
        }
        
        return innerData;
      });
      
      data = [].concat(...data);

    } else if (settings.datasource_path != null) {
      try {
        data = getDataByPath(settings.datasource_path, []);
        const r = {
          key: settings.key_name,
          data: settings.data_name
        };
  
        data = formatData(data, r);
      } catch (error) {
        console.log("====================================");
        console.error(error);
        console.log("====================================");
        data = [
          {
            id: settings.datasource_title || settings.datasource_path,
            data: []
          }
        ];
      }
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
      legend: settings.legend,
      animated: settings.animated,
      isVertical: settings.isVertical
    },
    filter: {}
  };

  console.log("====================================");
  console.log(data);
  console.log("====================================");

  return (
    <DynamicPieChart
      useProcent={useProcent}
      widgetID={id}
      margin={margin}
      useCustomTooltips={useCustomTooltips}
      yScaleMax={yScaleMax}
      customColorSchemeChecker={customColorSchemeChecker}
      customColors={customColors}
      isMultiple={isMultiple}
      dataSource={data}
      colorScheme={colorScheme}
      widget={widget}
      width={`${settings.width?.size}${settings.width?.unit}`}
      height={`${settings.height?.size}${settings.height?.unit}`}
      innerRadius={innerRadius}
      enableSliceLabels={enableSliceLabels}
      padAngle={padAngle}
      cornerRadius={cornerRadius}
      sortByValue={sortByValue}
      enableRadialLabels={enableRadialLabels}
      sort={sort}
      tickRotation={tickRotation}
      bottomAxis={bottomAxis}
      title={settings.datasource_title}
      subTitle={settings.subtitle}
      legend={settings.use_legend && {
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
      keyIsDate={keyIsDate}
      activeOuterRadiusOffset={activeOuterRadiusOffset}
      activeInnerRadiusOffset={activeInnerRadiusOffset}
      useCenteredMetric={useCenteredMetric}
      useLinkArcLabels={useLinkArcLabels}
    />
  );
};
const mapStateToProps = state => ({
  currentDataStorage: state.currentDataStorage
});
export default connect(mapStateToProps)(AltrpPieDiagram);