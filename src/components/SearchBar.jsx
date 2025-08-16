import { useNavigate, useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const q = params.get("search") || "";
  const [value, setValue] = useState(q);

  // Keep input synced with URL
  useEffect(() => {
    setValue(q);
  }, [q]);

  function onSubmit(e) {
    e.preventDefault();
    if (value.trim() === "") {
      navigate("/"); // go Home if empty
    } else {
      navigate(`/?search=${encodeURIComponent(value)}`);
    }
  }

  function onChange(e) {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.trim() === "") {
      navigate("/"); // auto reset to home when cleared
    }
  }

  function clearSearch() {
    setValue("");
    navigate("/"); // reset to home
  }

  return (
    <form onSubmit={onSubmit} className="flex-1 max-w-2xl">
      <div className="relative">
        <input
          name="q"
          value={value}
          onChange={onChange}
          placeholder="🔍 Search for products..."
          className="w-full input text-black placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:outline-none pr-10"
        />

        {/* Clear button (X) */}
        {value && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </form>
  );
}
