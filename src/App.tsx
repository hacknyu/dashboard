import * as React from "react";
import injectSheet, { WithStyles } from "react-jss"
import { functions } from "./firebase";

type Props = WithStyles<typeof styles>;

interface Stats {
  nyuCount: number;
  totalCount: number;
  submittedCount: number;
  postGradCount: number;
  under18Count: number;
  nyuSchoolsCount: { [s: string]: number };
}

interface State {
  stats: Stats;
}

const styles = {
  App: {
    display: "flex",
    lineHeight: "1.3em",
    fontFamily: "Helvetica, sans-serif"
  }
}

const getApplicationStats = functions.httpsCallable("getApplicationStats");

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      stats: undefined as any
    };
  }
  componentDidMount() {
    console.log("CALLING...");
    getApplicationStats().then(res => {
      console.log(res);
      const stats = res.data;
      this.setState({ stats });
    });
  }

  render() {
    const { stats } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.App}>
          {stats ?
          <ul>
            <li>
              {" "}
              <b> TOTAL: </b> {stats.totalCount}{" "}
            </li>
            <li>
              {" "}
              <b> NYU: </b> {stats.nyuCount}{" "}
            </li>
            <li>
              {" "}
              <b> Submitted: </b> {stats.submittedCount}{" "}
            </li>
            <ul>
              {Object.entries(stats.nyuSchoolsCount).map(
                ([schoolName, count], index) => (
                  <li key={index}><b> {schoolName}</b> {count} </li>
                )
              )}
            </ul>
            <li><b> Under 18: </b> {stats.under18Count} </li>
            <li><b> Post Grad: </b> {stats.postGradCount} </li>
          </ul> : <div> Loading... </div>
          }
      </div>
    );
  }
}

export default injectSheet(styles)(App);
