import React, {useEffect, useState} from "react";
import { Progress } from "antd";
import classNames from "classnames";
import styles from "./styles.module.less";

interface Props {}

const size = 80;
export const HeaterBadge = ({ radius, level, action }: any) => {
  let colors = "#1890ff/".repeat(level).split('/').filter(s => s !== '');

  if (action === 'up') {
    colors.push( '#52c41a')
  }

  if (action === 'down') {
    colors[colors.length -1] = '#ff4d4f'
  }

  return (
    <div
      className={classNames(["handle", styles.badge])}
      style={{
        width: size,
        height: size * 80 / 110,
      }}
    >
      <div className={styles.heaterHandle} />
      <Progress
        percent={(level + (action === 'up' ? 1 : 0)) * 20}
        steps={5}
        showInfo={false}
        strokeWidth={size * 80 / 110 - 16}
        width={size - 32}
        status={"success"}
        strokeColor={colors}
        trailColor={"rgba(0,0,0,0.19)"}
      />
    </div>
  );
};

export default HeaterBadge;
