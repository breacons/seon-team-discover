import { Checkbox as OriginalCheckbox } from 'antd';

import withFinalForm from '../withFinalForm';

export const Checkbox = withFinalForm(OriginalCheckbox, 'checked', 'defaultChecked');
export const Group = withFinalForm(OriginalCheckbox.Group);

export default Checkbox;
