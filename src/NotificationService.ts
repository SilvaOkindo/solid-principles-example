interface Notifier {
    send(message: string) : void
}

export class EmailNotifier implements Notifier {
    send(message: string) {
        console.log('Sending message with email service: ', message)
    }
}

export class SMSNotifier implements Notifier {
    send(message: string) {
        console.log(`Sending message with sms service: ${message}`)
    }
}

export class NotificationService {
    private notifier: Notifier
    constructor(notifier: Notifier) {
        this.notifier = notifier
    }

    notify(message: string) {
        this.notifier.send(message)
    }

}