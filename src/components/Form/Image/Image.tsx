import { ImageProps as AntImageProps } from 'antd/lib/image';
import _ from 'lodash';
import React from 'react';
import { Image } from '@/components/Image';

import withFinalForm from '../withFinalForm';

interface ImageProps extends Pick<AntImageProps, 'width'> {
  value: string;
}
function FormImage(props: ImageProps) {
  return <Image fallback="" preview={false} src={props.value} {..._.pick(props, ['width'])} />;
}

export default withFinalForm(FormImage);
