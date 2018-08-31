import config from '../config/default';
import ErrorInfo from './ErrorInfo'

async function _fetchErrorLocale (response) {
    try {
        let responseFromLocalization = await fetch(`https://kassa.qiwi.com/rnd_locale/message?text_code=${response}&application_code=WIDGETS`);
        let data = await responseFromLocalization.json();
        return data.result.text;
    } catch (e) {
        throw new Error('ОШИБКА ПОДКЛЮЧЕНИЯ')
    }
}

async function _makeRequest (url, params) {
    let response;
    try {
        response = await fetch(`${url}?${params}`, {mode: 'cors'});
    } catch (e) {
        throw new Error('ОШИБКА ПОДКЛЮЧЕНИЯ')
    }
    let responseBody = await response.json();
    if (response.status >= 400) {
        window.dataLayer.push({
            event: 'load.error',
            eventAction: 'Mechant name load error'
        });
        let errorLocaleText = await _fetchErrorLocale(responseBody.error);
        throw new ErrorInfo(response, errorLocaleText);
    } else {
        return responseBody;
    }
}

function _getWidgetInfo (id, type, noCache) {
    let url = config.url;
    let params = `merchantSitePublicKey=${id}`;

    if (type === 'alias') {
        params = `widgetAliasCode=${id}`;
    }

    if (noCache) {
        params += `&noCache=${noCache}`;
    }
    return _makeRequest(url, params);
}

export async function getWidgetInfoByAlias (alias, noCache) {
    try {
        const data = await _getWidgetInfo(alias, 'alias', noCache);

        return data.result;
    } catch (err) {
        throw err;
    }
}

export async function getWidgetInfoByKey (key, noCache) {
    try {
        const data = await _getWidgetInfo(key, 'key', noCache);

        return data.result;
    } catch (err) {
        throw err;
    }
}
