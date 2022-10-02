import React, { useEffect, useState } from "react";
import { FloorPlan } from "@/pages/MapPage/components/Floorplan";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Heater, Thermometer } from "@/interfaces/heater";
import HeaterBadge from "@/pages/MapPage/components/HeaterBadge";
import styles from "./styles.module.less";
import _ from "lodash";
import ThermometerBadge from "@/pages/MapPage/components/ThermometerBadge";
import {
  Avatar,
  Badge,
  Card,
  Col,
  Divider,
  Layout,
  Menu,
  MenuProps,
  Modal,
  Popover,
  Row,
  Space,
  Statistic,
  Tabs,
  Typography,
} from "antd";
import logo from "./static/superset-logo.png";
import savingDiagram from "./static/saving-diagram.png";

import {
  BellFilled,
  CalendarFilled,
  HomeFilled,
  SettingFilled,
  SignalFilled,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useSensors } from "@/hooks/use-sensors";
import firebase from "firebase/compat/app";
import { useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducers";

const { Content, Sider } = Layout;

interface Props {}

const exampleHeaters: Heater[] = [
  {
    id: 1,
    x: 0.7076967592592593,
    y: 0.8788065843621399,
    radius: 2.463530137324369,
    level: 2,
  },
  {
    id: 2,
    x: 0.2145833333333337,
    y: 0.8894032921810704,
    radius: 2.2397525933202758,
    level: 3,
    action: 'up'
  },
  {
    id: 3,
    x: 0.14585648148148134,
    y: 0.4873045267489713,
    radius: 1.9196780936335074,
    level: 3
  },
  {
    id: 4,
    x: 0.7361921296296297,
    y: 0.2152880658436214,
    radius: 2.922027807869327,
    level: 3,
    action: 'down'
  },
];

const exampleThermometers: Thermometer[] = [
  {
    id: "1337-0069",
    x: 0.3435763888888892,
    y: 0.6438271604938274,
    currentTemperature: 20,
    currentHumidity: 34,
    label: "Living Room",
    batteryPercentage: 70,
    desiredTemperature: 21,
  },
  {
    id: "1337-0002",
    x: 0.5197337962962957,
    y: 0.6659465020576132,
    currentTemperature: 21,
    label: "Kitchen",
    currentHumidity: 39,
    batteryPercentage: 89,
    desiredTemperature: 20,
  },
  {
    id: "1337-0003",
    x: 0.1871527777777778,
    y: 0.19907407407407396,
    currentTemperature: 18,
    label: "Bathroom",
    batteryPercentage: 34,
    currentHumidity: 41,
    desiredTemperature: 20,
  },
  {
    id: "1337-0420",
    x: 0.5949652777777773,
    y: 0.1407407407407408,
    currentTemperature: 22,
    label: "Bedroom",
    batteryPercentage: 57,
    currentHumidity: 34,
    desiredTemperature: 22,
  },
  {
    id: "outside",
    x: 0.8337962962962965,
    y: 0.10751028806584353,
    currentTemperature: 8,
    label: "Outside",
    batteryPercentage: 57,
    isExternal: true,
    currentHumidity: 19,
  },
];

const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

const ratio = 0.9;
const width = 1920 * ratio;
const height = 1080 * ratio;
const size = 80;
const baseTemperature = 18;

const distanceBetweenHeaterAndThermometer = (h: Heater, t: Thermometer) => {
  return Math.sqrt((h.x - t.x) ** 2 + (h.y - t.y) ** 2);
};

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: any
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Notification = () => (
  <div style={{ width: 320 }}>
    <Typography.Title level={4} style={{ marginTop: 8, marginBottom: 4 }}>
      Notifications
    </Typography.Title>
    <Tabs defaultActiveKey="1" size="small">
      <Tabs.TabPane
        tab={<span style={{ paddingLeft: 16, paddingRight: 16 }}>All</span>}
        key="1"
      ></Tabs.TabPane>
      <Tabs.TabPane tab="Today" key="2" disabled>
        Today
      </Tabs.TabPane>
      <Tabs.TabPane tab="Archive" key="3" disabled>
        Archive
      </Tabs.TabPane>
    </Tabs>

    <Space direction="horizontal" size={16}>
      <Avatar
        style={{
          backgroundColor: "#1890ff",
          verticalAlign: "middle",
          borderRadius: 8,
        }}
        size="large"
        shape="square"
      >
        LR
      </Avatar>
      <div>
        <Typography.Title
          level={5}
          style={{ paddingTop: 12, marginBottom: -6 }}
        >
          Set heater to Level 4.
        </Typography.Title>
        <Typography.Paragraph>
          <small>1m ago • Living Room</small>
        </Typography.Paragraph>
      </div>
    </Space>

    <Divider style={{ marginTop: 4, marginBottom: 4 }} />
    <Space direction="horizontal" size={16}>
      <Avatar
        style={{
          backgroundColor: "#ff8042",
          verticalAlign: "middle",
          borderRadius: 8,
        }}
        size="large"
        shape="square"
      >
        K
      </Avatar>
      <div>
        <Typography.Title
          level={5}
          style={{ paddingTop: 12, marginBottom: -6 }}
        >
          Set heater to Level 2.
        </Typography.Title>
        <Typography.Paragraph>
          <small>2h ago • Kitchen</small>
        </Typography.Paragraph>
      </div>
    </Space>
  </div>
);

export const MapPage = ({}: Props) => {
  const [heaters, setHeaters] = useState(exampleHeaters);
  const [thermometers, setThermometers] = useState(exampleThermometers);
  const [showModal, setShowModal] = useState(false);

  // const {  } = useSensors();

  console.log({ heaters, thermometers });

  const items: any = [
    getItem("Home", "0", <HomeFilled />),
    getItem("Scenarios", "6", <CalendarFilled />),

    // getItem("Option 1", "1", <PieChartFilled />),
    // getItem("Notifications", "3", <BellFilled />, [<div>Hellp</div>]),
    getItem(
      "Report",
      "5",
      <SignalFilled onClick={() => setShowModal(false)} />
    ),
    getItem("Settings", "4", <SettingFilled />),
  ];

  const eventLogger = (
    e: DraggableEvent,
    data: DraggableData,
    id: string | number
  ) => {
    const { x, y } = data;

    const newX = (x + size / 2) / width;
    const newY = (y + size / 2) / height;

    const index = _.findIndex(heaters, (h) => h.id === id);
    const updated = [...heaters];
    updated[index].x = newX;
    updated[index].y = newY;

    setHeaters(updated);
  };

  const moveThermometer = (
    e: DraggableEvent,
    data: DraggableData,
    id: string | number
  ) => {
    const { x, y } = data;

    const newX = (x + size / 2) / width;
    const newY = (y + size / 2) / height;

    const index = _.findIndex(thermometers, (h) => h.id === id);

    if (!thermometers) return;

    const updatedThermometers = [...thermometers];
    updatedThermometers[index].x = newX;
    updatedThermometers[index].y = newY;

    setThermometers(updatedThermometers);

    const updatedHeaters = heaters.map((h) => {
      const internalThermometers = _.reject(
        updatedThermometers,
        (t) => t.isExternal === true
      );
      const distances = internalThermometers.map((t) => {
        return 1 / distanceBetweenHeaterAndThermometer(h, t);
      });

      const avg = weightedAverage(
        internalThermometers.map((t) => t.currentTemperature),
        distances
      );

      // console.log({h, updatedThermometers, distances, avg})

      return {
        ...h,
        radius: avg - baseTemperature,
      };
    });

    setHeaters(updatedHeaters);
  };

  return (
    <Layout>
      <Sider collapsed={true}>
        <div className={styles.avatarWrapper}>
          <img src={logo} width={40} />
        </div>
        <div className={styles.menuWrapper}>
          <div>
            <Menu
              theme="dark"
              selectedKeys={[]}
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
            />
            <div className={styles.notificationWrapper}>
              <Popover
                placement="right"
                title={null}
                content={<Notification />}
                trigger="click"
              >
                <Badge dot style={{ left: 7, top: 2, }}>
                  <BellFilled style={{ color: "#B4B5B7", fontSize: 18 }} />
                </Badge>
              </Popover>
            </div>
          </div>
          <div className={styles.avatarWrapper}>
            <Avatar
              size={50}
              src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg&w=500&fit=crop"
            />
          </div>
        </div>
      </Sider>

      <Content className={styles.content}>
        <div
          style={{
            position: "relative",
            top: 0,
            left: 0,
            // width,
            height,
            zIndex: 1000,
          }}
        >
          {heaters.map((heater) => (
            <Draggable
              key={heater.id}
              // axis="x"
              handle=".handle"
              position={{
                x: width * heater.x - size / 2,
                y: height * heater.y - size / 2,
              }}
              // position={{ x: heater.x, y: heater.y }}
              // position={null}
              // grid={[25, 25]}
              scale={1}
              // onStart={this.handleStart}
              // onDrag={this.handleDrag}
              onDrag={(e, d) => eventLogger(e, d, heater.id)}
            >
              <div style={{ position: "absolute" }}>
                <HeaterBadge {...heater} />
              </div>
            </Draggable>
          ))}
          {thermometers &&
            thermometers.map((thermometer) => (
              <Draggable
                key={thermometer.id}
                // axis="x"
                handle=".handle"
                position={{
                  x: width * thermometer.x - size / 2,
                  y: height * thermometer.y - size / 2,
                }}
                // position={{ x: heater.x, y: heater.y }}
                // position={null}
                // grid={[25, 25]}
                scale={1}
                // onStart={this.handleStart}
                // onDrag={this.handleDrag}
                onDrag={(e, d) => moveThermometer(e, d, thermometer.id)}
              >
                <div style={{ position: "absolute" }}>
                  <ThermometerBadge {...thermometer} />
                </div>
              </Draggable>
            ))}
        </div>
        <div
          style={{
            position: "relative",
          }}
        >
          <FloorPlan heaters={heaters} />
        </div>
      </Content>
      <Modal
        title="Saved with Superset"
        visible={showModal}
        width={780}
        footer={null}
        onCancel={() => setShowModal(false)}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic
                title="System Efficiency"
                value={12.0}
                precision={0}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Saved Cost (Past Year)"
                value={318}
                precision={0}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="€"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Saved Energy (Past Year)"
                value={1.6}
                precision={1}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="MWh"
              />
            </Card>
          </Col>
        </Row>
        <Typography.Title
          level={4}
          style={{ marginTop: 38, marginBottom: -4, textAlign: "center" }}
        >
          Energy Consumption & Savings
        </Typography.Title>
        <Typography.Paragraph style={{ marginBottom: 16, textAlign: "center" }}>
          <small>Past 30 Days</small>
        </Typography.Paragraph>
        <img src={savingDiagram} width={"100%"} />
      </Modal>
    </Layout>
  );
};

export default MapPage;
