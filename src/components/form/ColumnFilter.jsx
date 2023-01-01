import './styleInput.css'
import Select from "react-select";
import {useMemo} from "react";


 function SelectColumnFilter({column: { filterValue, setFilter, preFilteredRows, id },}) {
    // Calculate the options for filtering
    // using the preFilteredRows

    const options = useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <select
            required
            className="border-0 rounded bg-transparent text-primary "
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            // style={{minWidth:"10px" , maxWidth:"auto"}}
        >
            <option style={{width:"0px"}} value="">&nbsp;</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}


export default SelectColumnFilter