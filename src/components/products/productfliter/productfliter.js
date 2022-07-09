import './productfilter.scss';

const Productfliter = ({ props, filterProduct }) => {
  return (
    <div className="product-filter">
      <select  className="slection-option" onChange={(e) => filterProduct(e.target.value)}>
        {props.map((category) => {
          return <option key={category}>{category}</option>;
        })}
      </select>
    </div>
  );
};
export default Productfliter;
