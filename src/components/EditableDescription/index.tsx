import React, { ReactNode } from 'react';
import { Descriptions } from 'antd';
import If from '@/components/If';

interface Item {
  label: ReactNode;
  value: ReactNode;
}
interface Section {
  title: ReactNode;
  items: Item[];
}

interface Props {
  sections?: Section[];
}

export const EditableDescription = ({ sections }: Props) => {
  return (
    <>
      <If
        condition={sections}
        then={() =>
          (sections as Section[]).map((section, sectionIndex) => (
            <Descriptions
              title={section.title}
              key={sectionIndex}
              layout="vertical"
              colon={false}
              labelStyle={{ fontWeight: 600 }}

              column={{ xs: 1, sm: 2, md: 4}}
            >
              {section.items.map((item, index) => (
                <Descriptions.Item label={item.label} key={index}>
                  {item.value}
                </Descriptions.Item>
              ))}
            </Descriptions>
          ))
        }
      />
    </>
  );
};

export default EditableDescription;
