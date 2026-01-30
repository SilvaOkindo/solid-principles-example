import {NotificationService, SMSNotifier} from "./NotificationService";
import {EmailNotifier} from "./NotificationService";

//console.log('Happy developing ✨')


const main = () => {

    const notificationService = new NotificationService(new SMSNotifier())
    notificationService.notify("Ordered created successfully.")
}

main()