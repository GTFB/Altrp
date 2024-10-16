import React, { useEffect } from "react";
import { changePageState } from "../../../../../front-app/src/js/store/altrp-page-state-storage/actions";
import { connect, useDispatch } from "react-redux";

import DynamicPieChart from "../../../../../admin/src/components/dashboard/widgets/DynamicPieChart";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";

import { getDataByPath, isEditor } from "../../../../../front-app/src/js/helpers";
import moment from "moment";
import getFormatValueString from "../../../../../admin/src/components/dashboard/services/getFormatValueString";

const AltrpPieDiagram = props => {
  const { settings, id } = props;

  const customColorSchemeChecker = settings?.isCustomColor;

  const customColors = settings?.customScheme?.map(item =>
    _.get(item, "color.colorPickedHex")
  );

  const {useCustomTooltips} = settings;

  const keyIsDate = settings.key_is_date;
  //line settings

  const {
    activeOuterRadiusOffset,
    margin,
    yScaleMax,
    colorScheme,
    innerRadius,
    padAngle,
    cornerRadius,
    sortByValue,
    activeInnerRadiusOffset,
    useCenteredMetric,
    useLinkArcLabels,
    useProcent,
    formatCurrency
  } = settings

  //data variable
  let data = [];

  if (isEditor()) {
    data = [
      {
        id: 'python',
        value: 199,
      },
      {
        id: 'rust',
        value: 541,
      },
      {
        id: 'scala',
        value: 584,
      },
      {
        id: 'c',
        value: 565,
      },
      {
        id: 'lisp',
        value: 598,
      },
    ]
  } else {
    if (settings.datasource_path != null) {
      try {
        data = getDataByPath(settings.datasource_path, []);
      } catch (error) {
        data = [];
      }
    }
  }

  if (data.length === 0) {
    return (
      <div className={`${props.classes} altrp-chart ${settings.legendPosition}`}>
        Loading data...
      </div>
    );
  }

  return (
    <DynamicPieChart
      classes={props.classes}
      useProcent={useProcent}
      margin={margin ? margin : {
        top: 30,
        bottom: 30,
        right: 30,
        left: 30
      }}
      valueFormat={getFormatValueString(settings)}
      useCustomTooltips={useCustomTooltips}
      yScaleMax={yScaleMax}
      customColorSchemeChecker={customColorSchemeChecker}
      customColors={customColors}
      data={data}
      colorScheme={colorScheme || 'nivo'}
      width={settings.width ? `${settings.width?.size}${settings.width?.unit}` : '100%'}
      height={settings.height ? `${settings.height?.size}${settings.height?.unit}` : '420px'}
      innerRadius={innerRadius?.size}
      padAngle={padAngle?.size}
      cornerRadius={cornerRadius?.size}
      sortByValue={sortByValue}
      legend={settings.use_legend && {
        anchor: settings.legend_anchor,
        direction: settings.legend_direction,
        itemDirection: settings.legend_item_direction,
        translateX: settings.legend_translate_x,
        translateY: settings.legend_translate_y,
        itemsSpacing: settings.legend_items_spacing,
        itemWidth: settings.legend_item_width || 60,
        itemHeight: settings.legend_item_height,
        itemOpacity: settings.legend_item_opacity?.size,
        symbolSize: settings.legend_symbol_size,
        symbolShape: settings.legend_symbol_shape
      }}
      activeOuterRadiusOffset={activeOuterRadiusOffset}
      activeInnerRadiusOffset={activeInnerRadiusOffset}
      useCenteredMetric={useCenteredMetric}
      useLinkArcLabels={useLinkArcLabels}
      currency={formatCurrency}
    />
  );
};
const mapStateToProps = state => ({
  currentDataStorage: state.currentDataStorage,
  altrpresponses: state.altrpresponses,
});
export default connect(mapStateToProps)(AltrpPieDiagram);
