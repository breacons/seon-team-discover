import { Switch as OriginalSwitch } from 'antd';

import withFinalForm from '../withFinalForm';

export const Switch = withFinalForm(OriginalSwitch, 'checked', 'defaultChecked');
export default Switch;
