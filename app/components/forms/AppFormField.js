import React from 'react'
import { useFormikContext } from 'formik'

import AppTextInput from '../AppTextInput'
import ErrorMessage from './ErrorMessage'

const AppFormField = ({
  name,
  width,
  height,
  editable,
  style,
  selectTextOnFocus,
  ...otherProps
}) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext()

  return (
    <>
      <AppTextInput
        editable={editable}
        selectTextOnFocus={selectTextOnFocus}
        style={[
          style,
          editable === false
            ? { backgroundColor: '#E0E0E0' }
            : { backgroundColor: 'white' },
        ]}
        onChangeText={handleChange(name)}
        width={width}
        height={height}
        {...otherProps}
        onBlur={() => setFieldTouched(name)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
}

export default AppFormField
