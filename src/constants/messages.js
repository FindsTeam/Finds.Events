const periodicityTypes = require("./periodicity-types");

const periodicityMapping = new Map([
    [ periodicityTypes.everyDay, "ежедневный, для ценителей" ],
    [ periodicityTypes.everyWeekday, "буднего дня, для работяг" ],
    [ periodicityTypes.beforeWeekend, "конца недели, для тусовщиков" ],
]);

module.exports = {
    start: "🤖  Чем могу помочь?",
    sendLocation: "🤖  Пожалуйста, пришлите свое местоположение",
    eventsToday: "💥 *Дайджест мероприятий на сегодня*",
    noEventsForToday: "🤖  Я очень старался, но не нашел актуальных бесплатных мероприятий на сегодня... Быть может, повезет в другой раз?",
    noEventsAround: "🤖  Я очень старался, но не нашел актуальных бесплатных мероприятий в округе... Быть может, повезет в другой раз?",
    afterSearch: "🤖  Что-нибудь еще?",
    refineSearchRadius: "🤖  Как далеко ищем?",
    askForLocation: "🤖  Пожалуйста, пришлите свое текущее местоположение, нажав на кнопку ниже. Обратите внимание: функция доступна только на мобильной версии Telegram.",
    eventsAround: "💥  *Дайджест мероприятий вокруг вас*",
    subscriptionWarning: "🤖  Подписка на анонсы мероприятий позволяет получать самую свежую информацию об ивентах в удобном виде. Рассылка происходит по утрам, режим отправки сообщений можно настроить. Изменить свои предпочтения или вовсе отписаться можно в любой момент в настройках бота.",
    askAboutPeriodicity: "🤖  Чудесно! А сейчас мне хотелось бы знать, как часто присылать анонсы?",
    finishSubscribingSuccess: "🤖  Вы классный, а может даже еще круче — оформление подписки прошло гладко. Встретимся на одном из минских мероприятий, не забывайте только читать мои сообщения!",
    finishSubscribingFailure: "🤖  Очень жаль, но у меня не вышло оформить вам подписку на мероприятия. Пожалуйста, напишите моему создателю, если вы видите это сообщение...",
    subscriptionDigestHeader: periodicity => `💥 *Дайджест ${ periodicityMapping.get(periodicity) }!*`
};