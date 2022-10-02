import { Spin } from 'antd';
import classNames from 'classnames';
import { FORM_ERROR, FormApi, ValidationErrors } from 'final-form';
import arrayMutators from 'final-form-arrays';
import React, { Fragment, ReactElement, useMemo, useRef } from 'react';
import { Beforeunload } from 'react-beforeunload';
import {
  Form as OriginalForm,
  FormProps as OriginalFormProps,
  FormRenderProps as OriginalFormRenderProps,
  FormSpy,
} from 'react-final-form';
import { defineMessages, useIntl } from 'react-intl';
// import { Prompt } from 'react-router-dom';

// import { FORM_VERBOSE } from '../../config';
const FORM_VERBOSE = true; // FIXME
// import { report } from '../../service/reporting';
import If from '../If';
import { validateSchema, validationMessages } from './validation';
export type FormRenderProps = OriginalFormRenderProps;

export interface FormProps<T> extends OriginalFormProps {
  children: (form: any) => any;
  className?: any;
  validator: any;
  isLoading?: boolean;
  preventPrompt?: boolean;
  mutators?: { [key: string]: (...args: any[]) => any };
}

interface LoggerProps {
  values: any;
  errors: ValidationErrors;
}

const messages = defineMessages({
  prompt: {
    id: 'Form.prompt',
    defaultMessage: 'Biztosan el akarsz navigálni mentés nélkül?',
  },
});

export const Form = ({
  className,
  children,
  validator,
  onSubmit,
  isLoading = false,
  preventPrompt = false,
  mutators,
  ...rest
}: FormProps<FormRenderProps>) => {
  const formRef = useRef<FormApi>();
  const intl = useIntl();
  const joiValidator = useMemo(() => validateSchema(validator), [validator]);
  const submit = async (values: any, form: FormApi): Promise<any | void> => {
    try {
      const result = await onSubmit(values, form);
      if (typeof result === 'string') {
        return {
          [FORM_ERROR]: result,
        };
      }

      return result;
    } catch (error) {
      // report(error);

      return {
        [FORM_ERROR]: 'Something went wrong.',
      };
    }
  };

  const logger = ({ values, errors }: LoggerProps) => {
    /* eslint-disable no-console */
    console.groupCollapsed('Form Details');
    console.log('%cvalues', 'color: DarkTurquoise; font-weight: 600', values);
    console.log('%cerrors', 'color: red; font-weight: 600', errors);
    console.groupEnd();
    /* eslint-enable no-console */
  };

  const reset = () => {
    if (formRef && formRef.current) {
      formRef.current?.reset();
    }
  };

  return (
    <Spin spinning={isLoading}>
      <OriginalForm
        {...rest}
        // ref={formRef}
        reset={reset}
        innerRef={formRef}
        onSubmit={submit}
        validate={(values): any => validationMessages(joiValidator(values))}
        mutators={{ ...arrayMutators, ...mutators }}
        render={(form): ReactElement => {
          return (
            <Fragment>
              <If
                condition={process.env.NODE_ENV === 'development' && FORM_VERBOSE}
                then={() => (
                  <FormSpy subscription={{ values: true, errors: true }} onChange={logger} />
                )}
              />
              <form
                onSubmit={form.handleSubmit}
                autoComplete="off"
                spellCheck="false"
                noValidate
                className={classNames(
                  {
                    'ant-form-vertical': true,
                  },
                  className,
                )}
              >
                {children(form)}
              </form>
              <Beforeunload
                onBeforeunload={() =>
                  !preventPrompt &&
                  !form.pristine &&
                  !form.submitSucceeded &&
                  intl.formatMessage(messages.prompt)
                }
              />
              {/*<Prompt*/}
              {/*  when={!preventPrompt && !form.pristine && !form.submitSucceeded}*/}
              {/*  message={(location) => {*/}
              {/*    const state = location.state as {*/}
              {/*      confirmed?: boolean;*/}
              {/*    } | null;*/}
              {/*    if (state?.confirmed === true) {*/}
              {/*      return true;*/}
              {/*    }*/}
              {/*    return intl.formatMessage(messages.prompt);*/}
              {/*  }}*/}
              {/*/>*/}
            </Fragment>
          );
        }}
      />
    </Spin>
  );
};

export default Form;
