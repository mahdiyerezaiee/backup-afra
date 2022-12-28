const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column
    return (
        <span>
            
            <input className="input-group rounded input-box" value={ filterValue ||  '' }
                onChange={e => setFilter(e.target.value)} />
        </span>
    )
}

export default ColumnFilter