import React, { useState } from "react";
import { Segmented } from "antd";
import If from "@/components/If";
import activityChart from "./static/activity-chart.png";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import CircularSlider from "@fseehawer/react-circular-slider";
import styles from "./styles.module.less";
interface Props {
  currentHumidity: number;
  currentTemperature: number;
  desiredTemperature: number;
}

export const PopoverContent = ({
  currentHumidity,
  currentTemperature,
  desiredTemperature,
}: Props) => {
  const [desiredValue, setDesiredValue] = useState(desiredTemperature);
  const [tab, setTab] = useState<string | number>("Temperature");

  const isDragging = true;

  return (
    <div style={{ width: 300, height: 410 }}>
      <Segmented
        block
        options={["Temperature", "Activity"]}
        value={tab}
        onChange={setTab}
      />
      <If
        condition={tab === "Temperature"}
        then={() => (
          <div>
            <div className={styles.knobWrapper}>
              <CircularSlider
                width={240}
                dataIndex={desiredValue}
                min={0}
                max={30}
                direction={1}
                knobPosition="bottom"
                trackColor="#eeeeee"
                progressSize={20}
                trackSize={20}
                label={" "}
                hideLabelValue={true}
                progressColorTo={"#F65749"}
                progressColorFrom={"#00bfbd"}
                knobColor={"#00bfbd"}
                onChange={setDesiredValue}
              />
              <div className={styles.desiredTemperature}>
                <div>
                  <span className={styles.desiredTemperatureLabel}>
                    {desiredValue}
                  </span>
                  <span className={styles.desiredTemperaturePostfix}>°C</span>
                </div>
              </div>
            </div>
            <div className={styles.valuesRow}>
              <div>
                <div className={styles.valueLabel}>Current temp</div>
                <div className={styles.valueWrapper}>
                  <CaretUpOutlined className={styles.valueIcon} />
                  <span className={styles.valueValue}>
                    {currentTemperature}
                    <span className={styles.valuePostfix}>
                      <small>°C</small>
                    </span>
                  </span>
                </div>
              </div>
              <div>
                <div className={styles.valueLabel}>Current humidity</div>
                <div className={styles.valueWrapper}>
                  <CaretDownOutlined className={styles.valueIcon} />
                  <span className={styles.valueValue}>
                    {currentHumidity}
                    <span className={styles.valuePostfix}>
                      <small>%</small>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        else={() => (
          <div>
            <img src={activityChart} style={{ width: "100%" }} />
          </div>
        )}
      />
    </div>
  );
};

export default PopoverContent;
