import { useStates } from './utilities/states';

export default function FilterPrice(props) {

  let s = useStates('main');
  let { bindTo,showAllPrice } = props;
  let [bindObject, bindProperty] = bindTo;

  return <select {...bindObject.bind(bindProperty)}>
    
  {showAllPrice &&<option key={0} value={0}>Alla Produkter</option>}
  
  {s.products.map(({ price, id }) =>
    <option key={id} value={id}>{price}</option>
  )}
</select>


    
   
}