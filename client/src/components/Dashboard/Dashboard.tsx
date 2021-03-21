import React, {FC, useEffect, useRef, useState} from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Spinner} from "../Spinner";
import {IDashboard} from "../../shared/interfaces";
import {APIMethods} from "../../shared/services";
import {TableList} from "../TableList";
import {BarChart} from "../BarChart";
import css from "./dashboard.module.css";

const {Debts} = APIMethods();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      // height: 140,
      // width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

const Dashboard: FC<IDashboard> = () => {
  const [fetching, setFetching] = useState(false);
  const [debtsList, setDebtsList] = useState([]);
  const [creditsList, setCreditsList] = useState([]);
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();
  const visualizationRef = useRef();


  const creditAmounts = [ 8, 13, 5, 11 ];
  const debtAmounts = [ 12, 9, 2 ];

  const getDebtsList = async () => {
    try {
      setFetching(true);
      const {data: debts} = await Debts.readMany({ debtor: "Htin" });
      const formattedDebts = debts.map(item => ({
        name: item.creditor,
        ...item,
      }));
      setDebtsList(formattedDebts);
      const {data: credits} = await Debts.readMany({ creditor: "Htin" });
      const formattedCredits = credits.map(item => ({
        name: item.debtor,
        ...item,
      }));
      setCreditsList(formattedCredits);
      setFetching(false);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getDebtsList();
  }, []);

  return (
    <div className={css.dashboardContainer}>
      {fetching ? <Spinner /> : (
        <div>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={spacing}>
                  <Grid key={0} item xs={6}>
                    <Paper className={classes.paper}>
                      <BarChart title="Credits" dataList={creditAmounts} />
                    </Paper>
                  </Grid>
                  <Grid key={1} item xs={6}>
                    <Paper className={classes.paper}>
                      <BarChart title="Debts" dataList={debtAmounts} />
                    </Paper>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
          <TableList list={creditsList} title="Credits" />
          <TableList list={debtsList} title="Debts" />
          
        </div>
      )}
    </div>
      
  );
};

export {Dashboard};