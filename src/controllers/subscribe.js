const Composer = require("telegraf/composer");
const WizardScene = require("telegraf/scenes/wizard");

const {
    savePreferences,
} = require("../utils/mongo");

const keyboards = require("../constants/keyboards");
const buttons = require("../constants/buttons");
const messages = require("../constants/messages");
const periodicityTypes = require("../constants/periodicity-types");

const periodicityMapping = new Map([
    [ buttons.digestsEveryDay, periodicityTypes.everyDay ],
    [ buttons.digestsEveryWeekday, periodicityTypes.everyWeekday ],
    [ buttons.digestsBeforeWeekend, periodicityTypes.beforeWeekend ]
]);

const finishSubscribing = async context => {
    const periodicity = periodicityMapping.get(context.match);
    const preferences = {
        uid: context.update.message.chat.id,
        name: context.update.message.chat.first_name || context.update.message.chat.title,
        notifications: {
            enabled: true,
            periodicity
        }
    };
    const isSaved = await savePreferences(preferences);
    
    await context.reply(isSaved ? messages.finishSubscribingSuccess : messages.finishSubscribingFailure);
    await context.reply(messages.start, keyboards.main);

    return context.scene && await context.scene.leave();
};

const subscriptionProceedHandler = new Composer();

subscriptionProceedHandler.hears(buttons.confirmSubscription, async context => {
    context.reply(messages.askAboutPeriodicity, keyboards.digestsPeriodicity);

    return context.wizard.next();
});

const digestsPeriodicityHandler = new Composer();

digestsPeriodicityHandler.hears(buttons.digestsEveryDay, context => finishSubscribing(context));
digestsPeriodicityHandler.hears(buttons.digestsEveryWeekday, context => finishSubscribing(context));
digestsPeriodicityHandler.hears(buttons.digestsBeforeWeekend, context => finishSubscribing(context));

module.exports.subscribeWizard = new WizardScene("subscribe-wizard",
    async (context) => {
        context.reply(messages.subscriptionWarning, keyboards.subscriptionWarning);

        return context.wizard.next();
    },
    subscriptionProceedHandler,
    digestsPeriodicityHandler
);