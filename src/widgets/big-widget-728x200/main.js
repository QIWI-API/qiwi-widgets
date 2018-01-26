import './css/styles.css';
import WidgetButton from '../../components/widget-button';

const bigWidget728x200 = new WidgetButton();

bigWidget728x200.init({
    button: {
        id: 'make-donation'
    },
    title: {
        id: 'merchant-title',
        additional: ''
    },
    text: {
        id: 'text-donation'
    },
    message: {
        id: 'error-message'
    },
    input: {
        id: 'donation-amount',
        errorState: 'widget__field--error',
        defaultValue: true
    },
    link: {
        id: 'partner-link'
    }
});
