import { getParametersValues, makeLinkCheckout, numberWithSpaces} from '../../../utils';


var enterWidgetParams = ['public_key', 'title', 'text', 'button1', 'button2', 'button3'];

var widgetParams = getParametersValues(enterWidgetParams);


var text = document.getElementById('text-donation');

text.innerHTML = widgetParams['text'] || '';


var title = document.getElementById('merchant-title');

title.innerHTML = 'Поддержите ' + widgetParams['title'];



var buttons = document.getElementsByClassName('set-amount');

[].forEach.call(buttons, function(button, index) {

    var param = 'button'+ (index + 1);

    var amount = widgetParams[param];

    if(amount) {

        buttons[index].getElementsByTagName('span')[0].innerHTML= numberWithSpaces(amount);

        buttons[index].addEventListener('click', function(e) {

            var checkoutParams = {
                public_key: widgetParams['public_key'],
                amount: amount
            };

            parent.location.href = makeLinkCheckout(checkoutParams);
        });
    }
});


document.getElementById('another-amount').addEventListener('click', function(e) {

    var checkoutParams = {
        public_key: widgetParams['public_key']
    };

    parent.location.href = makeLinkCheckout(checkoutParams);
});