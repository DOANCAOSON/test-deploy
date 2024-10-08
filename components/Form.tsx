import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Animation } from "./Animation";
// import { SelectBox } from "./SelectBox";

export enum FormInputEnum {
  INPUT = "text",
  NUMBER = "number",
  SELECT = "select",
  DATE = "date",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  CUSTOM = "custom",
  PHONE = "phone-number",
}
interface Props {
  inputs: Input[];
  id?: string;
  onSubmit?: any;
  className?: string;
  children?: JSX.Element;
}

interface InputFieldProps {
  inputErrors: Record<string, string>;
  input: Input;
  validateForm?: (
    fieldName: string,
    value: string
  ) => {
    [x: string]: string;
  };
}

const focusInput = (e: any, addFocus: boolean | string) => {
  const target = e.target as HTMLInputElement;
  target.classList.toggle("input-focus", addFocus as boolean);
};

export const Form = (
  props: Props,
  ref: { current: HTMLFormElement; values: Record<string, string> }
) => {
  const { inputs: inputForms, className, children, id, onSubmit } = props;
  const [inputs, setInputs] = useState<Input[]>();
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement | null>();
  const newInputs = inputs ?? inputForms;

  const formValues = () => {
    if (!formRef.current) return;
    const formValues = Object.fromEntries(
      new FormData(formRef.current)
    ) as Record<string, string>;
    const trimmedFormValues = Object.keys(formValues).reduce(
      (acc: any, key) => {
        acc[key] = formValues[key].trim();
        return acc;
      },
      {}
    );
    const newInputErrors = Object.entries(trimmedFormValues).reduce(
      (acc, [fieldName, value]) => ({
        ...acc,
        ...validateForm(fieldName, value as string),
      }),
      {}
    );
    setInputErrors(newInputErrors);
    return Object.keys(newInputErrors).length === 0 ? trimmedFormValues : null;
  };

  useImperativeHandle(
    ref,
    () =>
      ({
        formValues,
        setErrors: (errors: Record<string, string>) => {
          setInputErrors(errors);
        },
        validateForm: (fieldName: string, value: string) => {
          validateForm(fieldName, value);
        },
        reset: () => formRef.current?.reset(),
        setValues: (item: Record<string, string>) => {
          const inputs = newInputs.map((i) => ({
            ...i,
            defaultValue: item[i.name],
          }));
          setInputs(inputs);
        },
      } as any),
    [inputErrors, newInputs]
  );

  const validateForm = (fieldName: string, value: string) => {
    const newInputErrors = { ...inputErrors };
    const input = newInputs.find((input) => input.name === fieldName);
    if (!input) return;
    Object.keys(newInputErrors).forEach(
      (key) => newInputErrors[key] === undefined && delete newInputErrors[key]
    );
    const { required, minLength, maxLength, pattern, validation } = input;
    if (required && !value.trim()) {
      newInputErrors[fieldName] = required.message;
    } else if (minLength?.value && value.trim().length < minLength.value) {
      newInputErrors[fieldName] = minLength.message;
    } else if (maxLength?.value && value.trim().length > maxLength.value) {
      newInputErrors[fieldName] = maxLength.message;
    } else if (validation?.(value)) {
      newInputErrors[fieldName] = validation?.(value)?.message;
    } else if (
      pattern?.value &&
      value.trim() &&
      !new RegExp(pattern.value).test(value.trim())
    ) {
      newInputErrors[fieldName] = pattern.message;
    } else {
      delete newInputErrors[fieldName];
      setInputErrors(newInputErrors);
    }
    setInputErrors(newInputErrors);
    return newInputErrors;
  };

  const renderInputs = (input: Input, index: number) => {
    switch (input.type) {
      // case FormInputEnum.SELECT:
      //   return (
      //     <SelectField
      //       key={`FORM_ITEM_${input.name}_${index}`}
      //       input={input}
      //       inputErrors={inputErrors}
      //     />
      //   );
      case FormInputEnum.PHONE:
        return (
          <InputPhone
            key={`FORM_ITEM_${input.name}_${index}`}
            input={input}
            inputErrors={inputErrors}
            validateForm={validateForm as any}
          />
        );
      case FormInputEnum.TEXTAREA:
        return (
          <Textarea
            key={`FORM_ITEM_${input.name}_${index}`}
            input={input}
            inputErrors={inputErrors}
            validateForm={validateForm as any}
          />
        );
      case FormInputEnum.CUSTOM:
        return input.renderInput;
      default:
        return (
          <InputField
            key={`FORM_ITEM_${input.name}_${index}`}
            input={input}
            inputErrors={inputErrors}
            validateForm={validateForm as any}
          />
        );
    }
  };
  return (
    <form
      autoComplete="on"
      method="post"
      ref={formRef as any}
      className={`${className}`}
      id={id}
      onSubmit={onSubmit}
    >
      {newInputs.map((input, index) => renderInputs(input, index))}
      {children}
    </form>
  );
};

// const SelectField = ({ input, inputErrors }: InputFieldProps) => {
//   const { targetURL } = input;
//   const [selects, setSelects] = useState(input.data);

//   useEffect(() => {
//     targetURL &&
//       fetch(targetURL)
//         .then((s) => s.json())
//         .then((res) => setSelects(res.data));
//   }, []);

