import { useState } from "react";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import Converter from "./views/Converter";
import styles from "./App.module.css";

enum AppTab {
  Duration,
  Timestamp,
};

export const App = () => {
  const [tab, setTab] = useState<AppTab>(AppTab.Duration);

  return (
    <Container fluid="md">
      <div className={styles.header}>
        <h1 className={styles.title}>8601.guru</h1>
        <p className={styles.subtitle}>Convert <a href="https://docs.digi.com/resources/documentation/digidocs/90001488-13/reference/r_about_iso_8601_date_format.htm?tocpath=OEM%20Cloud%20Programmer%20Help%7CISO%208601%20date%20and%20duration%20reference%7C_____0">ISO 8601</a> to human readable text.</p>
      </div>
      <div className={styles.content}>
        <div className={styles.tabs}>
          <ButtonGroup size="lg">
            <Button className={`${styles.tab} ${tab === AppTab.Duration ? styles.active : ""}`} onClick={() => setTab(AppTab.Duration)}>Duration</Button>
            <Button className={`${styles.tab} ${tab === AppTab.Timestamp ? styles.active : ""}`} onClick={() => setTab(AppTab.Timestamp)}>Timestamp</Button>
          </ButtonGroup>
        </div>
        { tab === AppTab.Duration && <Converter /> }
        { tab === AppTab.Timestamp && <center><i>Coming soon...</i></center> }
      </div>
      <div className={styles.footer} />
    </Container>
  )
}

export default App;
