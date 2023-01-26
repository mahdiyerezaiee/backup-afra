export const RadioButton = (props) => {
    const { changed, id, isSelected, label, value} = props;
    return (
      <div className="RadioButton ">
        <input
       
        className="mr-2"
          id={id}
          onChange={changed}
          value={value}
          type="radio"
          checked={isSelected}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  };
  