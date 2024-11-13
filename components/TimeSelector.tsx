interface TimeSelectorProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export default function TimeSelector({ id, label, value, onChange }: TimeSelectorProps) {
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return remainingMins ? `${hours} hour ${remainingMins} mins` : `${hours} hour`;
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full p-2 border rounded-md"
        required
      >
        <option value="0">Select {label.toLowerCase()}</option>
        {Array.from({ length: 18 }, (_, i) => i * 5 + 5).map((minutes) => (
          <option key={minutes} value={minutes}>
            {formatTime(minutes)}
          </option>
        ))}
      </select>
    </div>
  );
} 