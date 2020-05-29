const {
    periodicityTypes,
    eventEntryTypes,
    eventTypes
} = require("./preferences");

const periodicityDigestHeaderMapping = new Map([
    [ periodicityTypes.everyDay, "ежедневный, для ценителей" ],
    [ periodicityTypes.everyWeekday, "буднего дня, для работяг" ],
    [ periodicityTypes.beforeWeekend, "конца недели, для тусовщиков" ],
]);

const periodicityPreferenceMessage = "Частота рассылки:";

const periodicityPreferencesMapping = new Map([
    [ periodicityTypes.everyDay, `⚡️  ${ periodicityPreferenceMessage } _каждый день_` ],
    [ periodicityTypes.everyWeekday, `🚀  ${ periodicityPreferenceMessage } _по будним дням_` ],
    [ periodicityTypes.beforeWeekend, `🎉  ${ periodicityPreferenceMessage } _пятница + выходные_` ],
]);

const entryTypeMapping = new Map([
    [ eventEntryTypes.free, "бесплатные" ],
    [ eventEntryTypes.paid, "платные" ],
]);

const eventTypeMapping = new Map([
    [ eventTypes.education, "развивающие" ],
    [ eventTypes.entertainment, "развлекательные" ],
]);

const buildEntryPreference = entryTypes => entryTypes.map(type => entryTypeMapping.get(type)).join(", ");
const buildTypePreference = eventTypes => eventTypes.map(type => eventTypeMapping.get(type)).join(", ");

module.exports = {
    start: "🤖  Чем могу помочь?",
    sendLocation: "🤖  Пожалуйста, пришлите свое местоположение",
    eventsTodayHeader: "💥 *Дайджест мероприятий на сегодня*",
    noEventsForToday: "🤖  Я очень старался, но не нашел актуальных бесплатных мероприятий на сегодня... Быть может, повезет в другой раз?",
    noEventsAround: "🤖  Я очень старался, но не нашел актуальных бесплатных мероприятий в округе... Быть может, повезет в другой раз?",
    afterSearch: "🤖  Что-нибудь еще?",
    refineSearchRadius: "🤖  Как далеко ищем?",
    askForLocation: "🤖  Пожалуйста, пришлите свое текущее местоположение, нажав на кнопку ниже.\n\nОбратите внимание: функция доступна только в мобильной и браузерной версии Telegram!",
    eventsAroundHeader: "💥  *Дайджест мероприятий вокруг вас*",
    subscriptionWarning: "🤖  Подписка на анонсы мероприятий позволяет получать самую свежую информацию об ивентах в удобном виде. Рассылка происходит по утрам, режим отправки сообщений можно настроить. И не забывайте — отписаться от рассылки можно в любой момент!",
    askAboutPeriodicity: "🤖  Чудесно! А сейчас мне хотелось бы знать, как часто присылать анонсы?",
    finishSubscribingSuccess: "🤖  Вы классный, а может даже еще круче — оформление подписки прошло гладко. Встретимся на одном из минских мероприятий, только не забывайте читать мои сообщения!",
    finishSubscribingFailure: "🤖  Очень жаль, но у меня не вышло оформить вам подписку на дайджесты. Пожалуйста, напишите моему создателю, если вы видите это сообщение...",
    unsubscriptionWarning: "🤖  Чтобы продолжить, докажите, что вы не робот. Шутка. Отписавшись от моих дайджестов, вы, несомненно избавляетесь от лишнего уведомления в Telegram. Однако, если вам снова станет грустно, вы всегда можете подписаться в три клика!",
    finishUnsubscribingSuccess: "🤖  Робот грустит. Отписка от дайджестов прошла гладко.",
    finishUnsubscribingFailure: "🤖  Во время отписки произошла какая-то ошибка. Это не способ вас удержать, правда. Пожалуйста, попробуйте еще раз, а если увидите это сообщение снова — напишите моему создателю...",
    subscriptionDigestHeader: periodicity => `💥 *Дайджест ${ periodicityDigestHeaderMapping.get(periodicity) }!*`,
    
    preferences: preference => {
        const notificationsEnabled = preference.notifications.enabled;
        const subscriptionStatus = `✉️  Подписка на анонсы: _${ notificationsEnabled ? "включена" : "отключена" }_`;
        const periodicityStatus = periodicityPreferencesMapping.get(preference.notifications.periodicity);
        const typeStatus = `🌱  По виду событий: _${ buildTypePreference(preference.subscriptions.type) }_`;
        const entryStatus = `🚪  По типу входа: _${ buildEntryPreference(preference.subscriptions.entry) }_`;
        const details = `${ periodicityStatus }\n\n*Предпочтения*\n${ typeStatus }\n${ entryStatus }`;

        return `🤖  *Сейчас ваши настройки выглядят так:*\n\n*Уведомления*\n${ subscriptionStatus }\n${ notificationsEnabled ? details : "" }`;
    },

    askAboutPreferenceChange: "🤖  Что-нибудь меняем?",
    preferencesChangeSuccess: "🤖  Предпочтения успешно обновлены.",
    preferencesChangeFailure: "🤖  Во время обновления ваших предпочтений произошла какая-то ошибка. Пожалуйста, попробуйте еще раз, а если увидите это сообщение снова — напишите моему создателю...",
    askAboutTypeChange: "🤖  Какие виды мероприятий вы хотите видеть в автоматическом анонсе?",
    askAboutEntryChange: "🤖  Что насчет входа? Какие мероприятия стоит искать?"
};