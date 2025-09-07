export const InputComponent = ({ type, value, onChangeState }: any) => {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        placeholder="Type here"
        className={`input input-bordered rounded-md w-full ${
          value ? 'bg-emerald-100' : ''
        }`}
        onChange={onChangeState}
      />
    </div>
  );
};
