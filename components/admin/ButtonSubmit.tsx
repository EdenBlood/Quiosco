type ButtonSubmit = {
  disabled?: boolean;
  values: string[];
  className?: string;
};

export default function ButtonSubmit({
  disabled,
  values,
  className,
}: ButtonSubmit) {
  return (
    <input
      className={`${className} w-full bg-indigo-600 p-3 font-bold text-white uppercase not-disabled:cursor-pointer not-disabled:hover:bg-indigo-800`}
      type="submit"
      value={disabled ? values[1] : values[0]}
      disabled={disabled}
    />
  );
}
