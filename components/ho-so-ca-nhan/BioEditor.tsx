import { useRef, useState } from "react";
import { FormProvider } from "../Form";
import Modal from "../Modal";
import ButtonLoad from "../Button";

const BioEditor = ({
  isOpen,
  setIsOpen,
  inputs,
  onUpdate,
  title,
  description,
  inputId,
}: any) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const onSubmit = (event: any) => {
    setLoading(true);
    event.preventDefault();
    const {
      current: { formValues },
    } = formRef as any;

    const values = formValues();
    if (values)
      onUpdate(values, () => {
        setIsOpen(false);
        inputId &&
          (document.getElementById(inputId) as HTMLInputElement).value ===
            values[inputId];
      });
    setLoading(false);
  };

  return (
    <Modal showModal={isOpen} setShowModal={setIsOpen}>
      <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        <h2
          id="radix-:rhc:"
          className="text-lg font-semibold leading-none tracking-tight"
        >
          {title}
        </h2>
        <p id="radix-:rhd:" className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <FormProvider
          inputs={inputs}
          ref={formRef}
          className="grid flex-1 gap-2"
        >
          <ButtonLoad
            className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md text-xs px-3"
            onClick={onSubmit}
            type="submit"
            label={
              <>
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                >
                  <path
                    d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Lưu</span>
              </>
            }
            loading={loading}
          />
        </FormProvider>
      </div>
    </Modal>
  );
};

export default BioEditor;
