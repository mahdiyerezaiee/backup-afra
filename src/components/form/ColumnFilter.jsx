import './styleInput.css'
import Select from "react-select";
import {useMemo} from "react";


 function SelectColumnFilter({column: { filterValue, setFilter, preFilteredRows, id },}) {
    // Calculate the options for filtering
    // using the preFilteredRows
     console.log(preFilteredRows)
    const options = useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])
     console.log(filterValue)
    // Render a multi-select box
    return (
        <select
            className="border-0 rounded "
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">همه</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}


export default SelectColumnFilter