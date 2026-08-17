import {useState } from "react";
import { Search } from "lucide-react";

function SearchBar()
{
    const [search, setSearch] = useState("");

    return (
        <div className="p-4">
    <div className="relative">

        <Search
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        />

        <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
                w-full
                rounded-xl
                bg-slate-100
                py-3
                pl-12
                pr-4
                text-sm
                text-slate-700
                placeholder:text-slate-400
                outline-none
                transition-all
                duration-200
                focus:bg-white
                focus:ring-2
                focus:ring-blue-500
            "
        />

    </div>
</div>
    );
}

export default SearchBar;