//   if (!selects?.length) return <></>;
//   return (
//     <div style={{ width: input.width }}>
//       {input.label && <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{input.label}</label>}
//       <SelectBox
//         items={selects}
//         disabled={input.disabled}
//         label={input.label}
//         name={input.name}
//         target={input.target}
//         defaultValue={input.defaultValue || selects[0]?.value}
//         className={`${input.className} ${
//           inputErrors[input.name] && "input-error"
//         }`}
//         onChange={(e) => {
//           input.onChange?.(e);
//         }}
//       />
//       {inputErrors[input.name] && (
//         <Animation animationName="fadeIn" duration={0.25}>
//           <p className="input-error-message">{inputErrors[input.name]}</p>
//         </Animation>
//       )}
//     </div>
//   );
// };

const InputField = ({ input, inputErrors, validateForm }: InputFieldProps) => {
  return (
    <>
      <div
        className={`${inputErrors[input.name] && "input-error"} space-y-2`}
        style={{ width: input.width }}
      >
        {input.label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {input.label}
          </label>
        )}
        <input
          name={input.name}
          id={input.id}
          disabled={input.disabled}
          type={input.type}
          placeholder={input.placeholder}
          autoComplete={inputErrors[input.label ?? ""]}
          className={input.className}
          defaultValue={input.defaultValue}
          onInput={(e) => {
            focusInput(e, true);
            input.onInput?.(e);
            validateForm?.(input.name, e.currentTarget.value.trim());
          }}
          onFocus={(e) => focusInput(e, true)}
          onBlur={(e) => focusInput(e, false)}
          onChange={(e) => {
            input.onChange?.(e);
          }}
        />
        {input.componentEnd?.()}
      </div>
      {inputErrors[input.name] && (
        <Animation
          animationName="fadeIn"
          duration={0.25}
          style={{ marginTop: 5 }}
          inViewDefault={true}
        >
          <p className="text-[0.8rem] font-medium text-destructive">
            {inputErrors[input.name]}
          </p>
        </Animation>
      )}
    </>
  );
};

const InputPhone = ({ input, inputErrors, validateForm }: InputFieldProps) => {
  return (
    <>
      <div
        className={`${inputErrors[input.name] && "input-error"} space-y-2`}
        style={{ width: input.width }}
      >
        {input.label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {input.label}
          </label>
        )}
        <div className="relative">
          <input
            name={input.name}
            id={input.id}
            disabled={input.disabled}
            type={input.type}
            placeholder={input.placeholder}
            autoComplete={inputErrors[input.label ?? ""]}
            className={input.className}
            defaultValue={input.defaultValue}
            onInput={(e) => {
              focusInput(e, true);
              input.onInput?.(e);
              validateForm?.(input.name, e.currentTarget.value.trim());
            }}
            onFocus={(e) => focusInput(e, true)}
            onBlur={(e) => focusInput(e, false)}
            onChange={(e) => {
              input.onChange?.(e);
            }}
          />
          {input.componentEnd?.()}
          <div className="inline-flex items-center rounded-md border sm:max-w-[95px] max-w-[75px] md:h-full md:text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground absolute top-0 left-0 h-9 px-2 rounded-tr-none rounded-br-none text-sm md:top-0 md:left-0">
            + 84
          </div>
        </div>
      </div>
      {inputErrors[input.name] && (
        <Animation
          animationName="fadeIn"
          duration={0.25}
          style={{ marginTop: 5 }}
          inViewDefault={true}
        >
          <p className="text-[0.8rem] font-medium text-destructive">
            {inputErrors[input.name]}
          </p>
        </Animation>
      )}
    </>
  );
};

const Textarea = ({ input, inputErrors, validateForm }: InputFieldProps) => {
  return (
    <>
      <div
        className={`${inputErrors[input.name] && "input-error"} space-y-2`}
        style={{ width: input.width }}
      >
        {input.label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {input.label}
          </label>
        )}
        <textarea
          rows={input.rows}
          name={input.name}
          disabled={input.disabled}
          id={input.id}
          placeholder={input.placeholder}
          autoComplete={inputErrors[input.label ?? ""]}
          className={input.className}
          defaultValue={input.defaultValue}
          onInput={(e) => {
            focusInput(e, true);
            validateForm?.(input.name, e.currentTarget.value.trim());
          }}
          onFocus={(e) => focusInput(e, true)}
          onBlur={(e) => focusInput(e, false)}
          onChange={(e) => {
            input.onChange?.(e);
          }}
        />
      </div>
      {input.minLength && typeof document !== 'undefined' && <p
        id=":rd3:-form-item-description"
        className="text-[0.8rem] text-muted-foreground"
      >
        Đã nhập <span>{(document?.getElementById(input.id as string) as HTMLInputElement)?.value.length}</span> ký tự (ít nhất: 300 ký tự)
      </p>}
      
      {inputErrors[input.name] && (
        <Animation
          animationName="fadeIn"
          duration={0.25}
          style={{ marginTop: 5 }}
          inViewDefault={true}
        >
          <p className="text-[0.8rem] font-medium text-destructive">
            {inputErrors[input.name]}
          </p>
        </Animation>
      )}
    </>
  );
};

export const FormProvider = forwardRef<unknown, Props>(Form as any);
