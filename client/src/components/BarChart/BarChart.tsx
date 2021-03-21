import React, {FC, useEffect, useRef} from "react";
import * as d3 from "d3";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import css from "./barChart.module.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface IBarChart {
  title: string,
  dataList: number[]
}

const BarChart: FC<IBarChart> = ({title, dataList}) => {
  const visualizationRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  const drawBarChart = (data) => {
    const canvasHeight = 400;
    const canvasWidth = 200;
    const scale = 20
    const svgCanvas = d3.select(visualizationRef.current)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .style("borde", "1px solid black");
    svgCanvas.selectAll("rect")
      .data(data).enter()
        .append("rect")
        .attr("class", "bar")
        .attr("width", 40)
        .attr("height", (datapoint) => datapoint * scale)
        .attr("fill", "#3f51b5")
        .attr("x", (datapoint, iteration) => iteration * 45)
        .attr("y", (datapoint) => canvasHeight - datapoint * scale);
    svgCanvas.selectAll("text")
      .data(data).enter()
        .append("text")
        .attr("class", "barLabel")
        .attr("x", (dataPoint, i) => i * 45 + 10)
        .attr("y", (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
        .text(dataPoint => dataPoint)
  };

  useEffect(() => {
    drawBarChart(dataList);
  });

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <div ref={visualizationRef} className={css.visualizationContainer}>
        </div>
      </CardContent>
    </Card>
  );
};

export {BarChart};