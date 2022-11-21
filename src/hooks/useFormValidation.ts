import { ChangeEvent, RefObject, useCallback, useRef, useState } from 'react';

type useFormValidation = (
  validator: (value: string) => boolean
) => [RefObject<HTMLInputElement>, boolean, (e: ChangeEvent<HTMLInputElement>) => void];

export const useFormValidation: useFormValidation = (validator) => {
  const ref = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState(false);

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const isValid = validator(e.target.value);

      if (!isValid) {
        setErr(true);
        return;
      }
      setErr(false);
    },
    [validator]
  );

  return [ref, err, handleBlur];
};
