import './css/styles.css';
import WidgetButton from'../../components/widget-button';


const bigButton220x210 = new WidgetButton(['public_key', 'button_name']);

bigButton220x210.init({
    button:{
        id:'make-donation'
    }
});