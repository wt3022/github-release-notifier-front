function DisplayField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-bold">{label}</p>
      <p>{value}</p>
    </div>
  );
}

export default DisplayField;
