import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function SubmitButton({ title, innerRef }) {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} innerRef={innerRef} onPress={handleSubmit} />;
}

export default SubmitButton;
