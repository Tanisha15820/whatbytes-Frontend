import { useNavigate, useSearchParams } from "react-router-dom";

const categories = ["All", "Electronics", "Clothing", "Home"];

export default function Sidebar() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const selectedCategory = params.get("category") || "All";
  const maxPrice = Number(params.get("maxPrice") || 1000);

  function updateParam(key, value) {
    const url = new URL(window.location.href);
    if (value === "All" || value === "" || value === null) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
    navigate(url.pathname + url.search);
  }

  return (
    <aside className="w-full sm:w-64 space-y-6">
      {/* First Filter Box (Interactive) */}
      <div className="card !bg-blue-700 p-4 text-white">
        <h3 className="text-lg font-semibold mb-4 text-white">Filters</h3>

        <div className="mb-6">
          <p className="font-medium mb-2 text-white">Category</p>
          <div className="space-y-2">
            {categories.map((c) => (
              <label key={c} className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === c}
                  onChange={() =>
                    updateParam("category", c === "All" ? "" : c)
                  }
                  className="accent-white"
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2 text-white">Price</p>
          <input
            type="range"
            min={0}
            max={1000}
            value={maxPrice}
            onChange={(e) => updateParam("maxPrice", e.target.value)}
            className="w-full accent-white"
          />
          <div className="flex justify-between text-sm mt-2 text-white">
            <span>₹0</span>
            <span>₹{maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Second Filter Box (Mirror / Display Only) */}
      <div className="card p-4 bg-gray-100 text-black">
        <h3 className="text-lg font-semibold mb-4">Current Selection</h3>

        <div className="mb-6">
          <p className="font-medium mb-2">Category</p>
          <div className="space-y-2">
            {categories.map((c) => (
              <label key={c} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category-mirror"
                  checked={selectedCategory === c}
                  readOnly
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">Price</p>
          <input
            type="number"
            value={maxPrice}
            readOnly
            className="input w-full bg-white text-black"
          />
        </div>
      </div>
    </aside>
  );
}
