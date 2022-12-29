import './styleInput.css'

const ColumnFilter = ({ column,data }) => {
    const { filterValue, setFilter } = column
   
    return (
        <span>
           
            <input style={{border:'none' ,borderRadius:'20%',boxSizing:'content-box' ,width:'80%' ,height:'15px'}} value={ filterValue ||  '' }
                onChange={e => setFilter(e.target.value)} />
        </span>
    )
}

export default ColumnFilter