import React, { useState, useEffect, useCallback } from "react";
import { ResponsivePie } from "@nivo/pie";
import Spinner from "./Spinner";
import EmptyWidget from "./EmptyWidget";

import Schemes from "../../../../../editor/src/js/components/altrp-dashboards/settings/NivoColorSchemes";
const milkScheme = _.find(Schemes, { value: "milk" }).colors;
const milkScheme2 = _.find(Schemes, { value: "milk2" }).colors;

import { getWidgetData } from "../services/getWidgetData";
import moment from "moment";
import { animated } from '@react-spring/web'
import TooltipPie from "./d3/TooltipPie";
import addCurrencyToLabel from "../services/addCurrencyToLabel";

const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
  let total = 0
  dataWithArc.forEach(datum => {
      total += datum.value
  })

  return (
    <svg>
      <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="central"
          className='centered-metric'
      >
        {total}
      </text>
    </svg>
  )
}

const DynamicPieChart = ({
  widget,
  width = "300px",
  height = "450px",
  dataSource = [],
  colorScheme = "red_grey",
  innerRadius = 0,
  padAngle = 0,
  cornerRadius = 0,
  sortByValue = 0,
  sort = "",
  keyIsDate = false,
  customColorSchemeChecker = false,
  customColors = [],
  useCustomTooltips,
  valueFormat,
  margin,
  legend,
  activeOuterRadiusOffset,
  activeInnerRadiusOffset,
  useCenteredMetric,
  useLinkArcLabels,
  useProcent,
  currency
}) => {
  if (legend) {
    Object.keys(legend).forEach(key => legend[key] === undefined && delete legend[key])
  }

  let allValue = 0;

  dataSource.forEach(el => allValue += el.value)
  
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    if (dataSource.length == 0) {
      const charts = await getWidgetData(widget.source, widget.filter);
      if (charts.status === 200) {
        const newData = charts.data.data.map(item => {
          const currentKey = item.key;
          const keyFormatted = !moment(currentKey).isValid()
            ? currentKey
            : moment(currentKey).format("DD.MM.YYYY");

          return {
            value: Number(item.data),
            id: keyIsDate ? keyFormatted : currentKey
          };
        });
        let data = newData;
        setData(data || []);
        setIsLoading(false);
      }
    } else {
      if (
        sort !== null &&
        sort !== "undefined" &&
        typeof dataSource !== "undefined"
      ) {
        switch (sort) {
          case "value":
            dataSource = _.sortBy(dataSource, ["value"]);
            break;
          case "key":
            dataSource = _.sortBy(dataSource, ["id"]);
            break;
          default:
            dataSource = dataSource;
            break;
        }
      }
      setData(dataSource || []);
      setIsLoading(false);
    }
  }, [widget]);

  useEffect(() => {
    getData();
  }, [getData]);

  const layers = ['arcs', 'arcLabels', 'arcLinkLabels', 'legends']

  if (useCenteredMetric) {
    layers.push(CenteredMetric)
  }

  const customProps = {}

  if (useLinkArcLabels === false) {
    customProps.arcLinkLabelComponent = () => <text />
  }

  if (!!valueFormat && currency) {
    customProps.arcLabel = addCurrencyToLabel(currency)
    customProps.tooltip = ({datum}) => (
      <div style={{background: 'white', color: 'inherit', fontSize: '13px', borderRadius: '2px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 2px', padding: '5px 9px'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={{display: 'block', width: '12px', height: '12px', background: datum.color, marginRight: '7px'}}></span>
          <span>{datum.label}: <strong>{addCurrencyToLabel(currency)(datum)}</strong></span>
        </div>
      </div>
    )
  }

  if (isLoading) return <Spinner />;

  if (!data || data.length === 0) return <EmptyWidget />;

  return (
    <>
      <div className='diagram' style={{ height, width }}>
        <ResponsivePie
          data={data}
          colors={
            customColorSchemeChecker && customColors.length > 0
              ? customColors
              : colorScheme === "milk"
              ? milkScheme
              : colorScheme === "milk2"
              ? milkScheme2
              : { scheme: colorScheme }
          }
          cornerRadius={cornerRadius}
          sortByValue={sortByValue}
          margin={margin}
          legends={legend && [
            {
              anchor: 'top-right',
              direction: 'column',
              translateX: 0,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 60,
              itemHeight: 14,
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 14,
              symbolShape: "circle",
              ...legend
            }
          ]}
          innerRadius={innerRadius}
          padAngle={padAngle}
          animate={true}
          activeOuterRadiusOffset={activeOuterRadiusOffset}
          activeInnerRadiusOffset={activeInnerRadiusOffset}
          layers={layers}
          // tooltip={datum => (
          //   <TooltipPie
          //     datum={datum}
          //     data={data}
          //   ></TooltipPie>
          // )}
          arcLabelsComponent={({ datum, label, style }) => {
            return <animated.g transform={style.transform} style={{ pointerEvents: 'none' }}>
                <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="arc-label"
                >
                    {label} {useProcent ?  ` (${Math.round((label / allValue) * 100)}%)` : ''}
                </text>
            </animated.g>
          }}
          valueFormat={valueFormat}
          {...customProps}
        />
      </div>
    </>
  );
};

export default DynamicPieChart;
