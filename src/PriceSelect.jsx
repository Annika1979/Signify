import { useStates } from './utilities/states';

export default function PriceSelect(props) {

  let s = useStates('main');
  let { bindTo,showAllOption } = props;
  let [bindPrice, bindPropertyPrice] = bindTo;

  return <select>
      <option>Alla Produkter</option>
      <option>Billigaste</option>
      <option>Dyraste</option>
   
  </select>


}