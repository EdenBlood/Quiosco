export type InputTextFormProps = {
  labelText: string;
  htmlFor: string;
  placeholder: string;
  defaultValue?: string;
};

export default function InputTextForm({
  labelText,
  htmlFor,
  placeholder,
  defaultValue,
}: InputTextFormProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-slate-800">
        {labelText}
      </label>
      <input
        type="text"
        name={htmlFor}
        id={htmlFor}
        className="block w-full bg-slate-100 p-3"
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
}
