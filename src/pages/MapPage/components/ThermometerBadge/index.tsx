import React from "react";
import { DotLoader } from "react-spinners";
import { Popover } from "antd";
import PopoverContent from "./PopoverContent";
import styles from "./styles.module.less";
import classNames from "classnames";
import batteryIcon from "./static/battery.svg";
interface Props {}

const size = 80;

export const ThermometerBadge = ({
  currentTemperature,
  currentHumidity,
                                   desiredTemperature,
  label,
  batteryPercentage,
}: any) => {
  return (
    <Popover content={<PopoverContent currentTemperature={currentTemperature} desiredTemperature={desiredTemperature} currentHumidity={currentHumidity}/>} title={null} trigger="click">
      <div
        className={classNames(["handle", styles.badge])}
        style={{
          cursor: "grab",
          width: 110,
          // height: 158,
          borderRadius: 12,
          backgroundColor: "white",
          padding: 16,
        }}
      >
        <div className={styles.badgeLabel}>{label}</div>
        <div className={styles.badgeTemperature}>
          {currentTemperature}
          <span className={styles.badgeTemperaturePostfix}>ºC</span>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.badgePercentage}>
            <img src={batteryIcon} className={styles.badgeBatteryIcon} />
            <span>
              {batteryPercentage}
              <small>%</small>
            </span>
          </div>
          <DotLoader speedMultiplier={0.7} color="#36d7b7" size={16} />
        </div>
      </div>
    </Popover>
  );
};

export default ThermometerBadge;
