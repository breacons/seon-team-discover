import React, { PureComponent, useState } from "react";
import { last } from "lodash-es";
import {
  Steps,
  Space,
  Typography,
  Divider,
  Button,
  Switch,
  Progress,
  Statistic,
} from "antd";
import styles from "./styles.module.less";
import logo from "./image/logo.png";
import { GridLoader } from "react-spinners";
import If from "@/components/If";

const { Step } = Steps;

export const Overlay = ({
  scenario,
  changeScenario,
  predicationActive,
  setPredictionActive,
}: any) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [predictionLoading, setPredictionLoading] = useState(false);

  console.log(scenario);
  const onButtonClick = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
      changeScenario(scenario.nextScenario);
    }, 1000);
  };

  const onToggle = (checked) => {
    if (checked && scenario.predictionDisabled !== true) {
      setPredictionLoading(true);
      setTimeout(() => {
        setPredictionLoading(false);
        setPredictionActive(true);
      }, 1800);
    } else {
      setPredictionActive(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.card} style={{ height: 100, width: 320 }}>
            <img src={logo} style={{ width: "100%" }} />
          </div>

          <div
            className={styles.card}
            style={{ width: 320, paddingTop: 24, paddingBottom: 24 }}
          >
            <Typography.Title
              level={4}
              style={{ width: "100%", textAlign: "left" }}
            >
              Location Timeline
            </Typography.Title>
            <Divider style={{ marginTop: 0 }} />
            <Steps direction="vertical">
              {scenario.locations.map((t, i) => (
                <Step
                  key={i}
                  status="process"
                  title={t.location}
                  description={
                    <Space size={6}>
                      <small>{t.ip}</small>
                      <span style={{ opacity: 0.3 }}>|</span>{" "}
                      <small>{t.time}</small>
                    </Space>
                  }
                />
              ))}
            </Steps>
            <Button
              type="primary"
              block
              size="large"
              onClick={onButtonClick}
              loading={buttonLoading}
            >
              {scenario.text}
            </Button>
          </div>
          <div className={styles.card} style={{ height: 140, width: 320 }}>
          <Typography.Title
              level={4}
              style={{ width: "100%", textAlign: "left" }}
            >
              Pattern Matching
            </Typography.Title>
            <Divider style={{ marginTop: 0, marginBottom: 6}} />
            <div className={styles.toggleRow}>
            <Statistic title="Similar Journeys" value={scenario.similarCount} />

            <div>
              <div className="ant-statistic-title" style={{marginBottom: 16}}>Confidence</div>

              <Progress percent={scenario.confidence} steps={5} strokeColor="#FF9300" style={{height: 24}}/>
            </div>
            </div>
          </div>
        </div>
        <div className={styles.column}>
          <div
            className={styles.card}
            style={{ width: 320, paddingTop: 28, paddingBottom: 24 }}
          >
            <div className={styles.toggleRow}>
              <Typography.Title
                level={4}
                style={{ width: "100%", textAlign: "left", marginBottom: 0 }}
              >
                Predictions
              </Typography.Title>
              <Switch
                defaultChecked
                checked={predicationActive}
                onChange={onToggle}
                style={{ backgroundColor: "#FF9300" }}
                disabled={scenario.predictionDisabled == true}
              />
            </div>
            <If
              condition={predictionLoading}
              then={() => (
                <>
                  <Divider style={{ marginTop: 12 }} />

                  <GridLoader
                    color="#FF9300"
                    size={20}
                    speedMultiplier={0.75}
                  />
                </>
              )}
            />
          </div>
          <If
            condition={
              !predictionLoading && predicationActive && scenario.score
            }
            then={() => (
              <div
                className={styles.card}
                style={{ width: 320, paddingTop: 28, paddingBottom: 24 }}
              >
                <Typography.Title
                  level={4}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    marginBottom: 0,
                  }}
                >
                  {last(scenario.locations).location}
                </Typography.Title>
                <p
                  style={{
                    opacity: 0.8,
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  {" "}
                  Location Verification
                </p>

                <>
                  <Divider style={{ marginTop: 12 }} />

                  <Typography.Title level={4}></Typography.Title>
                  <Progress
                    percent={scenario.score || 0}
                    status={"normal"}
                    type="circle"
                    strokeColor="#FF9300"
                  />
                  <Typography.Text style={{ marginTop: 12 }}>
                    {scenario.scoreText}
                  </Typography.Text>
                </>
              </div>
            )}
          />
        </div>
      </div>
      {/* <div style={{opacity: 0.8 }} className={styles.loader}>
        <GridLoader size={50} speedMultiplier={0.5} color="#36d7b7" />
      </div> */}
    </div>
  );
};

export default Overlay;
export {};
